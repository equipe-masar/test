import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function AdminNavbar() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const initial = (user?.username || 'A')[0].toUpperCase()

  return (
    <div className="app-nav">
      <div className="app-navLeft">
        <div className="app-navTitle">GRH</div>
        <div className="app-navTag">ADMIN</div>

        <nav className="app-navLinks">
          <Link to="/administrateur">Dashboard</Link>
          <Link to="/administrateur/utilisateurs">Gestion Utilisateurs</Link>
          <Link to="/administrateur/corges">Gestion Corges</Link>
        </nav>
      </div>

      <div className="app-navActions">
        <Link
          to="/profile"
          className="app-circleBtn"
          title="Profile"
          aria-label="Profile"
        >
          {initial}
        </Link>
        <button onClick={() => navigate('/logout')}>Logout</button>
      </div>
    </div>
  )
}
