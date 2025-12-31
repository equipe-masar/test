import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { roleHomePath, useAuth } from '../auth/AuthContext.jsx'

export default function LoginPage() {
  const { loading, user, role, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = useMemo(() => location.state?.from?.pathname, [location.state])

  if (!loading && user) {
    navigate(from || roleHomePath(role), { replace: true })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const result = await login(username, password)
      navigate(from || roleHomePath(result.role), { replace: true })
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brandTitle">GRH</div>
          <div className="auth-badge">Accès sécurisé</div>
        </div>

        <h2 className="auth-title">Connexion</h2>
        <div className="auth-subtitle">Application de gestion du personnel.</div>

        <form onSubmit={onSubmit}>
          <label className="auth-label">Username</label>
          <input
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            placeholder=""
          />

          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder=""
          />

          {error ? (
            <div className="auth-alert">
              <div className="auth-alertTitle">Erreur</div>
              <div>{error}</div>
            </div>
          ) : null}

          <button className="auth-primaryBtn" type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

      </div>
    </div>
  )
}
