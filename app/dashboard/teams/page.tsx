import Link from 'next/link'

import { getTeams } from '@/lib/data/teams'
import type { Database } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function TeamsPage({ searchParams }: PageProps<'/dashboard/teams'>) {
  const query = await searchParams
  const search = typeof query.search === 'string' ? query.search : ''
  let teams: Database['public']['Tables']['teams']['Row'][] = []
  let unavailable = false
  try { teams = await getTeams(search) } catch { unavailable = true }
  return <div><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Management</p><h1 className="mt-2 text-3xl font-black text-[#10233f]">Đội thi</h1></div><Link href="/dashboard/teams/new" className="rounded-xl bg-[#10233f] px-4 py-3 text-sm font-extrabold text-white">+ Thêm đội</Link></div>{unavailable && <div className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">Bảng teams chưa sẵn sàng. Hãy apply migration Supabase.</div>}<form className="mb-5 flex gap-3" method="get"><input className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#168a79]" defaultValue={search} name="search" placeholder="Tìm theo tên đội, trường hoặc hạng mục" /><button className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600" type="submit">Tìm kiếm</button></form><div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400"><tr><th className="px-6 py-4">Đội thi</th><th className="px-4 py-4">Trường</th><th className="px-4 py-4">Hạng mục</th><th className="px-6 py-4">Bàn</th></tr></thead><tbody>{teams.length === 0 ? <tr><td className="px-6 py-12 text-center text-slate-500" colSpan={4}>Chưa có đội thi.</td></tr> : teams.map((team) => <tr className="border-t border-slate-100" key={team.id}><td className="px-6 py-4 font-bold text-[#10233f]">{team.team_name}</td><td className="px-4 py-4 text-slate-500">{team.school_name}</td><td className="px-4 py-4 text-slate-500">{team.category}</td><td className="px-6 py-4 text-slate-500">{team.table_name ?? '—'}</td></tr>)}</tbody></table></div></div></div>
}
