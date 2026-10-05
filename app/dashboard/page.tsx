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
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Administration</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[#10233f]">Tổng quan hệ thống</h1><p className="mt-2 text-sm text-slate-500">Quản lý cuộc thi, đội thi và điểm số Robotacon.</p></div><Link href="/dashboard/competitions/new" className="w-fit rounded-xl bg-[#10233f] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#18365e]">+ Tạo cuộc thi</Link></div>
      {!databaseReady && <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900"><strong>Database chưa sẵn sàng.</strong> Environment đã kết nối được Supabase nhưng migration chưa được chạy. Hãy apply file <code>supabase/migrations/20261005000100_robotacon_initial.sql</code> trong Supabase SQL Editor.</div>}
      <div className="grid gap-4 sm:grid-cols-4"><Stat label="Cuộc thi" value={String(stats.competitions)} /><Stat label="Đội thi" value={String(stats.teams)} /><Stat label="Giám khảo" value={String(stats.judges)} /><Stat label="Phiếu đã nộp" value={String(stats.submittedScores)} /></div>
      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black text-[#10233f]">Cuộc thi gần đây</h2><Link className="text-sm font-bold text-[#168a79]" href="/dashboard/competitions">Xem tất cả →</Link></div>{competitions.length === 0 ? <p className="rounded-2xl bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">Chưa có dữ liệu cuộc thi. Tạo cuộc thi đầu tiên sau khi database được khởi tạo.</p> : <div className="grid gap-3">{competitions.map((competition) => <Link key={competition.id} href={`/dashboard/competitions/${competition.id}`} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 hover:border-[#8df3dd]"><span><strong className="block text-[#10233f]">{competition.name}</strong><span className="text-sm text-slate-500">Mùa {competition.season}</span></span><span className="rounded-full bg-[#d6faf3] px-3 py-1 text-xs font-bold text-[#168a79]">{competition.status}</span></Link>)}</div>}</section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) { return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-3 text-3xl font-black text-[#10233f]">{value}</p></article> }
