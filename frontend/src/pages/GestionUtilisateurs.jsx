import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function GestionUtilisateurs() {
  const { user, role } = useAuth()
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editError, setEditError] = useState(null)
  const [editingOriginalUsername, setEditingOriginalUsername] = useState(null)
  const [form, setForm] = useState({
    username: '',
    matricule: '',
    password: '',
    confirmPassword: '',
    userRole: 'operateur',
  })

  const [editForm, setEditForm] = useState({
    username: '',
    matricule: '',
    userRole: 'operateur',
  })

  async function loadUsers() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/user', {
        credentials: 'include',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.message || 'Erreur lors du chargement des utilisateurs')
      }
      setUsers(Array.isArray(data.data) ? data.data : [])
    } catch (err) {
      setError(err.message || 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const onChangeField = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onChangeEditField = (e) => {
    const { name, value } = e.target
    setEditForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setCreateError(null)
    if (!form.username || !form.password) {
      setCreateError('Username et mot de passe sont obligatoires')
      return
    }

    if (form.password !== form.confirmPassword) {
      setCreateError('Les mots de passe ne correspondent pas')
      return
    }

    setCreating(true)
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          matricule: form.matricule,
          password: form.password,
          userRole: form.userRole,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.message || 'Erreur lors de la création de l’utilisateur')
      }

      setForm({ username: '', matricule: '', password: '', confirmPassword: '', userRole: 'operateur' })
      setIsModalOpen(false)
      await loadUsers()
    } catch (err) {
      setCreateError(err.message || 'Erreur inconnue')
    } finally {
      setCreating(false)
    }
  }

  const openEditModal = (userToEdit) => {
    setEditError(null)
    setEditingOriginalUsername(userToEdit.username)
    setEditForm({
      username: userToEdit.username,
      matricule: userToEdit.matricule || '',
      userRole: userToEdit.userRole || 'operateur',
    })
    setIsEditModalOpen(true)
  }

  const onSubmitEdit = async (e) => {
    e.preventDefault()
    setEditError(null)

    if (!editForm.username) {
      setEditError('Username manquant')
      return
    }

    setEditing(true)
    try {
      const targetUsername = editingOriginalUsername || editForm.username
      const res = await fetch(`/api/user/${encodeURIComponent(targetUsername)}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: editForm.username,
          matricule: editForm.matricule,
          userRole: editForm.userRole,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.message || "Erreur lors de la mise à jour de l’utilisateur")
      }

      setIsEditModalOpen(false)
  setEditingOriginalUsername(null)
      await loadUsers()
    } catch (err) {
      setEditError(err.message || 'Erreur inconnue')
    } finally {
      setEditing(false)
    }
  }

  const onDeleteUser = async (username) => {
    if (!window.confirm(`Supprimer l’utilisateur « ${username} » ?`)) return

    try {
      const res = await fetch(`/api/user/${encodeURIComponent(username)}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.message || 'Erreur lors de la suppression de l’utilisateur')
      }
      await loadUsers()
    } catch (err) {
      alert(err.message || 'Erreur inconnue lors de la suppression')
    }
  }

  const onToggleStatus = async (userToToggle) => {
    const newState = userToToggle.state === 'active' ? 'inactive' : 'active'
    try {
      const res = await fetch(`/api/user/${encodeURIComponent(userToToggle.username)}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: newState }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.message || 'Erreur lors du changement de statut')
      }
      await loadUsers()
    } catch (err) {
      alert(err.message || 'Erreur inconnue lors du changement de statut')
    }
  }

  return (
    <div className="app-page">
      {/* NAVBAR */}
      <div className="app-nav">
        <div className="app-navLeft">
          <div className="app-navTitle">GRH</div>
           <div className="app-v">{role || '-'}</div>

          <nav className="app-navLinks">
            <Link to="/administrateur/utilisateurs">Gestion Utilisateurs        </Link>
            <Link to="/administrateur/corges">Gestion Corges</Link>
          </nav>
        </div>

        <button onClick={() => navigate('/logout')}>Logout</button>
       
      </div>

      {/* CONTENU PAGE */}
      <div className="app-container">
        <div className="app-card">
          <h2 style={{ marginTop: 0 }}>Gestion des Utilisateurs</h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <button
              type="button"
              className="auth-primaryBtn"
              style={{ width: 'auto' }}
              onClick={() => {
                setCreateError(null)
                setForm({ username: '', matricule: '', password: '', confirmPassword: '', userRole: 'operateur' })
                setIsModalOpen(true)
              }}
            >
              Ajouter un utilisateur
            </button>
          </div>

          {loading && <p>Chargement des utilisateurs…</p>}
          {error && !loading && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && (
            <table className="app-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Matricule</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.username}>
                      <td>{u.username}</td>
                      <td>{u.matricule || '-'}</td>
                      <td>{u.userRole || '-'}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => onToggleStatus(u)}
                          style={{
                            fontSize: '0.8rem',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '999px',
                            borderColor: u.state === 'active' ? 'limegreen' : 'orangered',
                          }}
                        >
                          {u.state === 'active' ? 'Actif' : 'Inactif'}
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          style={{ marginRight: '6px' }}
                          onClick={() => openEditModal(u)}
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          style={{ marginRight: '6px' }}
                          onClick={() => onDeleteUser(u.username)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Nouvel utilisateur</div>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                X
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <div>
                <label className="auth-label" htmlFor="username-modal">Username</label>
                <input
                  id="username-modal"
                  name="username"
                  type="text"
                  className="auth-input"
                  value={form.username}
                  onChange={onChangeField}
                />
              </div>
              <div>
                <label className="auth-label" htmlFor="matricule-modal">Matricule</label>
                <input
                  id="matricule-modal"
                  name="matricule"
                  type="text"
                  className="auth-input"
                  value={form.matricule}
                  onChange={onChangeField}
                />
              </div>
              <div>
                <label className="auth-label" htmlFor="password-modal">Mot de passe</label>
                <input
                  id="password-modal"
                  name="password"
                  type="password"
                  className="auth-input"
                  value={form.password}
                  onChange={onChangeField}
                />
              </div>
              <div>
                <label className="auth-label" htmlFor="confirmPassword-modal">Confirmer le mot de passe</label>
                <input
                  id="confirmPassword-modal"
                  name="confirmPassword"
                  type="password"
                  className="auth-input"
                  value={form.confirmPassword}
                  onChange={onChangeField}
                />
              </div>
              <div>
                <label className="auth-label" htmlFor="userRole-modal">Rôle</label>
                <select
                  id="userRole-modal"
                  name="userRole"
                  className="auth-input"
                  value={form.userRole}
                  onChange={onChangeField}
                >
                  <option value="operateur">Opérateur</option>
                  <option value="validateur">Validateur</option>
                  <option value="administrateur">Administrateur</option>
                </select>
              </div>
              {createError && (
                <div className="auth-alert" style={{ borderColor: 'red', marginBottom: '8px' }}>
                  <div className="auth-alertTitle">Erreur</div>
                  <div>{createError}</div>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={creating}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="auth-primaryBtn"
                >
                  {creating ? 'Ajout en cours…' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Modifier l’utilisateur</div>
              <button type="button" onClick={() => setIsEditModalOpen(false)}>
                X
              </button>
            </div>
            <form onSubmit={onSubmitEdit}>
              <div>
                <label className="auth-label" htmlFor="edit-username">Username</label>
                <input
                  id="edit-username"
                  name="username"
                  type="text"
                  className="auth-input"
                  value={editForm.username}
                  onChange={onChangeEditField}
                />
              </div>
              <div>
                <label className="auth-label" htmlFor="edit-matricule">Matricule</label>
                <input
                  id="edit-matricule"
                  name="matricule"
                  type="text"
                  className="auth-input"
                  value={editForm.matricule}
                  onChange={onChangeEditField}
                />
              </div>
              <div>
                <label className="auth-label" htmlFor="edit-userRole">Rôle</label>
                <select
                  id="edit-userRole"
                  name="userRole"
                  className="auth-input"
                  value={editForm.userRole}
                  onChange={onChangeEditField}
                >
                  <option value="operateur">Opérateur</option>
                  <option value="validateur">Validateur</option>
                  <option value="administrateur">Administrateur</option>
                </select>
              </div>
              {editError && (
                <div className="auth-alert" style={{ borderColor: 'red', marginBottom: '8px' }}>
                  <div className="auth-alertTitle">Erreur</div>
                  <div>{editError}</div>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={editing}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={editing}
                  className="auth-primaryBtn"
                >
                  {editing ? 'Sauvegarde…' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
