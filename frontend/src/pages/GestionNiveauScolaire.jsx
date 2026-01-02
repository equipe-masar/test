import { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar.jsx'
import modifIcon from '../assets/modif.png'
import suppIcon from '../assets/supp.png'
import ajoutIcon from '../assets/ajout.png'

async function apiJson(path, { method = 'GET', body } = {}) {
  const res = await fetch(path, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data?.message || data?.error || 'Request failed'
    const error = new Error(message)
    error.status = res.status
    error.data = data
    throw error
  }
  return data
}

export default function GestionNiveauScolairePage() {
  const [libelle, setLibelle] = useState('')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [items, setItems] = useState([])
  const [loadingList, setLoadingList] = useState(false)
  const [listError, setListError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [hoveredButton, setHoveredButton] = useState(null)

  const loadList = async () => {
    setListError('')
    setLoadingList(true)
    try {
      const res = await apiJson('/api/niveauScolaire')
      setItems(Array.isArray(res?.data) ? res.data : [])
    } catch (err) {
      setListError(err?.message || 'Erreur lors du chargement')
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => {
    loadList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openCreateModal = () => {
    setError('')
    setSuccess('')
    setEditingId(null)
    setLibelle('')
    setIsModalOpen(true)
  }

  const openEditModal = (row) => {
    setError('')
    setSuccess('')
    setEditingId(row.id)
    setLibelle(row.libelle || '')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setLibelle('')
  }

  const onDelete = async (id) => {
    const ok = window.confirm('Supprimer cet enregistrement ?')
    if (!ok) return
    setError('')
    setSuccess('')
    try {
      await apiJson(`/api/niveauScolaire/${id}`, { method: 'DELETE' })
      await loadList()
    } catch (err) {
      setError(err?.message || 'Erreur lors de la suppression')
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)
    try {
      const isEdit = editingId != null
      await apiJson(isEdit ? `/api/niveauScolaire/${editingId}` : '/api/niveauScolaire', {
        method: isEdit ? 'PUT' : 'POST',
        body: { libelle },
      })
      setSuccess(isEdit ? 'Niveau scolaire modifié avec succès.' : 'Niveau scolaire enregistré avec succès.')
      closeModal()
      await loadList()
    } catch (err) {
      setError(err?.message || "Erreur lors de l'enregistrement")
    } finally {
      setSubmitting(false)
    }
  }

  const normalizedSearch = search.trim().toLowerCase()
  const filteredItems = normalizedSearch
    ? items.filter((n) => {
        return [n?.id, n?.libelle].some((v) => String(v ?? '').toLowerCase().includes(normalizedSearch))
      })
    : items

  return (
    <div className="app-page">
      <AdminNavbar />

      <div className="app-container">
        <div className="app-card">
          <h2 style={{ marginTop: 0 }}>Niveau Scolaire</h2>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <button type="button" className="auth-primaryBtn" style={{ width: 'auto' }} onClick={openCreateModal}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <img src={ajoutIcon} alt="Ajouter" style={{ width: '18px', height: '18px' }} />
                <span>Ajouter</span>
              </span>
            </button>
          </div>

          {success ? (
            <div className="auth-alert" style={{ marginBottom: '12px' }}>
              <div className="auth-alertTitle">Succès</div>
              <div>{success}</div>
            </div>
          ) : null}

          {error ? (
            <div className="auth-alert" style={{ marginBottom: '12px' }}>
              <div className="auth-alertTitle">Erreur</div>
              <div>{error}</div>
            </div>
          ) : null}

          <div style={{ marginTop: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <h3 style={{ margin: 0 }}>Liste Niveau Scolaire</h3>
              <button
                type="button"
                className="auth-primaryBtn"
                style={{ width: 'fit-content', padding: '8px 12px' }}
                onClick={loadList}
                disabled={loadingList}
              >
                {loadingList ? 'Chargement…' : 'Rafraîchir'}
              </button>
            </div>

            <div style={{ marginTop: '10px', maxWidth: '360px' }}>
              <label className="auth-label">Rechercher</label>
              <input
                className="auth-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Rechercher..."
              />
            </div>

            {listError ? (
              <div className="auth-alert" style={{ marginTop: '12px' }}>
                <div className="auth-alertTitle">Erreur</div>
                <div>{listError}</div>
              </div>
            ) : null}

            <table className="app-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Libellé</th>
                  <th style={{ width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingList ? (
                  <tr>
                    <td colSpan={3} style={{ padding: '12px 10px' }}>
                      Chargement…
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ padding: '12px 10px' }}>
                      Aucun enregistrement.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((n) => (
                    <tr key={n.id}>
                      <td>{n.id}</td>
                      <td>{n.libelle}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <button
                            type="button"
                            onClick={() => openEditModal(n)}
                            title="Modifier"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            <img src={modifIcon} alt="Modifier" width={20} height={20} />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(n.id)}
                            title="Supprimer"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            <img src={suppIcon} alt="Supprimer" width={20} height={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editingId != null ? 'Modifier Niveau Scolaire' : 'Nouveau Niveau Scolaire'}</div>
              <button type="button" onClick={closeModal}>
                &times;
              </button>
            </div>

            <form onSubmit={onSubmit}>
              <div>
                <label className="auth-label">Libellé</label>
                <input
                  className="auth-input"
                  name="libelle"
                  value={libelle}
                  onChange={(e) => setLibelle(e.target.value)}
                  type="text"
                  placeholder="Ex: Primaire, Secondaire"
                />
              </div>

              {error ? (
                <div className="auth-alert" style={{ borderColor: 'red', marginBottom: '8px' }}>
                  <div className="auth-alertTitle">Erreur</div>
                  <div>{error}</div>
                </div>
              ) : null}

              <div className="modal-footer" style={{ flexDirection: 'column', gap: '10px' }}>
                <button
                  type="submit"
                  className="auth-primaryBtn"
                  disabled={submitting}
                  onMouseEnter={() => setHoveredButton('submit')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    backgroundColor: hoveredButton === 'submit' ? '#005fa3' : '#0066cc',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  {submitting ? 'Enregistrement…' : editingId != null ? 'Enregistrer' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  onMouseEnter={() => setHoveredButton('cancel')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    backgroundColor: hoveredButton === 'cancel' ? '#e0e0e0' : '#f0f0f0',
                    transition: 'background-color 0.3s ease',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
