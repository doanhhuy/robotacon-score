import Link from 'next/link'

import { requestPasswordReset } from '@/app/actions/auth'

export default function ForgotPasswordPage() {
  return <main className="grid min-h-screen place-items-center bg-[#f4f7fb] px-5 py-10"><div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Account recovery</p><h1 className="mt-3 text-2xl font-black text-[#10233f]">Đặt lại mật khẩu</h1><p className="mt-2 text-sm leading-6 text-slate-500">Nhập email tài khoản. Supabase sẽ gửi liên kết khôi phục mật khẩu.</p><form action={requestPasswordReset} className="mt-7 space-y-5"><label className="block text-sm font-bold text-slate-700">Email<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168a79]" name="email" type="email" required /></label><button className="w-full rounded-xl bg-[#10233f] px-4 py-3 font-extrabold text-white" type="submit">Gửi liên kết khôi phục</button></form><Link className="mt-5 block text-center text-sm font-bold text-[#168a79]" href="/login">← Quay lại đăng nhập</Link></div></main>
}
