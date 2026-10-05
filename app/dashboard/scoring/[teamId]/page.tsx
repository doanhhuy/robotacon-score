import { saveScore } from '@/app/actions/scores'
import { getJudges } from '@/lib/data/judges'
import { getScoresByTeam } from '@/lib/data/scores'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function TeamScoringPage({ params }: PageProps<'/dashboard/scoring/[teamId]'>) {
  const { teamId } = await params
  const supabase = await createSupabaseServerClient()
  const [{ data: team }, judges, scores] = await Promise.all([
    supabase.from('teams').select('*').eq('id', teamId).maybeSingle(),
    getJudges().catch(() => []),
    getScoresByTeam(teamId).catch(() => []),
  ])
  const score = scores[0]
  return <div className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Scoring sheet</p><h1 className="mt-2 text-3xl font-black text-[#10233f]">{team?.team_name ?? 'Đội thi'}</h1><p className="mt-2 text-sm text-slate-500">{team?.school_name ?? 'Không tìm thấy đội'} · {team?.category ?? '—'}</p><form action={saveScore} className="mt-7 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><input name="team_id" type="hidden" value={teamId} /><label className="block text-sm font-bold text-slate-700">Giám khảo<select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" name="judge_id" required><option value="">Chọn giám khảo</option>{judges.map((judge) => <option key={judge.id} value={judge.id}>{judge.name} · {judge.email}</option>)}</select></label><div className="grid gap-5 sm:grid-cols-2"><ScoreField label="Kỹ thuật" name="score_technical" defaultValue={score?.score_technical} /><ScoreField label="Sáng tạo" name="score_creativity" defaultValue={score?.score_creativity} /><ScoreField label="Trình diễn" name="score_performance" defaultValue={score?.score_performance} /><ScoreField label="Điểm phạt" name="score_penalty" defaultValue={score?.score_penalty} /></div><p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Tổng điểm được PostgreSQL tự động tính: kỹ thuật + sáng tạo + trình diễn − điểm phạt.</p><button className="rounded-xl bg-[#10233f] px-5 py-3 font-extrabold text-white" type="submit">Lưu bản nháp</button><button className="ml-3 rounded-xl border border-[#10233f] px-5 py-3 font-extrabold text-[#10233f]" name="submit" value="true" type="submit">Lưu và nộp điểm</button></form></div>
}

function ScoreField({ label, name, defaultValue }: { label: string; name: string; defaultValue?: number }) { return <label className="block text-sm font-bold text-slate-700">{label}<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168a79]" name={name} type="number" min="0" max="100" step="0.01" defaultValue={defaultValue ?? 0} required /></label> }
