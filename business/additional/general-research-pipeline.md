# General Research Pipeline

A foundational research architecture covering the core concepts used in production AI research systems. Any domain-specific research pipeline should implement these stages.

## Models

| Role | Model | Size |
|---|---|---|
| Embeddings | `qwen3-embedding:8b` | 4.7GB |
| Planning | `qwen3:32b` | ~19GB |
| Routing + Extraction | `qwen3:8b` | ~5GB |
| Query Expansion | `qwen3:14b` | ~9GB |
| Verification | `deepseek-r1:32b` | ~20GB |
| Knowledge Integration | `qwen3:14b` | (shared) |
| Synthesis + Output | `gpt-oss:20b` | ~14GB |
| Memory Update | `qwen3:8b` | (shared) |

All models are Apache 2.0 or MIT licensed. Total peak memory: ~72GB. Designed for Apple M3 Studio Ultra (96GB unified memory).

---

## Stage 0 — Source Health + Memory Warm-Up

**Purpose:** Before any research begins, check that sources are reachable and load everything the system already knows about the research goal.

### 0a — Source Health (`qwen3:8b`)
- Ping all known sources in the source registry
- Mark each as `healthy` / `degraded` / `down`
- Degraded and down sources are excluded from retrieval this run
- Update `last_checked` timestamp

### 0b — Memory Retrieval (`qwen3-embedding:8b` + `qwen3:32b`)
- Embed the research goal using `qwen3-embedding:8b`
- Query all memory tables (knowledge, insights, episodes, failures) via semantic search
- Surface: what we already know, what sources worked before, what failed, what gaps were previously identified but never filled
- Pass full memory context forward to Stage 1

**Output:** Source health status. Memory context bundle.

---

## Stage 1 — Intent + Research Plan

**Model:** `qwen3:32b`
**Purpose:** Understand the goal deeply and decompose it into a structured research plan before touching any source. This is what separates a search from research.

1. Read the research goal
2. Clarify intent:
   - What is the core question?
   - What would a complete answer look like?
   - What is explicitly out of scope?
3. Decompose into sub-questions:
   - Break the goal into 3–7 specific, answerable sub-questions
   - Each sub-question should be independently searchable
   - Order by dependency (some answers depend on others)
4. Identify source types needed per sub-question:
   - Web search, databases, APIs, documents, archives, domain-specific registries
5. Use memory context from Stage 0 to:
   - Skip sub-questions already well-answered in past runs
   - Prioritize gaps that were identified but never resolved
   - Weight source types toward what has historically yielded good data
6. Write the research plan to the `plans` table:
   - Sub-questions, source types, priority order, known gaps from memory

**Output:** A structured research plan. Sub-questions queued for retrieval.

---

## Stage 2 — Iterative Retrieval

**Model:** `qwen3:8b` (routing + gap detection) · `qwen3:14b` (follow-up query expansion)
**Purpose:** Retrieve evidence for each sub-question across all relevant source types. Not a single pass — loops until coverage is sufficient or the retrieval budget is exhausted.

### Loop structure:

**Round 1 — Broad retrieval**
- For each sub-question, run searches across assigned source types
- Retrieve raw content (web pages, documents, API responses, feeds)
- Store each item in the `raw` table with: source, retrieved_at, sub-question ID
- Push all retrieved items to the cleaning queue

**Gap Detection (between rounds)**
- After each round, assess coverage per sub-question:
  - `covered` — sufficient evidence found, stop searching this sub-question
  - `partial` — some evidence, but key aspects unanswered
  - `empty` — nothing useful returned
- For `partial` and `empty` sub-questions: generate targeted follow-up queries
  - "What specifically is still unknown?"
  - "What alternative phrasings or source types haven't been tried?"
- Write gap assessment to `gaps` table

**Round 2+ — Targeted retrieval**
- Run follow-up queries for uncovered sub-questions only
- Try alternative source types if primary sources failed
- Repeat up to a configured max rounds (default: 3)

**Stopping conditions:**
- All sub-questions are `covered`
- Max rounds reached
- Retrieval budget exhausted (token count or time limit)

**Output:** Raw content for all retrieved items. Gap log. Coverage status per sub-question.

---

## Stage 3 — Cleaning

**Model:** `qwen3:8b`
**Purpose:** Normalize raw content into clean, readable text regardless of source type.

- Strip noise: ads, navigation, boilerplate, scripts, formatting artifacts
- Normalize: encoding, whitespace, date formats, numeric formats
- For non-HTML sources: extract text from PDFs, transcribe audio, flatten API JSON into prose
- Write cleaned content to disk, store path in `raw` table

**Output:** Clean text files ready for extraction.

---

## Stage 4 — Extraction

**Model:** `qwen3:8b`
**Purpose:** Pull structured information from cleaned content. What fields matter depends on the domain — but the process is universal.

1. Read cleaned content
2. Extract entities: people, organizations, products, places, dates, quantities — whatever is relevant to the research goal
3. Extract claims: specific statements of fact, opinion, or data asserted by the source
4. Assign confidence score per extracted item (0.0–1.0)
5. Link each claim to its source and the sub-question it addresses

### Confidence Gate — Drop threshold: 0.4
- Records below 0.4 overall confidence are written to `dropped` with reason and stop here
- Records above 0.4 proceed to verification

**Output:** Structured records with entities, claims, confidence scores, and source links.

---

## Stage 5 — Verification

**Model:** `deepseek-r1:32b`
**Purpose:** Test every claim against other sources. Flag contradictions. Build the evidence chain.

1. For each extracted claim:
   - Search for corroborating or contradicting claims across other retrieved records
   - Check against the knowledge base (what did past runs establish as reliable?)
   - Assign a verdict: `corroborated` / `uncorroborated` / `contradicted`
2. For contradictions:
   - Identify which source is more credible (source quality score, recency, specificity)
   - Attempt resolution: does one source supersede the other?
   - If unresolvable: flag both claims, note the contradiction, include both in output with uncertainty marker
3. Build evidence chain: each verified claim now has a traceable path back to its source(s)
4. Compute overall record confidence

### Confidence Gate — Drop threshold: 0.5
- Records below 0.5 after verification are dropped
- Records above 0.5 proceed with their evidence chains intact

**Output:** Verified claims with evidence chains. Contradictions flagged and where possible resolved.

---

## Stage 6 — Knowledge Integration

**Model:** `qwen3:14b` · `qwen3-embedding:8b` (for semantic queries)
**Purpose:** Connect new findings to what is already known. This is what turns a pile of verified facts into structured knowledge.

1. For each verified record, query the knowledge base semantically:
   - Are there existing knowledge entries this confirms, extends, or contradicts?
2. Entity resolution: is "OpenAI" in this record the same entity as "OpenAI" in a past record? Link them.
3. Claim merging: if two sources say the same thing in different words, merge into one claim with two evidence sources
4. Contradiction update: if a new finding contradicts an established knowledge entry, flag for human review or update with decay on the old entry
5. Write new or updated entries to the `knowledge` table with:
   - Claim body, entity links, evidence sources, confidence, run ID

**Output:** Knowledge base updated. New findings connected to existing knowledge.

---

## Stage 7 — Synthesis

**Model:** `gpt-oss:20b`
**Purpose:** Combine verified, integrated knowledge into coherent findings that answer the original research plan.

1. Read all verified + integrated records from this run
2. Read the research plan (sub-questions and their coverage status)
3. For each sub-question, synthesize an answer:
   - What does the evidence say?
   - How confident are we? (aggregate confidence across contributing claims)
   - What is still uncertain or unresolved?
   - What contradictions remain?
4. Combine sub-question answers into a unified research brief:
   - Lead with the highest-confidence findings
   - Surface key uncertainties prominently — do not bury them
   - Include evidence citations for every major claim
   - Note what was not found (gap log from Stage 2)
5. Assign an overall research completeness score:
   - `complete` — all sub-questions answered with high confidence
   - `partial` — most sub-questions answered, some gaps remain
   - `incomplete` — significant gaps, findings should be treated as preliminary

**Output:** Research brief with evidence-backed findings, uncertainty markers, and completeness score.

---

## Stage 8 — Memory Update

**Model:** `qwen3:8b` (housekeeping + decay) · `qwen3:14b` (insight extraction) · `qwen3-embedding:8b` (embedding new entries)
**Purpose:** Make the next run smarter. Everything learned this run — what worked, what didn't, what was found — feeds back into the system.

### 8a — Knowledge Persistence
- All new knowledge entries from Stage 6 are now permanent in the `knowledge` table
- Existing entries that were confirmed this run: reset decay, increment evidence count
- Existing entries that were contradicted: flag for review or decay

### 8b — Insight Extraction
- Detect patterns across this run's findings:
  - Which source types yielded the highest coverage?
  - Which query formulations returned the most useful results?
  - Which sub-question structures worked well vs. produced noise?
- Write to `insights` table with confidence score and evidence

### 8c — Insight Decay
- Apply decay to all active insights not confirmed this run:
  ```sql
  UPDATE insights SET decay_score = decay_score * 0.95 WHERE status = 'active';
  UPDATE insights SET status = 'retired' WHERE decay_score < 0.3;
  ```
- Confirmed insights: reset decay to 1.0

### 8d — Source Quality Update
- For each source used this run, update its quality record:
  - Coverage rate: how often did it address the sub-question it was retrieved for?
  - Verification rate: what % of its claims were corroborated?
  - Contradiction rate: how often did it conflict with other sources?
  - Recalculate quality score
- Sources below quality threshold after 3+ runs: deprioritize

### 8e — Gap Persistence
- Any sub-questions that ended `partial` or `empty` after max retrieval rounds:
  - Write to `persistent_gaps` table
  - These are injected into Stage 1 on the next run as known open questions
  - Gaps confirmed across 3+ consecutive runs are escalated (flagged for human attention or alternative source strategy)

### 8f — Freshness Expiry
- Mark knowledge entries older than the domain's TTL as `stale`
- Stale entries are still readable but excluded from synthesis as primary evidence

### 8g — Episode Write
- Write one episode record summarizing this run:
  - Sub-questions attempted and coverage status
  - Retrieval rounds run
  - Drop rates at each confidence gate
  - Source performance summary
  - Key findings (top 3 claims by confidence)
  - Open gaps carried forward

**Output:** Knowledge base updated. Insights updated and decayed. Sources scored. Gaps persisted. Episode written.

---

## Database Tables

```sql
-- Research plans
CREATE TABLE plans (
  id              SERIAL PRIMARY KEY,
  goal            TEXT,
  sub_questions   JSONB,   -- [{id, question, source_types, priority, status}]
  run_id          TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Raw retrieved content
CREATE TABLE raw (
  id              SERIAL PRIMARY KEY,
  url             TEXT,
  source_type     TEXT,   -- web | pdf | api | feed | transcript
  filepath        TEXT,
  clean_path      TEXT,
  sub_question_id TEXT,
  run_id          TEXT,
  retrieved_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Extracted claims
CREATE TABLE extracted (
  id              SERIAL PRIMARY KEY,
  raw_id          INTEGER REFERENCES raw(id),
  entities        JSONB,
  claims          JSONB,   -- [{body, confidence, sub_question_id}]
  confidence      FLOAT,
  run_id          TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Verified claims with evidence chains
CREATE TABLE verified (
  id              SERIAL PRIMARY KEY,
  extracted_id    INTEGER REFERENCES extracted(id),
  claims          JSONB,   -- [{body, verdict, evidence_sources, confidence}]
  contradictions  JSONB,
  confidence      FLOAT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Integrated knowledge base
CREATE TABLE knowledge (
  id              SERIAL PRIMARY KEY,
  body            TEXT,
  entities        JSONB,
  evidence        JSONB,   -- [{source_url, run_id, confidence}]
  confidence      FLOAT DEFAULT 0.5,
  decay_score     FLOAT DEFAULT 1.0,
  status          TEXT DEFAULT 'active',   -- active | stale | contradicted | retired
  embedding       vector(1024),
  last_confirmed  TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Research briefs
CREATE TABLE briefs (
  id              SERIAL PRIMARY KEY,
  plan_id         INTEGER REFERENCES plans(id),
  findings        JSONB,   -- per sub-question answers
  completeness    TEXT,    -- complete | partial | incomplete
  narrative       TEXT,
  run_id          TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Learned patterns
CREATE TABLE insights (
  id              SERIAL PRIMARY KEY,
  scope           TEXT,
  category        TEXT,
  body            TEXT,
  confidence      FLOAT DEFAULT 0.5,
  decay_score     FLOAT DEFAULT 1.0,
  evidence_count  INTEGER DEFAULT 1,
  embedding       vector(1024),
  last_confirmed  TIMESTAMPTZ DEFAULT NOW(),
  status          TEXT DEFAULT 'active',   -- active | superseded | retired
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Gaps that persisted across retrieval rounds
CREATE TABLE persistent_gaps (
  id              SERIAL PRIMARY KEY,
  sub_question    TEXT,
  consecutive_runs INTEGER DEFAULT 1,
  last_attempted  TIMESTAMPTZ DEFAULT NOW(),
  status          TEXT DEFAULT 'open',   -- open | escalated | resolved
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Source registry
CREATE TABLE sources (
  id              SERIAL PRIMARY KEY,
  domain          TEXT UNIQUE NOT NULL,
  source_type     TEXT,
  status          TEXT DEFAULT 'healthy',   -- healthy | degraded | down | deprioritized
  quality_score   FLOAT DEFAULT 0.5,
  coverage_rate   FLOAT,
  verified_rate   FLOAT,
  contradiction_rate FLOAT,
  last_checked    TIMESTAMPTZ,
  run_count       INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Run history
CREATE TABLE episodes (
  id              SERIAL PRIMARY KEY,
  run_id          TEXT,
  summary         TEXT,
  stats           JSONB,
  embedding       vector(1024),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Dropped records
CREATE TABLE dropped (
  id              SERIAL PRIMARY KEY,
  raw_id          INTEGER REFERENCES raw(id),
  stage           TEXT,
  reason          TEXT,
  confidence      FLOAT,
  run_id          TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Failure log
CREATE TABLE failures (
  id              SERIAL PRIMARY KEY,
  domain          TEXT,
  error_type      TEXT,
  detail          TEXT,
  resolved        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Shared queue
CREATE TABLE queue (
  id              SERIAL PRIMARY KEY,
  stage           TEXT,
  payload         TEXT,
  status          TEXT DEFAULT 'pending',   -- pending | processing | done | error
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX ON knowledge USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX ON knowledge (status, decay_score);
CREATE INDEX ON insights USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX ON insights (status, decay_score);
CREATE INDEX ON episodes USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX ON sources (status, quality_score);
CREATE INDEX ON queue (stage, status);
CREATE INDEX ON raw (sub_question_id, run_id);
```

---

## Pipeline Flow

```
Research Goal
     ↓
Stage 0 — Source Health + Memory Warm-Up
          (check sources → retrieve what we already know)
     ↓
Stage 1 — Intent + Research Plan
          (clarify goal → decompose into sub-questions → order by priority)
     ↓
Stage 2 — Iterative Retrieval Loop
          (retrieve → detect gaps → retrieve again → until covered or budget exhausted)
     ↓
Stage 3 — Cleaning
          (normalize all source types into clean text)
     ↓
Stage 4 — Extraction + Confidence Gate (drop < 0.4)
          (entities, claims, confidence scores)
     ↓
Stage 5 — Verification + Confidence Gate (drop < 0.5)
          (corroborate claims → build evidence chains → resolve contradictions)
     ↓
Stage 6 — Knowledge Integration
          (connect findings to existing knowledge → entity linking → claim merging)
     ↓
Stage 7 — Synthesis
          (answer sub-questions → unified brief → evidence citations → completeness score)
     ↓
Stage 8 — Memory Update
          (knowledge → insights → decay → source quality → gaps → freshness → episode)
     ↑___________________________________________________________________|
                    (every run builds on the last)
```

---

## What Separates This From a Search

| Search | This Pipeline |
|---|---|
| One pass | Iterative — loops until gaps are filled |
| Returns documents | Returns answers with evidence chains |
| No memory | Accumulates knowledge across runs |
| Treats all sources equally | Sources scored and ranked over time |
| Stops when it finds something | Stops when it knows enough |
| No uncertainty tracking | Surfaces what is unknown explicitly |
