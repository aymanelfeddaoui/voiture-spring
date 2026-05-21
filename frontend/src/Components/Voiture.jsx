import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';

const empty = {
  marque: '',
  modele: '',
  couleur: '',
  immatricule: '',
  annee: new Date().getFullYear(),
  prix: 0,
};

export default function Voiture() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voiture, setVoiture] = useState({ ...empty });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      api
        .get(`/voitures/${id}`)
        .then((res) => setVoiture(res.data))
        .catch(() => setError('Voiture introuvable'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoiture((v) => ({
      ...v,
      [name]: name === 'annee' || name === 'prix' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (id) await api.put(`/voitures/${id}`, voiture);
      else await api.post('/voitures', voiture);
      alert(id ? 'Voiture mise à jour.' : 'Voiture ajoutée.');
      navigate('/list');
    } catch {
      setError('Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const marginTop = { marginTop: '20px' };

  return (
    <Container>
      <Row>
        <Col lg={8} style={marginTop}>
          <h2 className="text-white">{id ? 'Modifier' : 'Ajouter'} une Voiture</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} className="text-white">
            {['marque', 'modele', 'couleur', 'immatricule'].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field}</Form.Label>
                <Form.Control name={field} value={voiture[field]} onChange={handleChange} required />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Année</Form.Label>
              <Form.Control name="annee" type="number" value={voiture.annee} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix (MAD)</Form.Label>
              <Form.Control name="prix" type="number" value={voiture.prix} onChange={handleChange} />
            </Form.Group>
            <Button type="submit" variant="success" disabled={saving}>
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
