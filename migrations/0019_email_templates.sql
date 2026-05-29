-- Editable email templates. The subscribe-link email is the first one we
-- expose for editing; structure leaves room for adding more (welcome,
-- intake reminder, monthly report, etc.) without another migration.
--
-- subject_variants is a JSON array of strings — one is picked at random
-- at send time so the customer doesn't always see the same subject.
-- body_html is the full inner-HTML; supports `{{businessName}}`,
-- `{{tier}}`, and `{{subscribeUrl}}` placeholders.

CREATE TABLE IF NOT EXISTS email_templates (
  key              TEXT PRIMARY KEY,
  subject_variants TEXT NOT NULL,         -- JSON array of subjects
  body_html        TEXT NOT NULL,
  updated_at       INTEGER NOT NULL
);

INSERT OR IGNORE INTO email_templates (key, subject_variants, body_html, updated_at)
VALUES (
  'subscribe_link',
  '["Welcome aboard — let''s get you found","Welcome aboard — let''s get you on the map","Welcome aboard — let''s get you booked"]',
  '<div style="font-family:-apple-system,BlinkMacSystemFont,''Segoe UI'',sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1a1a1a">
  <p style="color:#1a1a1a;font-size:16px;line-height:1.6;margin:0 0 16px">Hi {{businessName}} team,</p>

  <p style="color:#1a1a1a;font-size:16px;line-height:1.6;margin:0 0 16px">
    Thanks so much for the deposit — really excited to get started on your site!
  </p>

  <p style="color:#1a1a1a;font-size:16px;line-height:1.6;margin:0 0 16px">
    Whenever you''re ready, the button below will take you to a secure Stripe page to add your card and activate your {{tier}} subscription. Your first month begins today, since you''ve already paid the deposit and we''re past the build window.
  </p>

  <p style="color:#1a1a1a;font-size:16px;line-height:1.6;margin:0 0 16px">
    First thing on my end once your card is on file: I''ll pull your top 3 competitors and put together a tier-ranked keyword plan for {{businessName}}. You''ll see the draft in your inbox within 5 days. There are a hundred SEO shops out there — thanks for picking us. Won''t take it for granted.
  </p>

  <p style="margin:28px 0">
    <a href="{{subscribeUrl}}" style="display:inline-block;padding:14px 26px;background:#2563eb;color:#fff;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px">
      Activate subscription →
    </a>
  </p>

  <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 16px">
    No rush — this link is good for 14 days. If it expires before you get to it, just reply and I''ll send a fresh one. And if you have any questions in the meantime, hit reply anytime.
  </p>

  <p style="color:#1a1a1a;font-size:15px;line-height:1.6;margin:24px 0 0">
    Talk soon,<br />
    <strong>Ace</strong><br />
    <span style="color:#888;font-size:13px">Assurgit</span>
  </p>
</div>',
  strftime('%s','now') * 1000
);
