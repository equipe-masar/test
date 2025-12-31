import { Navigate, Route, Routes } from 'react-router-dom'
import { roleHomePath, useAuth } from './auth/AuthContext.jsx'
import RequireAuth from './routes/RequireAuth.jsx'

import LoginPage from './pages/Login.jsx'
import LogoutPage from './pages/Logout.jsx'
import AdminPage from './pages/Admin.jsx'
import OperateurPage from './pages/Operateur.jsx'
import ValidateurPage from './pages/Validateur.jsx'
import GestionCorges from './pages/GestionCorges.jsx' // جديد
import GestionUtilisateurs from './pages/GestionUtilisateurs.jsx'
import ProfilePage from './pages/Profile.jsx'

function HomeRedirect() {
  const { loading, user, role } = useAuth()
  if (loading) return <div>Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={roleHomePath(role)} replace />
}

export default function App() {
  return (
    <Routes>
      {/* Accueil */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* ADMIN */}
      <Route element={<RequireAuth requiredRole="administrateur" />}>
        <Route path="/administrateur" element={<AdminPage />} />
        <Route path="/administrateur/utilisateurs" element={<GestionUtilisateurs />} />
        <Route path="/administrateur/corges" element={<GestionCorges />} /> {/* Nouveau lien */}
      </Route>

      {/* OPERATEUR */}
      <Route element={<RequireAuth requiredRole="operateur" />}>
        <Route path="/operateur" element={<OperateurPage />} />
      </Route>

      {/* VALIDATEUR */}
      <Route element={<RequireAuth requiredRole="validateur" />}>
        <Route path="/validateur" element={<ValidateurPage />} />
      </Route>

      {/* PROFILE (any authenticated user) */}
      <Route element={<RequireAuth />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}