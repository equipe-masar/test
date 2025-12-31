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

        <nav
          className="app-navLinks"
          style={{
            display: 'flex',
            gap: '10px',
            padding: '10px',
            background: '#f4f4f4',
          }}
        >
          <Link to="/administrateur">
            <button
              className="auth-primaryBtn"
              style={{ width: 'auto', padding: '8px 16px', backgroundColor: '#34495e', color: 'white' }}
            >
              Dashboard
            </button>
          </Link>
          <Link to="/administrateur/utilisateurs">
            <button
              className="auth-primaryBtn"
              style={{ width: 'auto', padding: '8px 16px', backgroundColor: '#34495e', color: 'white' }}
            >
              Gestion Utilisateurs
            </button>
          </Link>
          <Link to="/administrateur/corges">
            <button
              className="auth-primaryBtn"
              style={{ width: 'auto', padding: '8px 16px', backgroundColor: '#34495e', color: 'white' }}
            >
              Gestion Corges
            </button>
          </Link>
        </nav>
      </div>

      <div className="app-navActions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#333',
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: '#f0f0f0',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e0e0e0';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={`Profil - ${user?.username || 'User'}`}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#0066cc',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {initial}
          </div>
          <span style={{ fontWeight: '500', fontSize: '14px' }}>
            {user?.username || 'User'}
          </span>
        </Link>

        <button
          onClick={() => navigate('/logout')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#ff4444',
            color: 'white',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#cc0000';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ff4444';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span style={{ fontSize: '16px' }}>🚪</span>
          Logout
        </button>
      </div>
    </div>
  )
}
