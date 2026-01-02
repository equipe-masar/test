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

export default function GestionRecrutementPage() {
  const [form, setForm] = useState({
    libelle: '',
    abrv_libelle: '',
  })

  const [hoveredButton, setHoveredButton] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [items, setItems] = useState([])
  const [loadingList, setLoadingList] = useState(false)
  const [listError, setListError] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const loadList = async () => {
    setListError('')
    setLoadingList(true)
    try {
      const res = await apiJson('/api/recrutement')
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
    setForm({ libelle: '', abrv_libelle: '' })
    setIsModalOpen(true)
  }

  const openEditModal = (row) => {
    setError('')
    setSuccess('')
    setEditingId(row.id)
    setForm({
      libelle: row.libelle || '',
      abrv_libelle: row.abrv_libelle || '',
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setForm({ libelle: '', abrv_libelle: '' })
  }

  const onDelete = async (id) => {
    const ok = window.confirm('Supprimer cet enregistrement ?')
    if (!ok) return
    setError('')
    setSuccess('')
    try {
      await apiJson(`/api/recrutement/${id}`, { method: 'DELETE' })
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
      await apiJson(isEdit ? `/api/recrutement/${editingId}` : '/api/recrutement', {
        method: isEdit ? 'PUT' : 'POST',
        body: {
          libelle: form.libelle,
          abrv_libelle: form.abrv_libelle,
        },
      })
      setSuccess(isEdit ? 'Recrutement modifié avec succès.' : 'Recrutement enregistré avec succès.')
      closeModal()
      await loadList()
    } catch (err) {
      setError(err?.message || 'Erreur lors de la sauvegarde du recrutement')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app-page">
      <AdminNavbar />

      <div className="app-container">
        <div className="app-card">
          <h2 style={{ marginTop: 0 }}>Gestion Recrutement</h2>
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
              <h3 style={{ margin: 0 }}>Liste Recrutement</h3>
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
                  <th>Abrv</th>
                  <th style={{ width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingList ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '12px 10px' }}>
                      Chargement…
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '12px 10px' }}>
                      Aucun enregistrement.
                    </td>
                  </tr>
                ) : (
                  items.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.libelle}</td>
                      <td>{r.abrv_libelle}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <button
                            type="button"
                            onClick={() => openEditModal(r)}
                            title="Modifier"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            <img src={modifIcon} alt="Modifier" width={20} height={20} />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(r.id)}
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
              <div className="modal-title">{editingId != null ? 'Modifier Recrutement' : 'Nouveau Recrutement'}</div>
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
                  value={form.libelle}
                  onChange={onChange}
                  type="text"
                  placeholder="Description ou remarques sur le recrutement"
                />
              </div>

              <div>
                <label className="auth-label">Abréviation libellé</label>
                <input
                  className="auth-input"
                  name="abrv_libelle"
                  value={form.abrv_libelle}
                  onChange={onChange}
                  type="text"
                  placeholder="Ex: REC"
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
