import React, { Component } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = { voitures: [], error: '', loading: true };
  }

  componentDidMount() {
    this.loadVoitures();
  }

  loadVoitures = () => {
    this.setState({ loading: true, error: '' });
    api
      .get('/voitures')
      .then((res) => this.setState({ voitures: res.data, loading: false }))
      .catch(() =>
        this.setState({
          error: 'Impossible de charger les voitures. Connectez-vous d\'abord.',
          loading: false,
        })
      );
  };

  deleteVoiture = (voitureId) => {
    if (!window.confirm('Supprimer cette voiture ?')) return;
    api
      .delete(`/voitures/${voitureId}`)
      .then(() => {
        alert('Voiture supprimée avec succès.');
        this.loadVoitures();
      })
      .catch(() => alert('Erreur lors de la suppression.'));
  };

  render() {
    const { voitures, error, loading } = this.state;
    const marginTop = { marginTop: '20px' };

    return (
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <h2 className="text-white">Liste des Voitures</h2>
            {error && <Alert variant="warning">{error}</Alert>}
            {loading && <p className="text-white">Chargement...</p>}
            <Row>
              {voitures.map((v) => (
                <Col key={v.id} md={4} className="mb-3">
                  <Card bg="dark" text="white">
                    <Card.Body>
                      <Card.Title>
                        {v.marque} {v.modele}
                      </Card.Title>
                      <Card.Text>
                        Couleur : {v.couleur}
                        <br />
                        Immat. : {v.immatricule}
                        <br />
                        Année : {v.annee} — Prix : {v.prix} MAD
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link to={`/edit/${v.id}`} className="btn btn-primary btn-sm me-2">
                        Modifier
                      </Link>
                      <Button variant="danger" size="sm" onClick={() => this.deleteVoiture(v.id)}>
                        Supprimer
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
