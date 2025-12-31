import { Navigate, Route, Routes } from 'react-router-dom'
import { roleHomePath, useAuth } from './auth/AuthContext.jsx'
import RequireAuth from './routes/RequireAuth.jsx'
import LoginPage from './pages/Login.jsx'
import LogoutPage from './pages/Logout.jsx'
import AdminPage from './pages/Admin.jsx'
import OperateurPage from './pages/Operateur.jsx'
import ValidateurPage from './pages/Validateur.jsx'

function HomeRedirect() {
  const { loading, user, role } = useAuth()
  if (loading) return <div>Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={roleHomePath(role)} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      <Route element={<RequireAuth requiredRole="administrateur" />}>
        <Route path="/administrateur" element={<AdminPage />} />
      </Route>

      <Route element={<RequireAuth requiredRole="operateur" />}>
        <Route path="/operateur" element={<OperateurPage />} />
      </Route>

      <Route element={<RequireAuth requiredRole="validateur" />}>
        <Route path="/validateur" element={<ValidateurPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
