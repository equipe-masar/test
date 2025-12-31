import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function LogoutPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        await logout()
      } finally {
        setDone(true)
      }
    })()
  }, [logout])

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brandTitle">GRH</div>
          <div className="auth-badge">Session</div>
        </div>

        <h2 className="auth-title">Déconnexion</h2>
        <div className="auth-subtitle">{done ? 'Vous êtes déconnecté.' : 'Déconnexion…'}</div>

        <div className="auth-actions">
          <button className="auth-primaryBtn" onClick={() => navigate('/login', { replace: true })}>
            Aller au login
          </button>
          <Link to="/login">Retour</Link>
        </div>
      </div>
    </div>
  )
}
