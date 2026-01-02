import { useEffect, useState } from 'react'
import RecruteNavbar from '../components/RecruteNavbar.jsx'

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

const initialForm = {
  matrecule: '',
  nom: '',
  prenom: '',
  dtnai: '',
  ncin: '',
  id_delegation: '',
  id_recrutement: '',
  id_origine_recrutement: '',
  id_niveau_scolaire: '',
  dtcin: '',
  iu: '',
  adress: '',
  tel: '',
  ppere: '',
  pgpere: '',
  pmere: '',
  dtenrolement: '',
  refenrolement: '',
  dtdetachement: '',
  refdetachement: '',
}

export default function GestionPersonnelsPage() {
  const [form, setForm] = useState(initialForm)
  const [idGouvernement, setIdGouvernement] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [search, setSearch] = useState('')

  const [personnels, setPersonnels] = useState([])
  const [loadingList, setLoadingList] = useState(false)
  const [listError, setListError] = useState('')

  const [gouvernements, setGouvernements] = useState([])
  const [delegations, setDelegations] = useState([])
  const [recrutements, setRecrutements] = useState([])
  const [originesRecrutement, setOriginesRecrutement] = useState([])
  const [niveauxScolaires, setNiveauxScolaires] = useState([])

  const [loadingRefs, setLoadingRefs] = useState(false)
  const [refsError, setRefsError] = useState('')

  const loadPersonnels = async () => {
    setListError('')
    setLoadingList(true)
    try {
      const res = await apiJson('/api/personnel')
      setPersonnels(Array.isArray(res?.data) ? res.data : [])
    } catch (err) {
      setListError(err?.message || 'Erreur lors du chargement des personnels')
    } finally {
      setLoadingList(false)
    }
  }

  const loadReferences = async () => {
    setRefsError('')
    setLoadingRefs(true)
    try {
      const [govRes, delRes, recRes, orgRes, nivRes] = await Promise.all([
        apiJson('/api/gouvernement'),
        apiJson('/api/delegation'),
        apiJson('/api/recrutement'),
        apiJson('/api/origineRecrutement'),
        apiJson('/api/niveauScolaire'),
      ])

      setGouvernements(Array.isArray(govRes?.data) ? govRes.data : [])
      setDelegations(Array.isArray(delRes?.data) ? delRes.data : [])
      setRecrutements(Array.isArray(recRes?.data) ? recRes.data : [])
      setOriginesRecrutement(Array.isArray(orgRes?.data) ? orgRes.data : [])
      setNiveauxScolaires(Array.isArray(nivRes?.data) ? nivRes.data : [])
    } catch (err) {
      setRefsError(err?.message || 'Erreur lors du chargement des listes')
    } finally {
      setLoadingRefs(false)
    }
  }

  useEffect(() => {
    loadReferences()
    loadPersonnels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // reset delegation selection when gouvernement changes
    setForm((f) => ({ ...f, id_delegation: '' }))
  }, [idGouvernement])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      const payload = Object.fromEntries(
        Object.entries(form).filter(([_, v]) => (typeof v === 'string' ? v.trim() !== '' : v != null))
      )

      // Convert FK ids to numbers when provided
      for (const key of [
        'id_delegation',
        'id_recrutement',
        'id_origine_recrutement',
        'id_niveau_scolaire',
      ]) {
        if (payload[key] != null && payload[key] !== '') payload[key] = Number(payload[key])
      }

      await apiJson('/api/personnel', {
        method: 'POST',
        body: payload,
      })

      setSuccess('Personnel enregistré avec succès.')
      setForm(initialForm)
      await loadPersonnels()
    } catch (err) {
      setError(err?.message || "Erreur lors de l'enregistrement")
    } finally {
      setSubmitting(false)
    }
  }

  const normalizedSearch = search.trim().toLowerCase()
  const filteredPersonnels = normalizedSearch
    ? personnels.filter((p) => {
        return [p?.id, p?.matrecule, p?.nom, p?.prenom, p?.ncin, p?.dtnai, p?.tel].some((v) =>
          String(v ?? '').toLowerCase().includes(normalizedSearch)
        )
      })
    : personnels

  return (
    <div className="app-page">
      <RecruteNavbar />

      <div className="app-container">
        <div className="app-card">
          <h2 style={{ marginTop: 0 }}>Gestion Personnels</h2>

          <form onSubmit={onSubmit} className="app-form" style={{ display: 'grid', gap: '12px', maxWidth: '720px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="auth-label">Matricule *</label>
                <input className="auth-input" name="matrecule" value={form.matrecule} onChange={onChange} type="text" />
              </div>

              <div>
                <label className="auth-label">NCIN *</label>
                <input className="auth-input" name="ncin" value={form.ncin} onChange={onChange} type="text" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="auth-label">Nom *</label>
                <input className="auth-input" name="nom" value={form.nom} onChange={onChange} type="text" />
              </div>

              <div>
                <label className="auth-label">Prénom *</label>
                <input className="auth-input" name="prenom" value={form.prenom} onChange={onChange} type="text" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="auth-label">Date de naissance *</label>
                <input className="auth-input" name="dtnai" value={form.dtnai} onChange={onChange} type="date" />
              </div>

              <div>
                <label className="auth-label">Date CIN</label>
                <input className="auth-input" name="dtcin" value={form.dtcin} onChange={onChange} type="date" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="auth-label">IU</label>
                <input className="auth-input" name="iu" value={form.iu} onChange={onChange} type="text" />
              </div>

              <div>
                <label className="auth-label">Téléphone (8 chiffres)</label>
                <input className="auth-input" name="tel" value={form.tel} onChange={onChange} type="text" maxLength={8} />
              </div>
            </div>

            <div>
              <label className="auth-label">Adresse</label>
              <input className="auth-input" name="adress" value={form.adress} onChange={onChange} type="text" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label className="auth-label">Prénom père</label>
                <input className="auth-input" name="ppere" value={form.ppere} onChange={onChange} type="text" />
              </div>
              <div>
                <label className="auth-label">Prénom grand-père</label>
                <input className="auth-input" name="pgpere" value={form.pgpere} onChange={onChange} type="text" />
              </div>
              <div>
                <label className="auth-label">Prénom mère</label>
                <input className="auth-input" name="pmere" value={form.pmere} onChange={onChange} type="text" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="auth-label">Date enrôlement</label>
                <input className="auth-input" name="dtenrolement" value={form.dtenrolement} onChange={onChange} type="date" />
              </div>
              <div>
                <label className="auth-label">Réf. enrôlement</label>
                <input className="auth-input" name="refenrolement" value={form.refenrolement} onChange={onChange} type="text" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="auth-label">Date détachement</label>
                <input className="auth-input" name="dtdetachement" value={form.dtdetachement} onChange={onChange} type="date" />
              </div>
              <div>
                <label className="auth-label">Réf. détachement</label>
                <input className="auth-input" name="refdetachement" value={form.refdetachement} onChange={onChange} type="text" />
              </div>
            </div>

            {refsError ? (
              <div className="auth-alert">
                <div className="auth-alertTitle">Erreur</div>
                <div>{refsError}</div>
              </div>
            ) : null}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="auth-label">Gouvernement</label>
                <select
                  className="auth-input"
                  value={idGouvernement}
                  onChange={(e) => setIdGouvernement(e.target.value)}
                  disabled={loadingRefs}
                >
                  <option value="">-- Choisir --</option>
                  {gouvernements.map((g) => (
                    <option key={g.id} value={String(g.id)}>
                      {g.libelle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="auth-label">Délégation</label>
                <select
                  className="auth-input"
                  name="id_delegation"
                  value={form.id_delegation}
                  onChange={onChange}
                  disabled={loadingRefs || !idGouvernement}
                >
                  <option value="">-- Choisir --</option>
                  {delegations
                    .filter((d) => {
                      if (!idGouvernement) return false
                      const govIdNum = Number(idGouvernement)
                      return (
                        Number(d?.id_gouvernement) === govIdNum ||
                        Number(d?.id_gouv) === govIdNum ||
                        Number(d?.gouvernement?.id) === govIdNum
                      )
                    })
                    .map((d) => (
                      <option key={d.id} value={String(d.id)}>
                        {d.libelle}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="auth-label">Recrutement</label>
                <select
                  className="auth-input"
                  name="id_recrutement"
                  value={form.id_recrutement}
                  onChange={onChange}
                  disabled={loadingRefs}
                >
                  <option value="">-- Choisir --</option>
                  {recrutements.map((r) => (
                    <option key={r.id} value={String(r.id)}>
                      {r.libelle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="auth-label">Origine recrutement</label>
                <select
                  className="auth-input"
                  name="id_origine_recrutement"
                  value={form.id_origine_recrutement}
                  onChange={onChange}
                  disabled={loadingRefs}
                >
                  <option value="">-- Choisir --</option>
                  {originesRecrutement.map((o) => (
                    <option key={o.id} value={String(o.id)}>
                      {o.libelle}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="auth-label">Niveau scolaire</label>
              <select
                className="auth-input"
                name="id_niveau_scolaire"
                value={form.id_niveau_scolaire}
                onChange={onChange}
                disabled={loadingRefs}
              >
                <option value="">-- Choisir --</option>
                {niveauxScolaires.map((n) => (
                  <option key={n.id} value={String(n.id)}>
                    {n.libelle}
                  </option>
                ))}
              </select>
            </div>

            {error ? (
              <div className="auth-alert">
                <div className="auth-alertTitle">Erreur</div>
                <div>{error}</div>
              </div>
            ) : null}

            {success ? (
              <div className="auth-alert">
                <div className="auth-alertTitle">Succès</div>
                <div>{success}</div>
              </div>
            ) : null}

            <button type="submit" className="auth-primaryBtn" style={{ marginTop: '8px', width: 'fit-content' }} disabled={submitting}>
              {submitting ? 'Enregistrement…' : 'Enregistrer'}
            </button>
          </form>

          <div style={{ marginTop: '18px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>Liste des personnels</h3>
              <button
                type="button"
                className="auth-primaryBtn"
                style={{ width: 'fit-content', padding: '8px 12px' }}
                onClick={loadPersonnels}
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
                  <th>Matricule</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>NCIN</th>
                  <th>Date naissance</th>
                  <th>Tél</th>
                </tr>
              </thead>
              <tbody>
                {loadingList ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '12px 10px' }}>
                      Chargement…
                    </td>
                  </tr>
                ) : filteredPersonnels.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '12px 10px' }}>
                      Aucun personnel.
                    </td>
                  </tr>
                ) : (
                  filteredPersonnels.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.matrecule || '-'}</td>
                      <td>{p.nom || '-'}</td>
                      <td>{p.prenom || '-'}</td>
                      <td>{p.ncin || '-'}</td>
                      <td>{p.dtnai || '-'}</td>
                      <td>{p.tel || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
