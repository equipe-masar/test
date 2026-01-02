import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function RecruteNavbar() {
  const { user } = useAuth()
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const navigate = useNavigate()
  const initial = (user?.username || 'R')[0].toUpperCase()

  return (
    <div className="app-nav">
      <div className="app-navLeft">
        <div className="app-navTitle">GRH</div>
        <div className="app-navTag">RECRUTE</div>

        <nav className="app-navLinks">
          <Link className="app-navLink" to="/recrute">
            Dashboard
          </Link>
          <Link className="app-navLink" to="/recrute/personnels">
            Gestion Personnels
          </Link>
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
