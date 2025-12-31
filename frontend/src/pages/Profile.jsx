import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

async function apiJson(path, { method = 'GET', body, signal } = {}) {
  const res = await fetch(path, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data?.message || 'Request failed'
    const error = new Error(message)
    error.status = res.status
    error.data = data
    throw error
  }
  return data
}

function formatValue(value) {
  if (value === null || value === undefined) return '-'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export default function ProfilePage() {
  const { user, role, refresh } = useAuth()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [corges, setCorges] = useState([])
  const [corgesLoading, setCorgesLoading] = useState(false)
  const [corgesError, setCorgesError] = useState('')

  const [form, setForm] = useState({
    matricule: user?.matricule || '',
    id_corge: user?.id_corge ?? '',
    isActive: (user?.state || '').toLowerCase() === 'active',
  })

  useEffect(() => {
    if (!user) return

    const controller = new AbortController()
    ;(async () => {
      setCorgesLoading(true)
      setCorgesError('')
      try {
        const result = await apiJson('/api/corge', { signal: controller.signal })
        setCorges(Array.isArray(result?.data) ? result.data : [])
      } catch (e) {
        if (e?.name !== 'AbortError') {
          setCorges([])
          setCorgesError(e?.message || 'Failed to load corges')
        }
      } finally {
        setCorgesLoading(false)
      }
    })()

    return () => controller.abort()
  }, [user])

  const corgeName = useMemo(() => {
    const id = user?.id_corge
    if (id === null || id === undefined || id === '') return null
    const match = corges.find((c) => String(c?.id) === String(id))
    return match?.libelle || match?.abrv_libelle || null
  }, [corges, user?.id_corge])

  const entries = useMemo(() => {
    const src = user || {}
    return Object.entries(src)
  }, [user])

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const onSave = async () => {
    if (!user?.username) return

    setSaving(true)
    setError('')
    try {
      const payload = {
        matricule: form.matricule || null,
        id_corge:
          form.id_corge === '' || form.id_corge === null
            ? null
            : Number(form.id_corge),
        state: Boolean(form.isActive),
      }

      await apiJson(`/api/user/${encodeURIComponent(user.username)}`, {
        method: 'PUT',
        body: payload,
      })

      await refresh()
      setIsEditing(false)
    } catch (e) {
      setError(e?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="app-page">
      <div className="app-nav">
        <div className="app-navLeft">
          <div className="app-navTitle">GRH</div>
          <div className="app-navTag">PROFILE</div>

          <nav className="app-navLinks">
            <Link to="/">Home</Link>
          </nav>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/logout')}>Logout</button>
        </div>
      </div>

      <div className="app-container">
        <div className="app-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <h2 style={{ marginTop: 0, marginBottom: 0 }}>Profil</h2>
            <button
              onClick={() => {
                setError('')
                setForm({
                  matricule: user?.matricule || '',
                  id_corge: user?.id_corge ?? '',
                  isActive: (user?.state || '').toLowerCase() === 'active',
                })
                setIsEditing((v) => !v)
              }}
            >
              Modifier
            </button>
          </div>

          <div className="app-kv">
            <div className="app-k">Rôle (session)</div>
            <div className="app-v">{role || '-'}</div>
          </div>

          {error ? (
            <div className="auth-alert" style={{ marginTop: 12 }}>
              <div className="auth-alertTitle">Erreur</div>
              <div>{error}</div>
            </div>
          ) : null}

          {isEditing ? (
            <div style={{ marginTop: 12 }}>
              <div className="app-kv">
                <div className="app-k">Matricule</div>
                <div className="app-v">
                  <input className="auth-input" value={form.matricule} onChange={onChange('matricule')} />
                </div>

                <div className="app-k">Corge</div>
                <div className="app-v">
                  <select
                    className="auth-input"
                    value={form.id_corge}
                    onChange={onChange('id_corge')}
                    disabled={corgesLoading}
                  >
                    <option value="">-</option>
                    {corges.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.libelle || c.abrv_libelle || String(c.id)}
                      </option>
                    ))}
                  </select>
                  {corgesError ? (
                    <div style={{ marginTop: 6, color: 'var(--app-muted)', fontSize: 12 }}>{corgesError}</div>
                  ) : null}
                </div>

                <div className="app-k">Statut</div>
                <div className="app-v" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input
                    type="checkbox"
                    checked={Boolean(form.isActive)}
                    onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                  />
                  <div>{form.isActive ? 'Actif' : 'Inactif'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button onClick={onSave} disabled={saving}>
                  {saving ? 'Saving…' : 'Enregistrer'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setError('')
                  }}
                  disabled={saving}
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : null}

          <div style={{ marginTop: 16 }}>
            <h3 style={{ margin: 0 }}>Informations utilisateur</h3>
            <div className="app-kv" style={{ marginTop: 12 }}>
              {entries.length ? (
                entries
                  .filter(([k]) => k !== 'id_corge')
                  .map(([k, v]) => (
                    <div key={k} style={{ display: 'contents' }}>
                      <div className="app-k">{k}</div>
                      <div className="app-v">{formatValue(v)}</div>
                    </div>
                  ))
              ) : (
                <>
                  <div className="app-k">Utilisateur</div>
                  <div className="app-v">-</div>
                </>
              )}

              <div style={{ display: 'contents' }}>
                <div className="app-k">corge</div>
                <div className="app-v">{corgeName || '-'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
