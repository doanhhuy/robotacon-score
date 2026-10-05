import Link from 'next/link'

import { SetupForm } from './setup-form'

export default function SetupPage() {
  return <main className="grid min-h-screen place-items-center bg-[#f4f7fb] px-5 py-10"><div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">First-time setup</p><h1 className="mt-3 text-2xl font-black text-[#10233f]">Thiết lập quản trị viên</h1><p className="mt-3 text-sm leading-6 text-slate-500">Chỉ tài khoản đầu tiên khi bảng <code>judges</code> chưa có dữ liệu mới có thể dùng bước này. Tài khoản sẽ được gán role <strong>admin</strong>.</p><SetupForm /><Link className="mt-5 block text-center text-sm font-bold text-[#168a79]" href="/dashboard">Quay lại dashboard</Link></div></main>
}
