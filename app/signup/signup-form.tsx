'use client'

import { FormEvent, useState } from 'react'

import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export function SignupForm() {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')
    setPending(true)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')

    try {
      const supabase = createSupabaseBrowserClient()
      const signUpRequest = supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      const timeout = new Promise<never>((_, reject) => {
        window.setTimeout(() => reject(new Error('Kết nối Supabase quá lâu. Hãy kiểm tra mạng hoặc NEXT_PUBLIC_SUPABASE_URL.')), 12000)
      })
      const { data, error: signUpError } = await Promise.race([signUpRequest, timeout])

      if (signUpError) throw signUpError
      if (data.session) {
        window.location.assign('/setup')
        return
      }

      setMessage('Tài khoản đã tạo. Hãy kiểm tra email để xác nhận trước khi đăng nhập.')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Không thể kết nối Supabase.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      <label className="block text-sm font-bold text-slate-700">Email<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168a79]" name="email" type="email" autoComplete="email" required /></label>
      <label className="block text-sm font-bold text-slate-700">Mật khẩu<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168a79]" name="password" type="password" autoComplete="new-password" minLength={8} required /></label>
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">{error}</p>}
      {message && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">{message}</p>}
      <button className="w-full rounded-xl bg-[#10233f] px-4 py-3 font-extrabold text-white disabled:cursor-wait disabled:opacity-60" disabled={pending} type="submit">{pending ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}</button>
    </form>
  )
}
