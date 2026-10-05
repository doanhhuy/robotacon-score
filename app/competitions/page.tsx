import Link from 'next/link'

import { getCompetitions } from '@/lib/data/competitions'
import type { Database } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function PublicCompetitionsPage() {
  let competitions: Database['public']['Tables']['competitions']['Row'][] = []
  try { competitions = await getCompetitions() } catch { /* Empty state handles an unapplied migration. */ }
  return <main className="min-h-screen bg-[#f4f7fb] px-5 py-8 sm:px-10"><div className="mx-auto max-w-6xl"><Link className="text-sm font-bold text-[#168a79]" href="/">← Sky-Line Robotacon</Link><h1 className="mt-5 text-3xl font-black text-[#10233f]">Các cuộc thi</h1><p className="mt-2 text-sm text-slate-500">Chọn một cuộc thi để xem thông tin và bảng xếp hạng.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{competitions.length === 0 ? <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-sm text-slate-500">Chưa có cuộc thi được công bố.</div> : competitions.map((competition) => <Link className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2dd4bf]" href={`/leaderboard/${competition.id}`} key={competition.id}><div className="flex items-start justify-between gap-4"><h2 className="text-xl font-black text-[#10233f]">{competition.name}</h2><span className="rounded-full bg-[#d6faf3] px-3 py-1 text-xs font-bold text-[#168a79]">{competition.status}</span></div><p className="mt-3 text-sm text-slate-500">Mùa giải {competition.season}</p></Link>)}</div></div></main>
}
