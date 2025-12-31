import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function AdminPage() {
  const { user, role } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="app-page">
      {/* NAVBAR */}
      <div className="app-nav">
        <div className="app-navLeft">
          <div className="app-navTitle">GRH</div>
          <div className="app-navTag">ADMIN</div>

          {/* Liens Navbar */}
          <nav className="app-navLinks">
            <Link to="/administrateur/utilisateurs">Gestion Utilisateurs     </Link>
            <Link to="/administrateur/corges">Gestion Corges</Link>
            <Link to="/administrateur/corges">Gestion Corges</Link> {/* Nouveau lien */}
          </nav>
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
