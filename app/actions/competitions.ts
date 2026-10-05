'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function createCompetition(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const season = String(formData.get('season') ?? '').trim()
  if (!name || !season) throw new Error('Tên và mùa giải là bắt buộc.')

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('competitions').insert({ name, season, status: String(formData.get('status') ?? 'draft') as never, start_date: String(formData.get('start_date') || '') || null, end_date: String(formData.get('end_date') || '') || null })
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/competitions')
  redirect('/dashboard/competitions')
}
