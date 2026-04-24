-- Referral links for audit.assurgit.com
-- Each slug maps to a UTM-tagged destination so GA/Search Console can attribute traffic
CREATE TABLE IF NOT EXISTS referral_links (
  id          TEXT    PRIMARY KEY NOT NULL,
  slug        TEXT    NOT NULL UNIQUE,
  platform    TEXT    NOT NULL,
  label       TEXT    NOT NULL,
  utm_source  TEXT    NOT NULL,
  utm_medium  TEXT    NOT NULL,
  utm_campaign TEXT   NOT NULL DEFAULT 'seo-audit',
  utm_content TEXT    NOT NULL DEFAULT '',
  notes       TEXT    NOT NULL DEFAULT '',
  clicks      INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL
);

INSERT INTO referral_links (id,slug,platform,label,utm_source,utm_medium,utm_campaign,utm_content,notes,clicks,created_at,updated_at) VALUES
  ('rl-reddit-okc',        'reddit-okc',        'reddit',    'r/OklahomaCityBusiness',     'reddit',    'community','seo-audit','okc-business',    'Oklahoma City local business subreddit',        0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-reddit-smallbiz',   'reddit-smallbiz',   'reddit',    'r/smallbusiness',            'reddit',    'community','seo-audit','smallbusiness',   'r/smallbusiness',                               0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-reddit-entrepreneur','reddit-entrepreneur','reddit',   'r/Entrepreneur',             'reddit',    'community','seo-audit','entrepreneur',    'r/Entrepreneur',                                0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-reddit-localseo',   'reddit-localseo',   'reddit',    'r/SEO',                      'reddit',    'community','seo-audit','seo',             'r/SEO subreddit',                               0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-tiktok-bio',        'tiktok-bio',        'tiktok',    'TikTok bio link',            'tiktok',    'social',   'seo-audit','bio',             'Primary link in TikTok profile bio',            0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-tiktok-comment',    'tiktok-comment',    'tiktok',    'TikTok comments',            'tiktok',    'social',   'seo-audit','comment',         'Drop in comments on relevant TikToks',          0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-youtube-desc',      'youtube-desc',      'youtube',   'YouTube video description',  'youtube',   'video',    'seo-audit','description',     'Link placed in video descriptions',             0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-youtube-pinned',    'youtube-pinned',    'youtube',   'YouTube pinned comment',     'youtube',   'video',    'seo-audit','pinned-comment',  'Pinned comment on YouTube videos',              0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-instagram-bio',     'instagram-bio',     'instagram', 'Instagram bio link',         'instagram', 'social',   'seo-audit','bio',             'assurgit Instagram profile bio',                0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-instagram-story',   'instagram-story',   'instagram', 'Instagram story link',       'instagram', 'social',   'seo-audit','story',           'Instagram story link sticker',                  0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-facebook-group',    'facebook-group',    'facebook',  'Facebook group post',        'facebook',  'community','seo-audit','group',           'Generic Facebook group',                        0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-facebook-okc',      'facebook-okc',      'facebook',  'Facebook OKC Business Group','facebook',  'community','seo-audit','okc-group',       'Oklahoma City Facebook business groups',         0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-skool-main',        'skool-main',        'skool',     'Skool community post',       'skool',     'community','seo-audit','main',            'Primary Skool group',                           0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-whatsapp-group',    'whatsapp-group',    'whatsapp',  'WhatsApp group',             'whatsapp',  'messaging','seo-audit','group',           'Generic WhatsApp group',                        0,strftime('%s','now')*1000,strftime('%s','now')*1000),
  ('rl-direct',            'direct',            'direct',    'Direct / unknown',           'direct',    'referral', 'seo-audit','direct',          'Fallback for unknown channel',                  0,strftime('%s','now')*1000,strftime('%s','now')*1000);
