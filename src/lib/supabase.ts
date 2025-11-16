import { createClient } from '@supabase/supabase-js'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || supabaseUrl.includes('your_supabase_url_here')) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL environment variable. ' +
    'Please add it to .env.local with your Supabase project URL.'
  )
}

if (!supabaseAnonKey || supabaseAnonKey.includes('your_supabase_anon_key_here')) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. ' +
    'Please add it to .env.local with your Supabase anon key.'
  )
}

if (!supabaseServiceRoleKey || supabaseServiceRoleKey.includes('your_service_role_key_here')) {
  throw new Error(
    'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. ' +
    'Please add it to .env.local with your Supabase service role key.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (for API routes only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
