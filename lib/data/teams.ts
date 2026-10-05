import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getTeamsByCompetition(competitionId: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('competition_id', competitionId)
    .order('team_name')

  if (error) throw error
  return data
}

export async function getTeams(search?: string) {
  const supabase = await createSupabaseServerClient()
  let query = supabase.from('teams').select('*').order('created_at', { ascending: false })
  const safeSearch = search?.trim().replace(/[^\p{L}\p{N} _-]/gu, '')
  if (safeSearch) query = query.or(`team_name.ilike.%${safeSearch}%,school_name.ilike.%${safeSearch}%,category.ilike.%${safeSearch}%`)
  const { data, error } = await query
  if (error) throw error
  return data
}
