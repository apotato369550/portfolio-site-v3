import { supabaseAdmin } from '@/lib/supabase'

export async function logCronExecution(
  jobName: string,
  status: 'success' | 'failure',
  details: any
) {
  // Optional: Create a cron_logs table in Supabase
  try {
    const { error } = await supabaseAdmin.from('cron_logs').insert({
      job_name: jobName,
      status,
      details: JSON.stringify(details),
      executed_at: new Date().toISOString(),
    })

    if (error) {
      console.error('Error logging cron execution:', error)
    }
  } catch (error) {
    console.error('Error logging cron execution:', error)
  }
}
