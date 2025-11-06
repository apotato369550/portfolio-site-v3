import { supabaseAdmin } from '@/lib/supabase'

export async function logContactSubmission(
  name: string,
  email: string,
  message: string,
  ipAddress: string
) {
  try {
    const { error } = await supabaseAdmin.from('contact_submissions').insert({
      name,
      email,
      message,
      ip_address: ipAddress,
    })

    if (error) {
      console.error('Error logging contact submission:', error)
    }
  } catch (error) {
    console.error('Error logging contact submission:', error)
  }
}
