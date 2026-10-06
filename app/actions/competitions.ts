'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { requireStaffUser } from '@/lib/supabase/auth'

export type CreateCompetitionState = { error?: string }

const competitionStatuses = ['draft', 'published', 'active'] as const

export async function createCompetition(
  _previousState: CreateCompetitionState,
  formData: FormData,
): Promise<CreateCompetitionState> {
  const name = String(formData.get('name') ?? '').trim()
  const season = String(formData.get('season') ?? '').trim()
  const status = String(formData.get('status') ?? 'draft')
  const startDate = String(formData.get('start_date') ?? '').trim() || null
  const endDate = String(formData.get('end_date') ?? '').trim() || null

  if (!name || !season) return { error: 'Tên và mùa giải là bắt buộc.' }
  if (!competitionStatuses.includes(status as (typeof competitionStatuses)[number])) {
    return { error: 'Trạng thái cuộc thi không hợp lệ.' }
  }
  if (startDate && endDate && endDate < startDate) {
    return { error: 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.' }
  }

  try {
    const { supabase } = await requireStaffUser()
    const { error } = await supabase.from('competitions').insert({
      name,
      season,
      status: status as never,
      start_date: startDate,
      end_date: endDate,
    })

    if (error) return { error: error.message }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Không thể tạo cuộc thi.' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/competitions')
  redirect('/dashboard/competitions')
}
