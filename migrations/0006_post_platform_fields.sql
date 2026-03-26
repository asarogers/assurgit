ALTER TABLE scheduled_posts ADD COLUMN title TEXT;
ALTER TABLE scheduled_posts ADD COLUMN subreddit TEXT;
ALTER TABLE scheduled_posts ADD COLUMN visibility TEXT DEFAULT 'public';
