'use client'

import { FormEvent, useState } from 'react'

import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export function SetupForm() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setPending(true)
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()

    try {
      const supabase = createSupabaseBrowserClient()
      const { error: bootstrapError } = await supabase.rpc('bootstrap_current_user', { display_name: name })
      if (bootstrapError) throw bootstrapError
      window.location.assign('/dashboard')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Không thể kết nối Supabase.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      <label className="block text-sm font-bold text-slate-700">Họ tên<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168a79]" name="name" autoComplete="name" required /></label>
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">{error}</p>}
      <button className="w-full rounded-xl bg-[#10233f] px-4 py-3 font-extrabold text-white disabled:cursor-wait disabled:opacity-60" disabled={pending} type="submit">{pending ? 'Đang kích hoạt...' : 'Kích hoạt quản trị viên'}</button>
    </form>
  )
}
