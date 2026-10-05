'use server'

import { redirect } from 'next/navigation'

import { createSupabaseServerClient } from '@/lib/supabase/server'

export type LoginState = { error?: string }

export async function signIn(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) return { error: 'Vui lòng nhập email và mật khẩu.' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: 'Email hoặc mật khẩu không chính xác.' }
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  if (!email) throw new Error('Vui lòng nhập email.')
  const supabase = await createSupabaseServerClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/login` })
  if (error) throw new Error(error.message)
}

export async function signUp(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  if (!email || password.length < 8) throw new Error('Email hợp lệ và mật khẩu tối thiểu 8 ký tự là bắt buộc.')
  const supabase = await createSupabaseServerClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${origin}/auth/callback` } })
  if (error) throw new Error(error.message)
  if (data.session) redirect('/setup')
  redirect('/login?message=check-email')
}
