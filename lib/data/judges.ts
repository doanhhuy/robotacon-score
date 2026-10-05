import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getJudges() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('judges').select('*').order('name')
  if (error) throw error
  return data
}
