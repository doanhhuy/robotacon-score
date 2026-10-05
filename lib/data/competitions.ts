import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getCompetitions() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .order('start_date', { ascending: false })

  if (error) throw error
  return data
}

export async function getCompetitionById(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data
}
