import { useState, useEffect } from "react";
import { useAuth } from '../auth/AuthContext.jsx';
import AdminNavbar from '../components/AdminNavbar.jsx';

const initialForm = {
  libelle: "",
  abrv_libelle: "",
  id_arme: "",
  id_garnizon: "",
  id_brigade: "",
  id_region: "",
  id_corge_soutient: "",
};

export default function GestionCorge() {
  const { user } = useAuth();
  const [corges, setCorges] = useState([]);
  const [form, setForm] = useState(initialForm);

  // Listes de données pour les menus déroulants
  const [armees, setArmees] = useState([]);
  const [garnizons, setGarnizons] = useState([]);
  const [brigades, setBrigades] = useState([]);
  const [regions, setRegions] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingCorge, setEditingCorge] = useState(null);

  // Chargement de toutes les données
  const fetchData = async () => {
    try {
      const [corgeRes, armeeRes, garnizonRes, brigadeRes, regionRes] = await Promise.all([
        fetch('/api/corge', { credentials: 'include' }),
        fetch('/api/armee', { credentials: 'include' }),
        fetch('/api/garnizon', { credentials: 'include' }),
        fetch('/api/brigade', { credentials: 'include' }),
        fetch('/api/region', { credentials: 'include' })
      ]);

      const cData = await corgeRes.json();
      const aData = await armeeRes.json();
      const gData = await garnizonRes.json();
      const bData = await brigadeRes.json();
      const rData = await regionRes.json();

      setCorges(cData.data || []);
      setArmees(aData.data || []);
      setGarnizons(gData.data || []);
      setBrigades(bData.data || []);
      setRegions(rData.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers pour la Modale
  const openAddModal = () => {
    console.log("Ouverture Modale Ajout");
    setEditingCorge(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const openEditModal = (corge) => {
    console.log("Ouverture Modale Edition", corge);
    setEditingCorge(corge);
    setForm({
      libelle: corge.libelle || "",
      abrv_libelle: corge.abrv_libelle || "",
      id_arme: corge.id_arme || "",
      id_garnizon: corge.id_garnizon || "",
      id_brigade: corge.id_brigade || "",
      id_region: corge.id_region || "",
      id_corge_soutient: corge.id_corge_soutient || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCorge(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingCorge ? 'PUT' : 'POST';
    const url = editingCorge ? `/api/corge/${editingCorge.id}` : '/api/corge';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (response.ok) {
        await fetchData(); // Rafraîchir la liste
        closeModal();
      } else {
        alert("Erreur lors de l'enregistrement");
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet élément ?')) return;
    try {
      const res = await fetch(`/api/corge/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) fetchData();
    } catch (err) { console.error(err); }
  };

  // Helper pour afficher les noms au lieu des IDs dans le tableau
  const getLabel = (list, id) => list.find(item => item.id == id)?.libelle || "-";

  return (
    <div className="app-page">
      <AdminNavbar />

      <div className="app-container">
        <div className="app-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2>Gestion des Corges</h2>
            <button className="auth-primaryBtn" style={{ width: 'auto' }} onClick={openAddModal}>
              + Ajouter un corge
            </button>
          </div>

          <table className="app-table">
            <thead>
              <tr>
                <th>Libelle</th>
                <th>Armée</th>
                <th>Garnison</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {corges.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.libelle}</strong></td>
                  <td>{getLabel(armees, c.id_arme)}</td>
                  <td>{getLabel(garnizons, c.id_garnizon)}</td>
                  <td>
                    <button onClick={() => openEditModal(c)} style={{ marginRight: '8px' }}>Éditer</button>
                    <button onClick={() => handleDelete(c.id)} style={{ color: 'red' }}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editingCorge ? 'Éditer' : 'Ajouter'} un Corge</div>
              <button onClick={closeModal}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="auth-label">Libelle</label>
              <input name="libelle" value={form.libelle} onChange={handleChange} className="auth-input" required />

              <label className="auth-label">Abréviation</label>
              <input name="abrv_libelle" value={form.abrv_libelle} onChange={handleChange} className="auth-input" required />

              <label className="auth-label">Armée</label>
              <select name="id_arme" value={form.id_arme} onChange={handleChange} className="auth-input" required>
                <option value="">Sélectionner...</option>
                {armees.map(a => <option key={a.id} value={a.id}>{a.libelle}</option>)}
              </select>

              <label className="auth-label">Garnison</label>
              <select name="id_garnizon" value={form.id_garnizon} onChange={handleChange} className="auth-input" required>
                <option value="">Sélectionner...</option>
                {garnizons.map(g => <option key={g.id} value={g.id}>{g.libelle}</option>)}
              </select>

              <label className="auth-label">Région</label>
              <select name="id_region" value={form.id_region} onChange={handleChange} className="auth-input">
                <option value="">Sélectionner...</option>
                {regions.map(r => <option key={r.id} value={r.id}>{r.libelle}</option>)}
              </select>

              <div className="modal-footer">
                <button type="button" onClick={closeModal}>Annuler</button>
                <button type="submit" className="auth-primaryBtn">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}