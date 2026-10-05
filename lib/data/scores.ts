import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getScoresByTeam(teamId: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('team_id', teamId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getTeamRankings(competitionId: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('team_rankings')
    .select('*')
    .eq('competition_id', competitionId)
    .order('ranking')

  if (error) throw error
  return data
}

export async function getDashboardStats() {
  const supabase = await createSupabaseServerClient()
  const [competitions, teams, judges, scores] = await Promise.all([
    supabase.from('competitions').select('id', { count: 'exact', head: true }),
    supabase.from('teams').select('id', { count: 'exact', head: true }),
    supabase.from('judges').select('id', { count: 'exact', head: true }),
    supabase.from('scores').select('id', { count: 'exact', head: true }).not('submitted_at', 'is', null),
  ])
  const error = competitions.error ?? teams.error ?? judges.error ?? scores.error
  if (error) throw error
  return { competitions: competitions.count ?? 0, teams: teams.count ?? 0, judges: judges.count ?? 0, submittedScores: scores.count ?? 0 }
}
