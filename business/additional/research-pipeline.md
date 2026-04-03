# Research Pipeline

Full pipeline from intent to memory. Every stage hands off to the next via a shared queue table. Each agent runs independently with a heartbeat — stays active until its queue is empty, then returns to idle.

## Models

| Role | Model | Size |
|---|---|---|
| Embeddings | `qwen3-embedding:8b` | 4.7GB |
| Planning + Query Expansion | `qwen3:32b` | ~19GB |
| Routing + Cleaning + Extraction | `qwen3:8b` | ~5GB |
| Extraction (complex) | `qwen3:14b` | ~9GB |
| Verification | `deepseek-r1:32b` | ~20GB |
| Reasoning + Output | `gpt-oss:20b` | ~14GB |
| Memory Update | `qwen3:8b` + `qwen3:14b` | (shared) |

All Apache 2.0 or MIT licensed. Total peak memory: ~72GB. Designed for Apple M3 Studio Ultra (96GB unified memory).

---

## Stage 0 — Source Health + Query Expansion

**Model:** `qwen3:8b` (health checks) + `qwen3:32b` (semantic retrieval + query expansion) + `qwen3-embedding:8b` (embeddings)
**Purpose:** Before searching, check source health and expand queries based on what we've learned.

### 0a — Source Health Check (`qwen3:8b`)
1. Pull all active sources from `sources` table
2. For each source, run a lightweight HEAD request to verify it's reachable
3. Update `sources.last_checked` and `sources.status` (`healthy` / `degraded` / `down`)
4. Any source with `status = down` is excluded from Stage 1 automatically

### 0b — Semantic Pre-Retrieval (`qwen3:32b` + `qwen3-embedding:8b`)
1. Read `workflows/direction.md` to get base search categories
2. Embed each category query using `qwen3-embedding:8b`
3. Query pgvector across memory tables:
   ```sql
   SELECT * FROM documents
   WHERE scraped_at > NOW() - INTERVAL '30 days'
   ORDER BY embedding <=> $query_embedding LIMIT 10;

   SELECT * FROM insights
   WHERE status = 'active'
   ORDER BY embedding <=> $query_embedding LIMIT 10;

   SELECT * FROM episodes
   ORDER BY embedding <=> $query_embedding LIMIT 5;

   SELECT * FROM failures
   WHERE resolved = false
   ORDER BY created_at DESC LIMIT 10;
   ```

### 0c — Query Expansion (`qwen3:32b`)
Using insights retrieved above, dynamically expand and reprioritize search queries:
- If insights show `pre-foreclosure in Alameda County` returns 3x more verified records than `tax lien Santa Clara` → weight pre-foreclosure queries higher this run
- If insights show `auction.com` consistently outperforms generic searches → add domain-specific queries targeting that source
- If insights show a new zip code cluster emerging → add it to the focus area for this run
- If failures show a domain is blocking scrapers → add it to the skip list passed to Stage 1

**Output:** Expanded query list + context bundle for Stage 1:
- Queries ranked by historical yield
- Sources ranked by quality score
- Domains to skip (failures + down sources)
- Recently scraped URLs to avoid

---

## Stage 1 — Ingestion

**Model:** `qwen3:32b`
**Purpose:** Search the web and scrape new URLs.

1. Receive expanded query list and context bundle from Stage 0
2. For each query (in priority order):
   - Search via `tasks/search-internet` (Tavily first, Brave fallback)
   - Prefer sources with high `quality_score` from `sources` table
   - Skip domains flagged by Stage 0
3. For each URL returned:
   - Run `tasks/insert-url` → `INSERTED` / `SKIPPED` / `ERROR`
   - On `INSERTED`: run `tasks/save-page` → `SAVED: <filepath>` / `ERROR`
   - On `SKIPPED`: find a different URL
   - On `ERROR`: log to `failures` table, continue to next URL
4. On `SAVED`: push filepath to cleaning queue (`status = pending`)
5. After all URLs processed: update `sources` table with this run's yield per domain (URLs found, inserted vs. skipped ratio)

**Output:** Raw HTML files on disk. Cleaning queue populated. Source yield stats updated.

---

## Stage 2 — Cleaning

**Model:** `qwen3:8b`
**Queue:** Heartbeat every 30 seconds. Stays active until queue is empty.

1. Pull next `pending` item from cleaning queue, set `status = processing`
2. Read raw HTML from filepath
3. Strip: ads, navigation, headers, footers, cookie banners, scripts, inline styles
4. Normalize: whitespace, encoding, date formats, price formats
5. Write cleaned file to disk (`clean_path`)
6. Update `documents` table: set `clean_path`, set cleaning queue `status = done`
7. Push `clean_path` to extraction queue (`status = pending`)

**Output:** Cleaned text files. Extraction queue populated.

---

## Stage 3 — Extraction

**Model:** qwen3:14b
**Queue:** Same heartbeat pattern.

1. Pull next `pending` item from extraction queue
2. Read cleaned file
3. Extract structured fields into JSON:
   - Property address, city, zip
   - Property type (SFR, condo, multi-family, land)
   - Distress type (foreclosure, REO, tax lien, pre-foreclosure)
   - Auction/sale date (if present)
   - Asking price or estimated value
   - Lender or trustee (if present)
   - Source URL and domain
   - Confidence score per field (0.0–1.0)
4. Compute overall extraction confidence (average of per-field scores)

### Confidence Gate — Drop threshold: 0.4
- If overall confidence < 0.4: write to `dropped` table with reason `low_extraction_confidence`, stop here
- If overall confidence ≥ 0.4: write JSON record to `extracted` table, push to verification queue

**Output:** Structured JSON records in database. Low-confidence records dropped before reaching expensive models.

---

## Stage 4 — Verification

**Model:** deepseek-r1:32b
**Queue:** Same heartbeat pattern.

1. Pull next `pending` item from verification queue
2. Read extracted JSON record
3. Cross-reference against:
   - Other extracted records for the same address (cross-source duplicates)
   - Known data patterns from `insights` table
   - Public record norms (price ranges, date logic, address formats for Bay Area)
4. For each field, assign:
   - `verified` — consistent across sources or matches known patterns
   - `flagged` — contradicts another source or looks anomalous
   - `low_confidence` — extraction confidence was below 0.6
5. Compute overall verification confidence score

### Confidence Gate — Drop threshold: 0.5
- If overall confidence < 0.5: write to `dropped` table with reason `failed_verification`, stop here
- If overall confidence ≥ 0.5: write to `verified` table, push to structuring queue

**Output:** Verified records with contradiction flags and confidence scores. Weak records dropped before structuring.

---

## Stage 5 — Structuring + Embedding

**Model:** `qwen3:8b`
**Embedding:** `qwen3-embedding:8b`
**Queue:** Same heartbeat pattern.

1. Pull next `pending` item from structuring queue
2. Read verified record
3. Tag document:
   - Niche category (foreclosure / REO / tax lien / pre-foreclosure)
   - Geography bucket (county, city, zip)
   - Confidence tier (high ≥ 0.8 / medium ≥ 0.6 / low ≥ 0.5)
   - Week number and run ID
4. Insert final structured record into `documents` table with `scraped_at = NOW()`
5. Generate embedding from cleaned text using `qwen3-embedding:8b` (1024-dim)
6. Store embedding in `documents.embedding`
7. Push to reasoning queue

**Output:** Final structured records in database with embeddings. Semantic retrieval now available for future runs.

---

## Stage 6 — Reasoning

**Model:** `gpt-oss:20b`
**Queue:** Same heartbeat pattern. Final stage before memory update.

1. Pull next `pending` item from reasoning queue
2. Read structured + verified record
3. Check freshness: if `scraped_at < NOW() - INTERVAL '30 days'` → flag as `stale`, include in brief but lower signal weight
4. Query pgvector for similar past records:
   ```sql
   SELECT * FROM documents
   WHERE scraped_at > NOW() - INTERVAL '30 days'
   ORDER BY embedding <=> $record_embedding LIMIT 5;

   SELECT * FROM insights
   WHERE status = 'active'
   ORDER BY embedding <=> $record_embedding LIMIT 5;
   ```
5. Synthesize:
   - Is this property worth flagging? Why?
   - Does it match any known distress patterns from insights?
   - How does it compare to similar properties found in past runs?
   - Is the data fresh enough to act on?
   - What is the investment signal: `strong` / `moderate` / `weak` / `skip`
6. Write reasoning output to `briefs` table

**Output:** Narrative briefs per property. Memory update triggered after batch completes.

---

## Stage 7 — Memory Update

**Model:** `qwen3:8b` (housekeeping + decay) · `qwen3:14b` (insight extraction) · `qwen3-embedding:8b` (embedding new entries)
**Purpose:** Close the feedback loop. Every run makes the next run smarter.

Runs once after Reasoning completes a batch.

### 7a — Insight Extraction
- Query `documents` joined with `briefs` for this run
- Detect patterns:
  - Which sources returned the most verified data?
  - Which zip codes had the highest signal density?
  - Which distress types had the most contradictions or drops?
  - Which query expansions from Stage 0 yielded the most insertions?
- Write new insights or update existing ones in `insights` table
- Embed each insight using `qwen3-embedding:8b` and store in `insights.embedding`
- Set `last_confirmed = NOW()` on any existing insight that was reconfirmed this run

### 7b — Insight Decay
- Run decay across all active insights:
  ```sql
  UPDATE insights
  SET decay_score = decay_score * 0.95
  WHERE status = 'active';

  UPDATE insights
  SET status = 'retired'
  WHERE decay_score < 0.3 AND status = 'active';
  ```
- Any insight not confirmed in 8+ weeks will decay to retired automatically
- Reconfirmed insights (from 7a) have decay reset: `decay_score = 1.0`

### 7c — Source Quality Update
- For each domain active this run, update `sources` table:
  - `yield` — URLs inserted vs. total returned (higher = better)
  - `verified_rate` — what % of its records passed verification
  - `avg_confidence` — rolling average confidence score
  - `quality_score` — computed from yield + verified_rate + avg_confidence
- Sources with `quality_score < 0.2` after 3+ runs get `status = deprioritized`

### 7d — Freshness Expiry
- Mark stale documents:
  ```sql
  UPDATE documents
  SET status = 'stale'
  WHERE scraped_at < NOW() - INTERVAL '30 days'
  AND status = 'active';
  ```
- Stale documents are excluded from Stage 0 semantic retrieval and Stage 6 comparisons
- Documents can be re-scraped: if a stale URL reappears in search results, it gets re-inserted with a new `scraped_at`

### 7e — Episode Write
- Write one episode record to `episodes` summarizing this run:
  - Total URLs scraped / inserted / skipped
  - Drop rate at each confidence gate (Stage 3 and Stage 4)
  - Clean rate (junk vs. content ratio)
  - Extraction success rate per field
  - Verification pass/fail rate
  - Top-performing sources and queries this run
  - Any failures or anomalies

- Embed episode summary using `qwen3-embedding:8b` and store in `episodes.embedding`

### 7f — Failure Log
- For any `ERROR` recorded during Ingestion, write to `failures` table:
  - Domain, error type (timeout / block / parse failure), detail, `resolved = false`
- Picked up by Stage 0 on the next run to avoid repeat failures

**Output:** insights, sources, documents, episodes, and failures tables updated. Next run starts smarter.

---

## Database Tables

```sql
-- Core documents
CREATE TABLE documents (
  id          SERIAL PRIMARY KEY,
  url         TEXT UNIQUE NOT NULL,
  filepath    TEXT,
  clean_path  TEXT,
  embedding   vector(1024),
  status      TEXT DEFAULT 'active',  -- active | stale
  scraped_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Source registry
CREATE TABLE sources (
  id            SERIAL PRIMARY KEY,
  domain        TEXT UNIQUE NOT NULL,
  status        TEXT DEFAULT 'healthy',  -- healthy | degraded | down | deprioritized
  quality_score FLOAT DEFAULT 0.5,
  yield         FLOAT,
  verified_rate FLOAT,
  avg_confidence FLOAT,
  last_checked  TIMESTAMPTZ,
  run_count     INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Structured extracted data
CREATE TABLE extracted (
  id              SERIAL PRIMARY KEY,
  document_id     INTEGER REFERENCES documents(id),
  fields          JSONB,
  confidence      FLOAT,
  run_id          TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Verified records
CREATE TABLE verified (
  id              SERIAL PRIMARY KEY,
  extracted_id    INTEGER REFERENCES extracted(id),
  result          JSONB,
  confidence      FLOAT,
  flags           TEXT[],
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Records dropped at confidence gates
CREATE TABLE dropped (
  id          SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  stage       TEXT,   -- extraction | verification
  reason      TEXT,
  confidence  FLOAT,
  run_id      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Reasoning briefs
CREATE TABLE briefs (
  id          SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  signal      TEXT,   -- strong | moderate | weak | skip
  narrative   TEXT,
  stale       BOOLEAN DEFAULT FALSE,
  run_id      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Learned patterns
CREATE TABLE insights (
  id              SERIAL PRIMARY KEY,
  scope           TEXT,   -- global | regional
  category        TEXT,
  body            TEXT,
  confidence      FLOAT DEFAULT 0.5,
  decay_score     FLOAT DEFAULT 1.0,
  evidence_count  INTEGER DEFAULT 1,
  embedding       vector(1024),
  last_confirmed  TIMESTAMPTZ DEFAULT NOW(),
  status          TEXT DEFAULT 'active',  -- active | superseded | retired
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Run history
CREATE TABLE episodes (
  id          SERIAL PRIMARY KEY,
  run_id      TEXT,
  summary     TEXT,
  stats       JSONB,
  embedding   vector(1024),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Failure log
CREATE TABLE failures (
  id          SERIAL PRIMARY KEY,
  domain      TEXT,
  error_type  TEXT,
  detail      TEXT,
  resolved    BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Shared queue
CREATE TABLE queue (
  id          SERIAL PRIMARY KEY,
  stage       TEXT,   -- cleaning | extraction | verification | structuring | reasoning
  payload     TEXT,   -- filepath or record ID
  status      TEXT DEFAULT 'pending',  -- pending | processing | done | error
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX ON documents (status, scraped_at);
CREATE INDEX ON insights USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX ON insights (status, decay_score);
CREATE INDEX ON episodes USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX ON sources (status, quality_score);
CREATE INDEX ON queue (stage, status);
```

---

## Pipeline Flow Summary

```
direction.md
     ↓
Stage 0 — Source Health + Query Expansion
          (health checks → semantic retrieval → expand queries from insights)
     ↓
Stage 1 — Ingestion
          (search with ranked queries → scrape → queue)
     ↓
Stage 2 — Cleaning
          (strip HTML → normalize → queue)
     ↓
Stage 3 — Extraction + Confidence Gate (drop < 0.4)
          (structured JSON → queue)
     ↓
Stage 4 — Verification + Confidence Gate (drop < 0.5)
          (cross-reference → confidence score → queue)
     ↓
Stage 5 — Structuring + Embedding
          (tag → embed → queue)
     ↓
Stage 6 — Reasoning
          (freshness check → synthesize → investment signal → briefs)
     ↓
Stage 7 — Memory Update
          (insights → decay → source quality → freshness expiry → episodes → failures)
     ↑________________________________________________________________|
              (feeds back into Stage 0 next run — every run builds on the last)
```
