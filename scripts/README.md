# Legacy Scripts (Deprecated)

**⚠️ These files have been migrated to the Supabase migrations system.**

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
