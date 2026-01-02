import { useAuth } from '../auth/AuthContext.jsx'
import RecruteNavbar from '../components/RecruteNavbar.jsx'

export default function RecrutePage() {
  const { user, role } = useAuth()

  return (
    <div className="app-page">
      <RecruteNavbar />

      <div className="app-container">
        <div className="app-card">
          <h2 style={{ marginTop: 0 }}>Dashboard Recrute</h2>
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
