import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function OperateurPage() {
  const { user, role } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="app-page">
      <div className="app-nav">
        <div className="app-navLeft">
          <div className="app-navTitle">GRH</div>
          <div className="app-navTag">OPERATEUR</div>
        </div>
        <div className="app-navActions">
          <Link
            to="/profile"
            className="app-circleBtn"
            title="Profile"
            aria-label="Profile"
          >
            {(user?.username || 'P')[0].toUpperCase()}
          </Link>
          <button onClick={() => navigate('/logout')}>Logout</button>
        </div>
      </div>

      <div className="app-container">
        <div className="app-card">
          <h2 style={{ marginTop: 0 }}>Dashboard Opérateur</h2>
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
