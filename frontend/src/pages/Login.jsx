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
    <div style={{ maxWidth: 360, margin: '64px auto', textAlign: 'left' }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            style={{ width: '100%', padding: 8, marginTop: 6, marginBottom: 12 }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={{ width: '100%', padding: 8, marginTop: 6, marginBottom: 12 }}
          />
        </label>
        {error ? <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div> : null}
        <button type="submit" disabled={submitting} style={{ width: '100%', padding: 10 }}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        Seed admin par défaut: username <b>admin</b> / password <b>admin123</b>
      </div>
    </div>
  )
}
