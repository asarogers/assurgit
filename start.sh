#!/bin/bash
# Run once to set up the database, then start the server.
set -e

echo "Running database migration..."
npx tsx lib/db/migrate.ts

echo "Starting server..."
npm run dev
