import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import AdminNavbar from '../components/AdminNavbar.jsx'

export default function AdminPage() {
  const { user, role } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="app-page">
      {/* NAVBAR */}
      <AdminNavbar />

      {/* CONTENU PAGE */}
      <div className="app-container">
        <div className="app-card">
          <h2 style={{ marginTop: 0 }}>Dashboard Administrateur</h2>

          <div className="app-kv">
            <div className="app-k">Utilisateur</div>
            <div className="app-v">{user?.username || '-'}</div>

            <div className="app-k">Rôle</div>
            <div className="app-v">{role || '-'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
