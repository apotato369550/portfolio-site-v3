# Scripts Directory

## UI Inspection Script

**New in v3:** `inspect-ui.ts` - Playwright-based UI inspection tool for analyzing the portfolio site structure and capturing assets.

### Usage

```bash
# Run inspection on default port 3000
npm run inspect:ui

# Run inspection on custom port
npm run inspect:ui -- --port=3001
```

### What It Does

1. Launches a Playwright browser and navigates to localhost:PORT
2. Waits for the loading screen animation to complete (3.5 seconds)
3. Takes a full-page screenshot
4. Analyzes the DOM and extracts:
   - All sections with IDs
   - All images (src, alt, visibility)
   - All buttons and interactive elements
   - All headings (h1-h6)
   - All links with href values
   - Viewport dimensions

### Output

Creates `/inspect-output/` directory with:
- `screenshot.png` - Full-page screenshot (PNG, ~2-3 MB)
- `ui-report.json` - Structured data report (JSON, ~10-15 KB)

The JSON report has this structure:
```json
{
  "timestamp": "ISO 8601 timestamp",
  "viewport": { "width": 1280, "height": 720 },
  "sections": [{ "id": "...", "tagName": "...", "isVisible": true, ... }],
  "images": [{ "src": "...", "alt": "...", "isVisible": true, ... }],
  "buttons": [{ "text": "...", "selector": "...", ... }],
  "headings": [{ "level": "h1", "text": "...", ... }],
  "links": [{ "href": "...", "text": "...", ... }]
}
```

### Requirements

- Next.js dev server running (default port 3000)
- Playwright browsers installed (`npx playwright install`)
- TypeScript and ts-node available

---

## Legacy Scripts (Deprecated)

**⚠️ Database migration files have been migrated to the Supabase migrations system.**

## New Location

All database migrations are now located in `/supabase/migrations/`:

- `20241111000001_initial_schema.sql` - Core tables (github_commits, github_projects, leetcode_submissions, datacamp_courses, datacamp_projects)
- `20241111000002_contact_submissions.sql` - Contact form submissions table
- `20241111000003_cron_logs.sql` - Cron job execution logs table

## Seed Data

Seed data template is located at `/supabase/seed.sql`

## Running Migrations

To run the migrations locally:

```bash
supabase start
```

This will:
1. Start a local Supabase instance (PostgreSQL + Studio)
2. Run all migrations in `/supabase/migrations/` in order
3. Execute the seed file at `/supabase/seed.sql`

## Legacy Files in This Directory

- `supabase-schema.sql` - **MIGRATED** to `/supabase/migrations/20241111000001_initial_schema.sql`
- `supabase-contact-table.sql` - **MIGRATED** to `/supabase/migrations/20241111000002_contact_submissions.sql`
- `supabase-cron-logs-table.sql` - **MIGRATED** to `/supabase/migrations/20241111000003_cron_logs.sql`
- `seed-database.ts` - TypeScript seeding script (still useful for migrating data from v2)

## Using the TypeScript Seed Script

The `seed-database.ts` file can still be used to migrate data from the v2 project:

```bash
# Ensure environment variables are set
# NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

npx tsx scripts/seed-database.ts
```

This script reads JSON files from `../portfolio-site-v2/server/data/` and inserts them into Supabase.
