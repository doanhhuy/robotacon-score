import Link from 'next/link'

import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f7fb] px-5 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-[#10233f] text-lg font-black text-[#8df3dd]">S</div>
          <div><p className="text-sm font-black tracking-wide text-[#10233f]">SKY-LINE</p><p className="text-xs text-slate-500">ROBOTACON SCORE</p></div>
        </div>
        <h1 className="text-2xl font-black text-[#10233f]">Đăng nhập hệ thống</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Dành cho ban tổ chức và giám khảo cuộc thi.</p>
        <LoginForm />
        <div className="mt-5 flex justify-center gap-4 text-sm font-bold"><Link className="text-[#168a79]" href="/forgot-password">Quên mật khẩu?</Link><Link className="text-[#168a79]" href="/signup">Tạo tài khoản</Link></div>
      </div>
    </main>
  )
}
