import Link from 'next/link'

import { signOut } from '@/app/actions/auth'

export default function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 flex-col bg-[#10233f] px-5 py-7 text-white lg:flex">
        <Link href="/dashboard" className="flex items-center gap-3 px-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#8df3dd] text-lg font-black text-[#10233f] shadow-lg shadow-[#8df3dd]/10">S</span>
          <span><strong className="block text-sm tracking-[0.16em]">SKY-LINE</strong><small className="text-[10px] font-semibold tracking-[0.2em] text-slate-300">ROBOTACON SCORE</small></span>
        </Link>
        <div className="mt-12 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Workspace</div>
        <nav className="mt-3 space-y-1.5 text-sm font-semibold">
          <NavLink href="/dashboard" icon="⌂">Tổng quan</NavLink>
          <NavLink href="/dashboard/competitions" icon="◈">Cuộc thi</NavLink>
          <NavLink href="/dashboard/teams" icon="◆">Đội thi</NavLink>
          <NavLink href="/dashboard/judges" icon="✦">Giám khảo</NavLink>
          <NavLink href="/dashboard/scoring" icon="✎">Nhập điểm</NavLink>
          <NavLink href="/dashboard/rankings" icon="♜">Xếp hạng</NavLink>
        </nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-5 text-slate-300">
          <p className="font-bold text-[#8df3dd]">Mùa giải 2025–2026</p>
          <p className="mt-1">Sky-Line Robotics Club</p>
        </div>
      </aside>
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/85 px-5 py-4 backdrop-blur-xl sm:px-8 lg:ml-72">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-3 lg:hidden"><span className="grid size-9 place-items-center rounded-xl bg-[#10233f] font-black text-[#8df3dd]">S</span><span className="text-sm font-black tracking-wide text-[#10233f]">ROBOTACON SCORE</span></Link>
          <div className="hidden text-sm text-slate-500 lg:block"><span className="font-semibold text-[#10233f]">Admin workspace</span><span className="mx-2 text-slate-300">/</span>Quản lý cuộc thi</div>
          <div className="ml-auto flex items-center gap-3"><span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 sm:flex"><i className="size-2 rounded-full bg-emerald-500" /> Hệ thống hoạt động</span><form action={signOut}><button className="rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50" type="submit">Đăng xuất</button></form></div>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-10 lg:ml-72 lg:px-10">{children}</main>
    </div>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
  return <Link href={href} className="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-slate-300 transition hover:bg-white/10 hover:text-white"><span className="grid size-7 place-items-center rounded-lg bg-white/5 text-sm text-[#8df3dd] transition group-hover:bg-[#8df3dd]/15">{icon}</span>{children}</Link>
}
