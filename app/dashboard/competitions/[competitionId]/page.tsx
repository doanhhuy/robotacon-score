import Link from 'next/link'

import { getCompetitionById } from '@/lib/data/competitions'
import { getTeamRankings } from '@/lib/data/scores'
import { getTeamsByCompetition } from '@/lib/data/teams'

export const dynamic = 'force-dynamic'

export default async function CompetitionDetailsPage({ params }: PageProps<'/dashboard/competitions/[competitionId]'>) {
  const { competitionId } = await params
  const [competition, teams, rankings] = await Promise.all([
    getCompetitionById(competitionId).catch(() => null),
    getTeamsByCompetition(competitionId).catch(() => []),
    getTeamRankings(competitionId).catch(() => []),
  ])

  if (!competition) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><h1 className="text-xl font-black text-[#10233f]">Không tìm thấy cuộc thi</h1><Link className="mt-4 inline-block text-sm font-bold text-[#168a79]" href="/dashboard/competitions">← Quay lại danh sách</Link></div>
  }

  return <div><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><Link className="text-sm font-bold text-[#168a79]" href="/dashboard/competitions">← Tất cả cuộc thi</Link><h1 className="mt-3 text-3xl font-black text-[#10233f]">{competition.name}</h1><p className="mt-2 text-sm text-slate-500">Mùa {competition.season} · {competition.status}</p></div><Link className="w-fit rounded-xl bg-[#10233f] px-4 py-3 text-sm font-extrabold text-white" href={`/leaderboard/${competition.id}`}>Mở leaderboard public</Link></div><div className="grid gap-6 lg:grid-cols-2"><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black text-[#10233f]">Đội thi</h2><Link className="text-sm font-bold text-[#168a79]" href="/dashboard/teams">Quản lý →</Link></div>{teams.length === 0 ? <p className="text-sm text-slate-500">Chưa có đội thi hoặc database chưa được migrate.</p> : <div className="space-y-3">{teams.map((team) => <div className="rounded-2xl bg-slate-50 p-4" key={team.id}><p className="font-bold text-[#10233f]">{team.team_name}</p><p className="mt-1 text-sm text-slate-500">{team.school_name} · {team.category}</p></div>)}</div>}</section><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black text-[#10233f]">Xếp hạng</h2><Link className="text-sm font-bold text-[#168a79]" href="/dashboard/rankings">Chi tiết →</Link></div>{rankings.length === 0 ? <p className="text-sm text-slate-500">Chưa có điểm đã nộp.</p> : <div className="space-y-3">{rankings.slice(0, 5).map((row) => <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4" key={row.team_id}><div><span className="mr-3 font-black text-[#168a79]">#{row.ranking}</span><span className="font-bold text-[#10233f]">{row.team_name}</span></div><span className="font-black text-[#10233f]">{row.average_score?.toFixed(2) ?? '—'}</span></div>)}</div>}</section></div></div>
}
