import Link from "next/link"

const stats = [
  { label: "Đội thi", value: "24", detail: "+6 so với mùa trước" },
  { label: "Giám khảo", value: "08", detail: "Đang hoạt động" },
  { label: "Phiếu điểm", value: "68%", detail: "Đã hoàn tất" },
]

const rankings = [
  { rank: "01", team: "Robo Phoenix", school: "THPT Lê Quý Đôn", score: "286.5", trend: "↑ 2" },
  { rank: "02", team: "Sky Builders", school: "THPT Nguyễn Huệ", score: "281.0", trend: "↑ 1" },
  { rank: "03", team: "Mecha Stars", school: "THCS Trần Đại Nghĩa", score: "274.5", trend: "—" },
  { rank: "04", team: "Circuit Breakers", school: "THPT Bùi Thị Xuân", score: "268.0", trend: "↓ 2" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-[#10233f] px-5 py-7 text-white lg:block">
          <div className="mb-12 flex items-center gap-3 px-2">
            <div className="grid size-10 place-items-center rounded-xl bg-[#2dd4bf] text-lg font-black text-[#10233f]">S</div>
            <div><p className="text-sm font-black tracking-wide">SKY-LINE</p><p className="text-xs text-slate-300">ROBOTACON SCORE</p></div>
          </div>
          <nav className="space-y-2 text-sm font-semibold">
            <a className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-[#8df3dd]" href="#overview">⌂ <span>Tổng quan</span></a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/10" href="#rankings">♜ <span>Bảng xếp hạng</span></a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/10" href="#teams">◈ <span>Đội thi</span></a>
            <a className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/10" href="#scores">✎ <span>Nhập điểm</span></a>
          </nav>
          <div className="mt-56 text-xs leading-5 text-slate-400">Mùa giải 2025–2026<br />Sky-Line Robotics Club</div>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-6 sm:px-8 lg:px-10 lg:py-9">
          <header className="mb-8 flex items-start justify-between gap-4">
            <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#168a79]">Sky-Line Robotacon</p><h1 className="text-3xl font-black tracking-tight text-[#10233f] sm:text-4xl">Hệ thống điểm thi Robotics</h1><p className="mt-2 text-sm text-slate-500">Theo dõi tiến độ cuộc thi và kết quả chấm điểm theo thời gian thực.</p></div>
            <div className="hidden items-center gap-3 sm:flex"><span className="size-2 rounded-full bg-[#2dd4bf] shadow-[0_0_0_5px_#d6faf3]" /><span className="text-sm font-semibold text-slate-600">Hệ thống hoạt động</span><Link href="/login" className="grid size-10 place-items-center rounded-full bg-[#10233f] text-sm font-bold text-white">→</Link></div>
          </header>

          <section id="overview" className="mb-6 rounded-3xl bg-[#10233f] p-6 text-white shadow-xl shadow-slate-300/30 sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8df3dd]"><span className="size-2 rounded-full bg-[#2dd4bf]" /> Đang diễn ra</div><h2 className="text-2xl font-black sm:text-3xl">Robotacon Championship 2026</h2><p className="mt-2 text-sm text-slate-300">Bảng Robotics sáng tạo · 05–06 tháng 04, 2026</p></div><Link href="/competitions" className="inline-flex w-fit items-center rounded-xl bg-[#2dd4bf] px-5 py-3 text-sm font-extrabold text-[#10233f] transition hover:bg-[#8df3dd]">Xem cuộc thi <span className="ml-3">→</span></Link></div>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[68%] rounded-full bg-[#2dd4bf]" /></div><div className="mt-3 flex justify-between text-xs text-slate-300"><span>Tiến độ chấm điểm</span><span className="font-bold text-[#8df3dd]">68%</span></div>
          </section>

          <section id="teams" className="mb-6 grid gap-4 sm:grid-cols-3">{stats.map((stat) => <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{stat.label}</p><p className="mt-3 text-3xl font-black text-[#10233f]">{stat.value}</p><p className="mt-2 text-xs font-semibold text-[#168a79]">{stat.detail}</p></article>)}</section>

          <section id="rankings" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-7"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#168a79]">Live ranking</p><h2 className="mt-1 text-xl font-black text-[#10233f]">Bảng xếp hạng hiện tại</h2></div><button className="w-fit rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">Xem tất cả →</button></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400"><tr><th className="px-7 py-4">Hạng</th><th className="px-4 py-4">Đội thi</th><th className="px-4 py-4">Trường</th><th className="px-4 py-4 text-right">Tổng điểm</th><th className="px-7 py-4 text-right">Xu hướng</th></tr></thead><tbody>{rankings.map((item, index) => <tr key={item.team} className="border-t border-slate-100"><td className="px-7 py-5 font-black text-[#168a79]">{item.rank}</td><td className="px-4 py-5 font-bold text-[#10233f]"><span className={`mr-3 inline-block size-2 rounded-full ${index === 0 ? "bg-[#f5b83d]" : "bg-slate-300"}`} />{item.team}</td><td className="px-4 py-5 text-slate-500">{item.school}</td><td className="px-4 py-5 text-right font-black text-[#10233f]">{item.score}</td><td className="px-7 py-5 text-right font-bold text-[#168a79]">{item.trend}</td></tr>)}</tbody></table></div>
          </section>

          <div id="scores" className="mt-6 flex flex-wrap justify-center gap-4 text-center text-xs font-bold text-slate-400"><Link href="/competitions" className="hover:text-[#168a79]">Xem cuộc thi</Link><Link href="/login" className="hover:text-[#168a79]">Đăng nhập quản trị</Link><Link href="/signup" className="hover:text-[#168a79]">Tạo tài khoản</Link></div>
        </section>
      </div>
    </main>
  )
}
