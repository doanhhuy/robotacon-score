import { getJudges } from '@/lib/data/judges'
import type { Database } from '@/types/database'
import { createJudge } from '@/app/actions/judges'

export const dynamic = 'force-dynamic'

export default async function JudgesPage() {
  let judges: Database['public']['Tables']['judges']['Row'][] = []
  let unavailable = false
  try { judges = await getJudges() } catch { unavailable = true }
  return <div><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Management</p><h1 className="mt-2 text-3xl font-black text-[#10233f]">Giám khảo</h1></div>{unavailable && <div className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">Bảng judges chưa sẵn sàng. Hãy apply migration Supabase.</div>}<div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-black text-[#10233f]">Thêm giám khảo</h2><form action={createJudge} className="mt-4 grid gap-4 sm:grid-cols-4"><input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="name" placeholder="Họ tên" required /><input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Email" type="email" required /><select className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="role" defaultValue="judge"><option value="judge">Giám khảo</option><option value="organizer">Ban tổ chức</option></select><button className="rounded-xl bg-[#10233f] px-4 py-3 text-sm font-extrabold text-white" type="submit">Thêm</button></form></div><div className="grid gap-4 md:grid-cols-2">{judges.length === 0 ? <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center text-sm text-slate-500">Chưa có giám khảo.</div> : judges.map((judge) => <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={judge.id}><div className="flex items-center justify-between"><h2 className="font-black text-[#10233f]">{judge.name}</h2><span className="rounded-full bg-[#d6faf3] px-3 py-1 text-xs font-bold text-[#168a79]">{judge.role}</span></div><p className="mt-2 text-sm text-slate-500">{judge.email}</p></article>)}</div></div>
}
