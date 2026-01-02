import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function AdminNavbar() {
  const { user } = useAuth()
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem('theme') || 'dark'
  })
  const [othersOpen, setOthersOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])
  const navigate = useNavigate()

  const initial = (user?.username || 'A')[0].toUpperCase()

  return (
    <div className="app-nav">
      <div className="app-navLeft">
        <div className="app-navTitle">GRH</div>
        <div className="app-navTag">ADMIN</div>

        <nav className="app-navLinks">
          <Link className="app-navLink" to="/administrateur">
            Dashboard
          </Link>
          <Link className="app-navLink" to="/administrateur/utilisateurs">
            Gestion Utilisateurs
          </Link>

          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="app-navLinkBtn"
              aria-haspopup="menu"
              aria-expanded={othersOpen}
              onClick={() => setOthersOpen((v) => !v)}
            >
              Autres
            </button>

            {othersOpen && (
              <div
                role="menu"
                className="app-navDropdown"
              >
                <Link className="app-navDropdownLink" to="/administrateur/corges" onClick={() => setOthersOpen(false)}>
                  Gestion Corges
                </Link>

                <Link
                  to="/administrateur/recrutement"
                  className="app-navDropdownLink"
                  onClick={() => setOthersOpen(false)}
                >
                  Gestion Recrutement
                </Link>

                <Link
                  to="/administrateur/origine-recrutement"
                  className="app-navDropdownLink"
                  onClick={() => setOthersOpen(false)}
                >
                  Origine Recrutement
                </Link>

                <Link
                  to="/administrateur/niveau-scolaire"
                  className="app-navDropdownLink"
                  onClick={() => setOthersOpen(false)}
                >
                  Niveau Scolaire
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="app-navActions">
        <button
          type="button"
          className="app-navActionBtn"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <Link className="app-navProfileLink" to="/profile" title={`Profil - ${user?.username || 'User'}`}>
          <div className="app-navAvatar">{initial}</div>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{user?.username || 'User'}</span>
        </Link>

        <button type="button" className="app-navActionBtn" onClick={() => navigate('/logout')}>
          <span aria-hidden="true">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
