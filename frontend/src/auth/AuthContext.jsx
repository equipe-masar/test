import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

async function apiJson(path, { method = 'GET', body, signal } = {}) {
  const res = await fetch(path, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data?.message || 'Request failed'
    const error = new Error(message)
    error.status = res.status
    error.data = data
    throw error
  }
  return data
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        const me = await apiJson('/api/user/me', { signal: controller.signal })
        setUser(me.user)
        setRole(me.role || null)
      } catch {
        setUser(null)
        setRole(null)
      } finally {
        setLoading(false)
      }
    })()
    return () => controller.abort()
  }, [])

  const value = useMemo(() => {
    return {
      loading,
      user,
      role,
      login: async (username, password) => {
        const result = await apiJson('/api/user/login', {
          method: 'POST',
          body: { username, password },
        })
        setUser(result.user)
        setRole(result.role || null)
        return result
      },
      logout: async () => {
        try {
          await apiJson('/api/user/logout', { method: 'POST' })
        } finally {
          setUser(null)
          setRole(null)
        }
      },
      refresh: async () => {
        const me = await apiJson('/api/user/me')
        setUser(me.user)
        setRole(me.role || null)
        return me
      },
    }
  }, [loading, user, role])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export function roleHomePath(role) {
  switch (role) {
    case 'administrateur':
      return '/administrateur'
    case 'operateur':
      return '/operateur'
    case 'validateur':
      return '/validateur'
    default:
      return '/login'
  }
}
