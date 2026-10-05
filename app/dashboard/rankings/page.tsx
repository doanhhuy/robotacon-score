import { getTeamRankings } from '@/lib/data/scores'
import { getCompetitions } from '@/lib/data/competitions'

export const dynamic = 'force-dynamic'

export default async function RankingsPage({ searchParams }: PageProps<'/dashboard/rankings'>) {
  const query = await searchParams
  let competitions: Awaited<ReturnType<typeof getCompetitions>> = []
  try { competitions = await getCompetitions() } catch { /* Empty state below explains unavailable data. */ }
  const selectedCompetitionId = typeof query.competitionId === 'string' ? query.competitionId : competitions[0]?.id
  let rankings: Awaited<ReturnType<typeof getTeamRankings>> = []
  let unavailable = false
  if (selectedCompetitionId) { try { rankings = await getTeamRankings(selectedCompetitionId) } catch { unavailable = true } }
  return <div><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Results</p><h1 className="mt-2 text-3xl font-black text-[#10233f]">Bảng xếp hạng</h1></div>{unavailable && <div className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">View team_rankings chưa sẵn sàng hoặc chưa có dữ liệu.</div>}<form className="mb-5 flex max-w-xl gap-3" method="get"><select className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" defaultValue={selectedCompetitionId ?? ''} name="competitionId"><option value="">Chọn cuộc thi</option>{competitions.map((competition) => <option key={competition.id} value={competition.id}>{competition.name} · {competition.season}</option>)}</select><button className="rounded-xl bg-[#10233f] px-5 py-3 text-sm font-extrabold text-white" type="submit">Xem</button></form><div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400"><tr><th className="px-6 py-4">Hạng</th><th className="px-4 py-4">Đội thi</th><th className="px-4 py-4">Hạng mục</th><th className="px-6 py-4 text-right">Điểm trung bình</th></tr></thead><tbody>{rankings.length === 0 ? <tr><td className="px-6 py-14 text-center text-slate-500" colSpan={4}>Chưa có bảng xếp hạng.</td></tr> : rankings.map((row) => <tr className="border-t border-slate-100" key={row.team_id}><td className="px-6 py-4 font-black text-[#168a79]">{row.ranking ?? '—'}</td><td className="px-4 py-4 font-bold text-[#10233f]">{row.team_name}</td><td className="px-4 py-4 text-slate-500">{row.category}</td><td className="px-6 py-4 text-right font-black text-[#10233f]">{row.average_score?.toFixed(2) ?? '—'}</td></tr>)}</tbody></table></div></div>
}
