import Link from 'next/link'

const stats = [
  { label: 'Đội thi', value: '24', detail: '+6 so với mùa trước' },
  { label: 'Giám khảo', value: '08', detail: 'Đang hoạt động' },
  { label: 'Phiếu điểm', value: '68%', detail: 'Đã hoàn tất' },
]

const rankings = [
  { rank: '01', team: 'Robo Phoenix', school: 'THPT Lê Quý Đôn', score: '286.5', trend: '↑ 2' },
  { rank: '02', team: 'Sky Builders', school: 'THPT Nguyễn Huệ', score: '281.0', trend: '↑ 1' },
  { rank: '03', team: 'Mecha Stars', school: 'THCS Trần Đại Nghĩa', score: '274.5', trend: '—' },
  { rank: '04', team: 'Circuit Breakers', school: 'THPT Bùi Thị Xuân', score: '268.0', trend: '↓ 2' },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#10233f] font-black text-[#8df3dd] shadow-lg shadow-[#10233f]/15">S</span><span><strong className="block text-sm tracking-[0.15em] text-[#10233f]">SKY-LINE</strong><small className="text-[10px] font-semibold tracking-[0.18em] text-slate-400">ROBOTACON SCORE</small></span></Link>
        <div className="flex items-center gap-3"><Link href="/competitions" className="hidden rounded-lg px-3 py-2 text-sm font-bold text-slate-500 hover:text-[#168a79] sm:block">Các cuộc thi</Link><Link href="/login" className="rounded-xl bg-[#10233f] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-[#10233f]/15 transition hover:-translate-y-0.5 hover:bg-[#18365e]">Đăng nhập <span className="ml-1 text-[#8df3dd]">↗</span></Link></div>
      </nav>
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 sm:pt-16">
        <section className="relative overflow-hidden rounded-[2rem] bg-[#10233f] px-6 py-12 text-white shadow-2xl shadow-[#10233f]/20 sm:px-12 sm:py-16"><div className="absolute -right-16 -top-24 size-80 rounded-full border-[34px] border-[#2dd4bf]/10" /><div className="absolute -bottom-32 right-1/3 size-72 rounded-full bg-[#2dd4bf]/10 blur-3xl" /><div className="relative max-w-3xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8df3dd]/20 bg-[#8df3dd]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8df3dd]"><span className="size-2 rounded-full bg-[#2dd4bf]" /> Mùa giải 2025–2026</div><h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">Điểm số rõ ràng.<br /><span className="text-[#8df3dd]">Tinh thần vô địch.</span></h1><p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Nền tảng theo dõi cuộc thi Robotacon theo thời gian thực — từ đội thi, giám khảo đến bảng xếp hạng chung cuộc.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/competitions" className="rounded-xl bg-[#8df3dd] px-5 py-3.5 text-sm font-extrabold text-[#10233f] transition hover:bg-white">Xem các cuộc thi <span className="ml-3">→</span></Link><Link href="/login" className="rounded-xl border border-white/20 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/10">Dành cho ban tổ chức</Link></div></div></section>
        <section className="grid gap-4 py-8 sm:grid-cols-3">{stats.map((stat) => <article key={stat.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{stat.label}</p><p className="mt-3 text-3xl font-black tracking-tight text-[#10233f]">{stat.value}</p><p className="mt-2 text-xs font-bold text-[#168a79]">{stat.detail}</p></article>)}</section>
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-sm"><div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-6 sm:flex-row sm:items-center sm:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#168a79]">Live ranking</p><h2 className="mt-1 text-2xl font-black text-[#10233f]">Bảng xếp hạng hiện tại</h2></div><Link href="/competitions" className="text-sm font-bold text-[#168a79] hover:text-[#10233f]">Xem chi tiết →</Link></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400"><tr><th className="px-8 py-4">Hạng</th><th className="px-4 py-4">Đội thi</th><th className="px-4 py-4">Trường</th><th className="px-4 py-4 text-right">Tổng điểm</th><th className="px-8 py-4 text-right">Xu hướng</th></tr></thead><tbody>{rankings.map((item, index) => <tr key={item.team} className="border-t border-slate-100 transition hover:bg-[#f8fffd]"><td className="px-8 py-5 font-black text-[#168a79]">{item.rank}</td><td className="px-4 py-5 font-bold text-[#10233f]"><span className={`mr-3 inline-block size-2 rounded-full ${index === 0 ? 'bg-[#f5b83d]' : 'bg-slate-300'}`} />{item.team}</td><td className="px-4 py-5 text-slate-500">{item.school}</td><td className="px-4 py-5 text-right font-black text-[#10233f]">{item.score}</td><td className="px-8 py-5 text-right font-bold text-[#168a79]">{item.trend}</td></tr>)}</tbody></table></div></section>
        <footer className="flex flex-col justify-between gap-3 py-8 text-xs font-semibold text-slate-400 sm:flex-row"><span>© 2026 Sky-Line Robotics Club</span><span>Built for fair play &amp; better robots.</span></footer>
      </div>
    </main>
  )
}
