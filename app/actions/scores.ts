'use server'

import { revalidatePath } from 'next/cache'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function saveScore(formData: FormData) {
  const teamId = String(formData.get('team_id') ?? '')
  const judgeId = String(formData.get('judge_id') ?? '')
  const values = ['score_technical', 'score_creativity', 'score_performance', 'score_penalty'].map((field) => Number(formData.get(field) ?? 0))
  if (!teamId || !judgeId || values.some((value) => !Number.isFinite(value) || value < 0 || value > 100)) throw new Error('Điểm phải nằm trong khoảng từ 0 đến 100.')

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('scores').upsert({ team_id: teamId, judge_id: judgeId, score_technical: values[0], score_creativity: values[1], score_performance: values[2], score_penalty: values[3], submitted_at: formData.get('submit') === 'true' ? new Date().toISOString() : null }, { onConflict: 'team_id,judge_id' })
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/scoring')
  revalidatePath('/dashboard/rankings')
}
