# Supabase Local Development

This directory contains the Supabase configuration and migrations for local development.

## Structure

```
supabase/
├── config.toml              # Supabase configuration
├── migrations/              # Database migrations (applied in order)
│   ├── 20241111000001_initial_schema.sql
│   ├── 20241111000002_contact_submissions.sql
│   └── 20241111000003_cron_logs.sql
└── seed.sql                 # Seed data for local development
```

## Getting Started

### Prerequisites

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Install Docker (required for local Supabase instance)

### Starting Local Supabase

```bash
supabase start
```

This will:
- Start a local PostgreSQL database
- Start Supabase Studio (web UI) at http://localhost:54323
- Run all migrations in `/migrations/` directory
- Execute the `seed.sql` file

You'll receive output with connection details:
```
API URL: http://localhost:54321
DB URL: postgresql://postgres:postgres@localhost:54322/postgres
Studio URL: http://localhost:54323
anon key: eyJh...
service_role key: eyJh...
```

### Stopping Local Supabase

```bash
supabase stop
```

### Resetting the Database

```bash
supabase db reset
```

This will:
1. Drop all tables
2. Re-run all migrations
3. Re-run the seed file

## Migrations

### Migration Files

Migrations are numbered with timestamps and descriptive names:

1. **20241111000001_initial_schema.sql** - Core portfolio tables
   - `github_commits` - GitHub commit activity
   - `github_projects` - Portfolio projects
   - `leetcode_submissions` - LeetCode problem submissions
   - `datacamp_courses` - DataCamp courses with certificates
   - `datacamp_projects` - DataCamp project portfolio
   - Includes indexes, triggers, and RLS policies

2. **20241111000002_contact_submissions.sql** - Contact form logging
   - `contact_submissions` - Stores contact form submissions
   - Service role access only

3. **20241111000003_cron_logs.sql** - Cron job tracking
   - `cron_logs` - Logs for scheduled data refresh jobs
   - Service role access only

### Creating New Migrations

```bash
supabase migration new <migration_name>
```

This creates a new timestamped migration file in `/migrations/`.

### Applying Migrations to Remote

```bash
# Link to your remote project
supabase link --project-ref <project-ref>

# Push migrations
supabase db push
```

## Seed Data

The `seed.sql` file contains sample data for local development. It runs automatically when you start Supabase.

To add seed data:
1. Edit `seed.sql`
2. Add INSERT statements for your tables
3. Run `supabase db reset` to reload

## Environment Variables

For local development, use the credentials from `supabase start` output in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from output>
SUPABASE_SERVICE_ROLE_KEY=<service_role key from output>
```

## Database Schema

### Tables Overview

| Table | Description | Public Read | Service Write |
|-------|-------------|-------------|---------------|
| `github_commits` | GitHub commit activity | ✅ | ✅ |
| `github_projects` | Portfolio projects | ✅ | ✅ |
| `leetcode_submissions` | LeetCode submissions | ✅ | ✅ |
| `datacamp_courses` | DataCamp courses | ✅ | ✅ |
| `datacamp_projects` | DataCamp projects | ✅ | ✅ |
| `contact_submissions` | Contact form logs | ❌ | ✅ |
| `cron_logs` | Cron execution logs | ❌ | ✅ |

### Row Level Security (RLS)

All tables have RLS enabled:
- **Public tables**: Anyone can read, only service role can write
- **Private tables**: Only service role can read/write

## Useful Commands

```bash
# Start Supabase
supabase start

# Stop Supabase
supabase stop

# View status
supabase status

# Reset database (rerun migrations + seed)
supabase db reset

# Create new migration
supabase migration new <name>

# Link to remote project
supabase link --project-ref <ref>

# Push migrations to remote
supabase db push

# Pull migrations from remote
supabase db pull

# Generate TypeScript types
supabase gen types typescript --local > src/types/supabase.ts
```

## Troubleshooting

### Port conflicts
If ports are already in use, stop existing services:
```bash
supabase stop
docker ps  # Check for conflicting containers
```

### Migrations not applying
```bash
supabase db reset  # Force reload all migrations
```

### Can't connect to database
1. Ensure Docker is running
2. Check `supabase status` for connection details
3. Verify `.env.local` has correct credentials

## Resources

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Local Development Guide](https://supabase.com/docs/guides/cli/local-development)
- [Migrations Guide](https://supabase.com/docs/guides/cli/local-development#database-migrations)
