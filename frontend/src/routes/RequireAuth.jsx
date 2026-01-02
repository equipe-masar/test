import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { roleHomePath, useAuth } from '../auth/AuthContext.jsx'

export default function RequireAuth({ requiredRole }) {
  const { loading, user, role, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user && requiredRole && role && role !== requiredRole) {
      ;(async () => {
        try {
          await logout()
        } finally {
          navigate('/login', {
            replace: true,
            state: { message: "Vous n'avez pas accès à cette section." },
          })
        }
      })()
    }
  }, [loading, user, role, requiredRole, logout, navigate])

  if (loading) return <div>Loading…</div>

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && role !== requiredRole) {
    return null
  }

  return <Outlet />
}
