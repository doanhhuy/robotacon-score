import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env'

export async function updateSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  const hasAuthCookie = request.cookies.getAll().some(({ name }) => name.includes('-auth-token'))

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  try {
    const userRequest = supabase.auth.getUser()
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Supabase session check timed out')), 8000)
    })
    const { data: { user } } = await Promise.race([userRequest, timeout])
    return { response, user, hasAuthCookie, sessionCheckFailed: false }
  } catch {
    // Keep the browser session usable during a temporary Supabase network error.
    // Database RLS still validates every server-side read/write independently.
    return { response, user: null, hasAuthCookie, sessionCheckFailed: true }
  }
}
