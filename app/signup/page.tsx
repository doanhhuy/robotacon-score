import Link from 'next/link'

import { SignupForm } from './signup-form'

export default function SignupPage() {
  return <main className="grid min-h-screen place-items-center bg-[#f4f7fb] px-5 py-10"><div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">New account</p><h1 className="mt-3 text-2xl font-black text-[#10233f]">Tạo tài khoản</h1><p className="mt-2 text-sm leading-6 text-slate-500">Tài khoản đầu tiên có thể được bootstrap thành quản trị viên sau khi đăng nhập.</p><SignupForm /><Link className="mt-5 block text-center text-sm font-bold text-[#168a79]" href="/login">Đã có tài khoản? Đăng nhập</Link></div></main>
}
