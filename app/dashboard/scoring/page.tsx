import Link from 'next/link'

import { getTeams } from '@/lib/data/teams'
import type { Database } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function ScoringPage() {
  let teams: Database['public']['Tables']['teams']['Row'][] = []
  let unavailable = false
  try { teams = await getTeams() } catch { unavailable = true }
  return <div><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Scoring</p><h1 className="mt-2 text-3xl font-black text-[#10233f]">Nhập điểm</h1><p className="mt-2 text-sm text-slate-500">Chọn đội thi để nhập hoặc cập nhật phiếu điểm.</p></div>{unavailable && <div className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">Bảng teams chưa sẵn sàng. Hãy apply migration Supabase.</div>}<div className="grid gap-4 md:grid-cols-2">{teams.length === 0 ? <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center text-sm text-slate-500">Chưa có đội thi để chấm.</div> : teams.map((team) => <Link className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#2dd4bf]" href={`/dashboard/scoring/${team.id}`} key={team.id}><h2 className="font-black text-[#10233f]">{team.team_name}</h2><p className="mt-2 text-sm text-slate-500">{team.school_name} · {team.category}</p></Link>)}</div></div>
}
