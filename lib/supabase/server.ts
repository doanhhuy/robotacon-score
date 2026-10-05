import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env'
import type { Database } from '@/types/database'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server Components cannot always write cookies. The proxy refreshes the session.
        }
      },
    },
  })
}
