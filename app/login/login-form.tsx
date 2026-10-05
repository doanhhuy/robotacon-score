'use client'

import { FormEvent, useState } from 'react'

import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export function LoginForm() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')

    try {
      const supabase = createSupabaseBrowserClient()
      const signInRequest = supabase.auth.signInWithPassword({ email, password })
      const timeout = new Promise<never>((_, reject) => {
        window.setTimeout(() => reject(new Error('Kết nối Supabase quá lâu. Hãy kiểm tra mạng hoặc NEXT_PUBLIC_SUPABASE_URL.')), 12000)
      })
      const { error: signInError } = await Promise.race([signInRequest, timeout])
      if (signInError) throw signInError
      window.location.assign('/dashboard')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Không thể kết nối Supabase.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div><label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="email">Email</label><input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#168a79] focus:ring-4 focus:ring-[#d6faf3]" id="email" name="email" type="email" autoComplete="email" required /></div>
      <div><label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="password">Mật khẩu</label><input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#168a79] focus:ring-4 focus:ring-[#d6faf3]" id="password" name="password" type="password" autoComplete="current-password" required /></div>
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">{error}</p>}
      <button className="w-full rounded-xl bg-[#10233f] px-4 py-3 font-extrabold text-white transition hover:bg-[#18365e] disabled:cursor-wait disabled:opacity-60" disabled={pending} type="submit">{pending ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
    </form>
  )
}
