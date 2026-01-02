import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function ValidateurPage() {
  const { user, role } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="app-page">
      <div className="app-nav">
        <div className="app-navLeft">
          <div className="app-navTitle">GRH</div>
          <div className="app-navTag">VALIDATEUR</div>
        </div>
        <div className="app-navActions">
          <Link
            to="/profile"
            title="Profile"
            aria-label="Profile"
            className="app-navProfileLink"
          >
            <div className="app-navAvatar">{(user?.username || 'P')[0].toUpperCase()}</div>
          </Link>
          <button type="button" className="app-navActionBtn" onClick={() => navigate('/logout')}>
            <span aria-hidden="true">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="app-container">
        <div className="app-card">
          <h2 style={{ marginTop: 0 }}>Dashboard Validateur</h2>
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
