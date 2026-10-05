import { NextResponse, type NextRequest } from 'next/server'

import { updateSupabaseSession } from '@/lib/supabase/proxy'

export async function proxy(request: NextRequest) {
  const { response, user, hasAuthCookie, sessionCheckFailed } = await updateSupabaseSession(request)
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname === '/setup'

  if (isDashboardRoute && !user && !(sessionCheckFailed && hasAuthCookie)) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/setup', '/auth/callback'],
}
