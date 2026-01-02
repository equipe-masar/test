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
        navigate('/login', { replace: true })
      }
    })()
  }, [logout, navigate])

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brandTitle">GRH</div>
          <div className="auth-badge">Session</div>
        </div>

        <h2 className="auth-title">Déconnexion</h2>
        <div className="auth-subtitle">{done ? 'Vous êtes déconnecté. Redirection…' : 'Déconnexion…'}</div>

        <div className="auth-actions">
          <Link to="/login">Aller au login</Link>
        </div>
      </div>
    </div>
  )
}
