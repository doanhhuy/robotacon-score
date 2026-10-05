'use client'

export default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50 p-8 text-center"><h1 className="text-xl font-black text-red-900">Không thể tải dashboard</h1><p className="mt-2 text-sm leading-6 text-red-700">Có lỗi khi đọc dữ liệu. Kiểm tra migration, quyền Supabase hoặc thử lại.</p><button className="mt-5 rounded-xl bg-red-900 px-5 py-3 text-sm font-extrabold text-white" onClick={reset} type="button">Thử lại</button></div>
}
