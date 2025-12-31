import { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import AdminNavbar from '../components/AdminNavbar.jsx';

export default function GestionCorge() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [corges, setCorges] = useState([]);
  const [form, setForm] = useState({
    libelle: "",
    abrv_libelle: "",
    id_arme: "",
    id_garnizon: "",
    id_brigade: "",
    id_region: "",
    id_corge_soutient: "",
  });

  const [armees, setArmees] = useState([]);
  const [garnizons, setGarnizons] = useState([]);
  const [brigades, setBrigades] = useState([]);
  const [regions, setRegions] = useState([]);
  const [allCorges, setAllCorges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCorge, setEditingCorge] = useState(null);

  const fetchCorges = async () => {
    try {
      const response = await fetch('/api/corge', { credentials: 'include' });
      if (response.ok) {
        const result = await response.json();
        setCorges(result.data || []);
        setAllCorges(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching corges:', error);
    }
  };

  useEffect(() => {
    fetchCorges();
    const fetchOthers = async () => {
      try {
        const [armeesRes, garnizonsRes, brigadesRes, regionsRes] = await Promise.all([
          fetch('/api/armee', { credentials: 'include' }),
          fetch('/api/garnizon', { credentials: 'include' }),
          fetch('/api/brigade', { credentials: 'include' }),
          fetch('/api/region', { credentials: 'include' })
        ]);
        const armeesData = await armeesRes.json();
        const garnizonsData = await garnizonsRes.json();
        const brigadesData = await brigadesRes.json();
        const regionsData = await regionsRes.json();
        setArmees(armeesData.data || []);
        setGarnizons(garnizonsData.data || []);
        setBrigades(brigadesData.data || []);
        setRegions(regionsData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchOthers();
  }, []);

  // Met à jour le formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ajouter ou éditer un corge
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      libelle: form.libelle,
      abrv_libelle: form.abrv_libelle,
      id_arme: form.id_arme,
      id_garnizon: form.id_garnizon,
      id_brigade: form.id_brigade,
      id_region: form.id_region,
      id_corge_soutient: form.id_corge_soutient,
    };
    try {
      let response;
      if (editingCorge) {
        // Update
        response = await fetch(`/api/corge/${editingCorge.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(dataToSend),
        });
      } else {
        // Add
        response = await fetch('/api/corge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(dataToSend),
        });
      }
      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        const updatedCorge = result.data;
        setShowModal(false); // Close modal first
        if (!updatedCorge) {
          console.error('Erreur: données non reçues du serveur. Réponse:', result);
          fetchCorges(); // Refresh anyway
          return;
        }
        if (editingCorge) {
          setCorges(corges.map(c => c.id == editingCorge.id ? updatedCorge : c));
          setAllCorges(allCorges.map(c => c.id == editingCorge.id ? updatedCorge : c));
        } else {
          setCorges([...corges, updatedCorge]);
          setAllCorges([...allCorges, updatedCorge]);
        }
        setForm({
          libelle: "",
          abrv_libelle: "",
          id_arme: "",
          id_garnizon: "",
          id_brigade: "",
          id_region: "",
          id_corge_soutient: "",
        });
        setEditingCorge(null);
      } else {
        const errorText = await response.text();
        console.error('Failed to save corge:', errorText);
        alert('Erreur lors de la sauvegarde du corge: ' + response.status);
      }
    } catch (error) {
      console.error('Error saving corge:', error);
      alert('Erreur réseau');
    }
  };

  // Supprimer un corge
  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce corge ?')) return;
    try {
      const response = await fetch(`/api/corge/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setCorges(corges.filter(c => c.id !== id));
        setAllCorges(allCorges.filter(c => c.id !== id));
        fetchCorges(); // Refresh to ensure consistency
      } else {
        console.error('Failed to delete corge:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error deleting corge:', error);
    }
  };

  const openAddModal = () => {
    setEditingCorge(null);
    setForm({
      libelle: "",
      abrv_libelle: "",
      id_arme: "",
      id_garnizon: "",
      id_brigade: "",
      id_region: "",
      id_corge_soutient: "",
    });
    setShowModal(true);
  };

  const openEditModal = (corge) => {
    setEditingCorge(corge);
    setForm({
      libelle: corge.libelle,
      abrv_libelle: corge.abrv_libelle,
      id_arme: corge.id_arme,
      id_garnizon: corge.id_garnizon,
      id_brigade: corge.id_brigade,
      id_region: corge.id_region,
      id_corge_soutient: corge.id_corge_soutient,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCorge(null);
  };

  const getDisplayValue = (key, value) => {
    if (key === 'id_arme') return armees.find(a => a.id == value)?.libelle || value;
    if (key === 'id_garnizon') return garnizons.find(g => g.id == value)?.libelle || value;
    if (key === 'id_brigade') return brigades.find(b => b.id == value)?.libelle || value;
    if (key === 'id_region') return regions.find(r => r.id == value)?.libelle || value;
    if (key === 'id_corge_soutient') return allCorges.find(c => c.id == value)?.libelle || value;
    return value;
  };

  const formatDateTime = (value) => {
    if (!value) return '-';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString('fr-FR');
  };

  return (
    <div className="app-page">
      {/* NAVBAR */}
      <AdminNavbar />

      {/* CONTENU PAGE */}
      <div className="app-container">
        <div className="app-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ margin: 0 }}>Gestion des Corges</h2>
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total : {corges.length}</span>
          </div>

          <Button variant="primary" className="mb-3" onClick={openAddModal}>
            Ajouter un corge
          </Button>

          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Libelle</th>
                <th>Abrv Libelle</th>
                <th>Armee</th>
                <th>Garnizon</th>
                <th>Brigade</th>
                <th>Region</th>
                <th>Corge Soutient</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {corges.length > 0 ? (
                corges.map((corge) => (
                  <tr key={corge.id}>
                    <td>{corge.id}</td>
                    <td>{corge.libelle}</td>
                    <td>{corge.abrv_libelle}</td>
                    <td>{getDisplayValue('id_arme', corge.id_arme)}</td>
                    <td>{getDisplayValue('id_garnizon', corge.id_garnizon)}</td>
                    <td>{getDisplayValue('id_brigade', corge.id_brigade)}</td>
                    <td>{getDisplayValue('id_region', corge.id_region)}</td>
                    <td>{getDisplayValue('id_corge_soutient', corge.id_corge_soutient)}</td>
                    <td>{formatDateTime(corge.createdAt)}</td>
                    <td>{formatDateTime(corge.updatedAt)}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => openEditModal(corge)}
                      >
                        Éditer
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(corge.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    Aucun corge
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editingCorge ? 'Éditer Corge' : 'Ajouter Corge'}
              </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Libelle</Form.Label>
                  <Form.Control
                    type="text"
                    name="libelle"
                    value={form.libelle}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Abrv Libelle</Form.Label>
                  <Form.Control
                    type="text"
                    name="abrv_libelle"
                    value={form.abrv_libelle}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Armee</Form.Label>
                  <Form.Select
                    name="id_arme"
                    value={form.id_arme}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Armee</option>
                    {armees.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.libelle}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Garnizon</Form.Label>
                  <Form.Select
                    name="id_garnizon"
                    value={form.id_garnizon}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Garnizon</option>
                    {garnizons.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.libelle}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Brigade</Form.Label>
                  <Form.Select
                    name="id_brigade"
                    value={form.id_brigade}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Brigade</option>
                    {brigades.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.libelle}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Region</Form.Label>
                  <Form.Select
                    name="id_region"
                    value={form.id_region}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.libelle}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Corge Soutient</Form.Label>
                  <Form.Select
                    name="id_corge_soutient"
                    value={form.id_corge_soutient}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Corge Soutient</option>
                    {allCorges.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.libelle}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Annuler
                </Button>
                <Button variant="primary" type="submit">
                  {editingCorge ? 'Mettre à jour' : 'Ajouter'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
