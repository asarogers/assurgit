-- social_accounts: add client_id for client-level credential sharing
-- Projects under the same client share one set of social accounts.
ALTER TABLE social_accounts ADD COLUMN client_id TEXT REFERENCES clients(id) ON DELETE CASCADE;
