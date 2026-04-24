-- Normalize metrics from JSON TEXT blob to proper typed columns
ALTER TABLE scheduled_posts ADD COLUMN metrics_views       INTEGER;
ALTER TABLE scheduled_posts ADD COLUMN metrics_likes       INTEGER;
ALTER TABLE scheduled_posts ADD COLUMN metrics_comments    INTEGER;
ALTER TABLE scheduled_posts ADD COLUMN metrics_shares      INTEGER;
ALTER TABLE scheduled_posts ADD COLUMN metrics_impressions INTEGER;
ALTER TABLE scheduled_posts ADD COLUMN metrics_reach       INTEGER;
ALTER TABLE scheduled_posts ADD COLUMN metrics_saved       INTEGER;
ALTER TABLE scheduled_posts ADD COLUMN metrics_upvotes     INTEGER;
ALTER TABLE scheduled_posts ADD COLUMN metrics_upvote_ratio REAL;
ALTER TABLE scheduled_posts ADD COLUMN metrics_fetched_at  INTEGER;
