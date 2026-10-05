'use server'

import { redirect } from 'next/navigation'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function bootstrapAdmin(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  if (!name) throw new Error('Vui lòng nhập họ tên.')
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.rpc('bootstrap_current_user', { display_name: name })
  if (error) throw new Error(error.message)
  redirect('/dashboard')
}
