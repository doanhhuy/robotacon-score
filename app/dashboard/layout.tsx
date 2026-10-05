import Link from 'next/link'

import { signOut } from '@/app/actions/auth'

export default function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-[#10233f] font-black text-[#8df3dd]">S</span><span className="hidden text-sm font-black tracking-wide text-[#10233f] sm:block">ROBOTACON SCORE</span></Link>
          <nav className="flex items-center gap-2 text-sm font-bold text-slate-600 sm:gap-5"><Link className="hover:text-[#168a79]" href="/dashboard">Tổng quan</Link><Link className="hidden hover:text-[#168a79] sm:block" href="/dashboard/competitions">Cuộc thi</Link><Link className="hidden hover:text-[#168a79] sm:block" href="/dashboard/teams">Đội thi</Link><Link className="hidden hover:text-[#168a79] sm:block" href="/dashboard/judges">Giám khảo</Link><Link className="hover:text-[#168a79]" href="/dashboard/scoring">Nhập điểm</Link><Link className="hidden hover:text-[#168a79] sm:block" href="/dashboard/rankings">Xếp hạng</Link><form action={signOut}><button className="rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50" type="submit">Đăng xuất</button></form></nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10">{children}</main>
    </div>
  )
}
