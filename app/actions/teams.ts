'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function createTeam(formData: FormData) {
  const competitionId = String(formData.get('competition_id') ?? '')
  const teamName = String(formData.get('team_name') ?? '').trim()
  const schoolName = String(formData.get('school_name') ?? '').trim()
  const category = String(formData.get('category') ?? '').trim()
  if (!competitionId || !teamName || !schoolName || !category) throw new Error('Vui lòng nhập đủ thông tin đội thi.')

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('teams').insert({ competition_id: competitionId, team_name: teamName, school_name: schoolName, category, table_name: String(formData.get('table_name') || '') || null })
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/teams')
  redirect('/dashboard/teams')
}
