'use server'

import { revalidatePath } from 'next/cache'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function createJudge(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const role = String(formData.get('role') ?? 'judge')
  if (!name || !email || !email.includes('@') || !['judge', 'organizer'].includes(role)) throw new Error('Thông tin giám khảo hoặc role không hợp lệ.')
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('judges').insert({ name, email, role: role as never })
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/judges')
}
