import { createTeam } from '@/app/actions/teams'
import { getCompetitions } from '@/lib/data/competitions'

export const dynamic = 'force-dynamic'

export default async function NewTeamPage() {
  let competitions = [] as Awaited<ReturnType<typeof getCompetitions>>
  try { competitions = await getCompetitions() } catch { /* The form explains setup status below. */ }
  return <div className="mx-auto max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Management</p><h1 className="mt-2 text-3xl font-black text-[#10233f]">Thêm đội thi</h1>{competitions.length === 0 && <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">Cần có ít nhất một cuộc thi trước khi tạo đội.</p>}<form action={createTeam} className="mt-6 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><label className="block text-sm font-bold text-slate-700">Cuộc thi<select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" name="competition_id" required><option value="">Chọn cuộc thi</option>{competitions.map((competition) => <option key={competition.id} value={competition.id}>{competition.name}</option>)}</select></label><Field label="Tên đội" name="team_name" /><Field label="Tên trường" name="school_name" /><div className="grid gap-5 sm:grid-cols-2"><Field label="Hạng mục" name="category" /><Field label="Tên bàn" name="table_name" /></div><button className="rounded-xl bg-[#10233f] px-5 py-3 font-extrabold text-white disabled:opacity-50" disabled={!competitions.length} type="submit">Lưu đội thi</button></form></div>
}

function Field({ label, name }: { label: string; name: string }) { return <label className="block text-sm font-bold text-slate-700">{label}<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168a79]" name={name} required /></label> }
