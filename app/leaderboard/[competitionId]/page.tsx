import { getTeamRankings } from '@/lib/data/scores'

export const dynamic = 'force-dynamic'

export default async function PublicLeaderboardPage({ params }: PageProps<'/leaderboard/[competitionId]'>) {
  const { competitionId } = await params
  let rankings: Awaited<ReturnType<typeof getTeamRankings>> = []
  try { rankings = await getTeamRankings(competitionId) } catch { /* Empty state handles missing migration. */ }
  return <main className="min-h-screen bg-[#10233f] px-5 py-8 text-white sm:px-10"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8df3dd]">Sky-Line Robotacon</p><h1 className="mt-3 text-3xl font-black sm:text-5xl">Bảng xếp hạng</h1><p className="mt-3 text-slate-300">Kết quả cập nhật theo các phiếu điểm đã nộp.</p><div className="mt-8 overflow-hidden rounded-3xl bg-white text-slate-950"><table className="w-full text-left"><thead className="bg-[#eafaf7] text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-6 py-4">Hạng</th><th className="px-4 py-4">Đội thi</th><th className="px-4 py-4">Trường</th><th className="px-6 py-4 text-right">Điểm</th></tr></thead><tbody>{rankings.length === 0 ? <tr><td className="px-6 py-16 text-center text-slate-500" colSpan={4}>Chưa có kết quả được công bố.</td></tr> : rankings.map((row) => <tr className="border-t border-slate-100" key={row.team_id}><td className="px-6 py-5 font-black text-[#168a79]">{row.ranking}</td><td className="px-4 py-5 font-bold">{row.team_name}</td><td className="px-4 py-5 text-slate-500">{row.school_name}</td><td className="px-6 py-5 text-right font-black">{row.average_score?.toFixed(2) ?? '—'}</td></tr>)}</tbody></table></div></div></main>
}
