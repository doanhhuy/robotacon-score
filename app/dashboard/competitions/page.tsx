import Link from 'next/link'

import { getCompetitions } from '@/lib/data/competitions'
import type { Database } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function CompetitionsPage() {
  let competitions: Database['public']['Tables']['competitions']['Row'][] = []
  let unavailable = false
  try { competitions = await getCompetitions() } catch { unavailable = true }

  return <div><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Management</p><h1 className="mt-2 text-3xl font-black text-[#10233f]">Cuộc thi</h1></div><Link href="/dashboard/competitions/new" className="rounded-xl bg-[#10233f] px-4 py-3 text-sm font-extrabold text-white">+ Tạo mới</Link></div>{unavailable && <div className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">Chưa thể đọc bảng competitions. Hãy apply migration Supabase trước.</div>}<div className="grid gap-4 md:grid-cols-2">{competitions.length === 0 ? <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center text-sm text-slate-500">Chưa có cuộc thi.</div> : competitions.map((competition) => <Link href={`/dashboard/competitions/${competition.id}`} key={competition.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#2dd4bf]"><div className="flex justify-between gap-3"><h2 className="font-black text-[#10233f]">{competition.name}</h2><span className="text-xs font-bold text-[#168a79]">{competition.status}</span></div><p className="mt-2 text-sm text-slate-500">Mùa {competition.season}</p></Link>)}</div></div>
}
