import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function requireAuthenticatedUser() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    throw new Error('Bạn cần đăng nhập để thực hiện thao tác này.')
  }

  return { supabase, user: data.user }
}

export async function requireStaffUser() {
  const { supabase, user } = await requireAuthenticatedUser()
  const { data: judge, error } = await supabase
    .from('judges')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!judge || !['admin', 'organizer'].includes(judge.role)) {
    throw new Error('Tài khoản của bạn không có quyền quản lý hệ thống.')
  }

  return { supabase, user, role: judge.role }
}
