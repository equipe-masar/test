import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { roleHomePath, useAuth } from '../auth/AuthContext.jsx'

export default function RequireAuth({ requiredRole }) {
  const { loading, user, role } = useAuth()
  const location = useLocation()

  if (loading) return <div>Loading…</div>

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={roleHomePath(role)} replace />
  }

  return <Outlet />
}
