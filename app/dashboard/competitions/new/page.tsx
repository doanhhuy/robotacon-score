'use client'

import { useActionState } from 'react'

import { createCompetition, type CreateCompetitionState } from '@/app/actions/competitions'

const initialState: CreateCompetitionState = {}

export default function NewCompetitionPage() {
  const [state, formAction, pending] = useActionState(createCompetition, initialState)

  return <div className="mx-auto max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#168a79]">Management</p><h1 className="mt-2 text-3xl font-black text-[#10233f]">Tạo cuộc thi</h1><form action={formAction} className="mt-7 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><Field label="Tên cuộc thi" name="name" required /><Field label="Mùa giải" name="season" placeholder="2026" required /><div className="grid gap-5 sm:grid-cols-2"><Field label="Ngày bắt đầu" name="start_date" type="date" /><Field label="Ngày kết thúc" name="end_date" type="date" /></div><label className="block text-sm font-bold text-slate-700">Trạng thái<select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" name="status" defaultValue="draft"><option value="draft">Bản nháp</option><option value="published">Công bố</option><option value="active">Đang diễn ra</option></select></label>{state.error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">{state.error}</p>}<button className="rounded-xl bg-[#10233f] px-5 py-3 font-extrabold text-white disabled:cursor-wait disabled:opacity-60" disabled={pending} type="submit">{pending ? 'Đang lưu...' : 'Lưu cuộc thi'}</button></form></div>
}

function Field({ label, name, type = 'text', placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) { return <label className="block text-sm font-bold text-slate-700">{label}<input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#168a79]" name={name} type={type} placeholder={placeholder} required={required} /></label> }
