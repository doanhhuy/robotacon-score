import Link from 'next/link'

import { getCompetitions } from '@/lib/data/competitions'
import { getDashboardStats } from '@/lib/data/scores'
import type { Database } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let competitions: Database['public']['Tables']['competitions']['Row'][] = []
  let stats = { competitions: 0, teams: 0, judges: 0, submittedScores: 0 }
  let databaseReady = true

  try {
    ;[competitions, stats] = await Promise.all([getCompetitions(), getDashboardStats()])
  } catch {
    databaseReady = false
  }

  return (
    <div>
      <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Overview / 06 Oct 2026</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[#10233f] sm:text-4xl">Tổng quan hệ thống</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Theo dõi nhanh hoạt động cuộc thi, đội thi và tiến độ chấm điểm của Robotacon.</p></div><Link href="/dashboard/competitions/new" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#10233f] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#10233f]/15 transition hover:-translate-y-0.5 hover:bg-[#18365e]">Tạo cuộc thi <span className="text-[#8df3dd]">↗</span></Link></div>
      {!databaseReady && <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900"><strong>Database chưa sẵn sàng.</strong> Environment đã kết nối Supabase nhưng migration chưa được chạy. Hãy apply migration trong Supabase SQL Editor.</div>}
      <section className="relative mb-6 overflow-hidden rounded-[2rem] bg-[#10233f] p-6 text-white shadow-xl shadow-slate-300/25 sm:p-8"><div className="absolute -right-20 -top-24 size-72 rounded-full border-[28px] border-[#2dd4bf]/10" /><div className="absolute -bottom-28 right-28 size-52 rounded-full bg-[#2dd4bf]/10 blur-2xl" /><div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8df3dd]"><span className="size-2 rounded-full bg-[#2dd4bf]" /> Live workspace</div><h2 className="max-w-xl text-2xl font-black tracking-tight sm:text-3xl">Mọi con số quan trọng, ở đúng nơi.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">Một bảng điều khiển gọn gàng cho mùa giải Robotacon 2025–2026.</p></div><Link href="/dashboard/rankings" className="relative inline-flex w-fit items-center rounded-xl bg-[#8df3dd] px-4 py-3 text-sm font-extrabold text-[#10233f] transition hover:bg-white">Xem bảng xếp hạng <span className="ml-3">→</span></Link></div></section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Cuộc thi" value={String(stats.competitions)} icon="◈" tone="mint" /><Stat label="Đội thi" value={String(stats.teams)} icon="◆" tone="blue" /><Stat label="Giám khảo" value={String(stats.judges)} icon="✦" tone="amber" /><Stat label="Phiếu đã nộp" value={String(stats.submittedScores)} icon="✓" tone="violet" /></div>
      <section className="mt-6 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7"><div className="mb-6 flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168a79]">Activity</p><h2 className="mt-1 text-xl font-black text-[#10233f]">Cuộc thi gần đây</h2></div><Link className="rounded-lg px-2 py-1 text-sm font-bold text-[#168a79] transition hover:bg-[#effcf9]" href="/dashboard/competitions">Xem tất cả →</Link></div>{competitions.length === 0 ? <p className="rounded-2xl bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">Chưa có dữ liệu cuộc thi. Hãy tạo cuộc thi đầu tiên.</p> : <div className="grid gap-3">{competitions.map((competition) => <Link key={competition.id} href={`/dashboard/competitions/${competition.id}`} className="group flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:-translate-y-0.5 hover:border-[#8df3dd] hover:shadow-md"><span className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#effcf9] font-black text-[#168a79]">◈</span><span><strong className="block text-[#10233f]">{competition.name}</strong><span className="text-sm text-slate-500">Mùa {competition.season}</span></span></span><span className="flex items-center gap-3"><span className="rounded-full bg-[#d6faf3] px-3 py-1 text-xs font-bold capitalize text-[#168a79]">{competition.status}</span><span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#168a79]">→</span></span></Link>)}</div>}</section>
    </div>
  )
}

function Stat({ label, value, icon, tone }: { label: string; value: string; icon: string; tone: 'mint' | 'blue' | 'amber' | 'violet' }) { const tones = { mint: 'bg-[#effcf9] text-[#168a79]', blue: 'bg-blue-50 text-blue-600', amber: 'bg-amber-50 text-amber-600', violet: 'bg-violet-50 text-violet-600' }; return <article className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between"><p className="text-sm font-semibold text-slate-500">{label}</p><span className={`grid size-9 place-items-center rounded-xl text-sm font-black ${tones[tone]}`}>{icon}</span></div><p className="mt-5 text-3xl font-black tracking-tight text-[#10233f]">{value}</p><p className="mt-1 text-xs font-semibold text-slate-400">Cập nhật theo thời gian thực</p></article> }
