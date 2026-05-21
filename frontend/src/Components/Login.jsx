import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/client';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(username, password);
      onLogin(data.username);
      navigate('/list');
    } catch {
      setError('Identifiants invalides. Essayez user/password ou admin/admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center" style={{ marginTop: '40px' }}>
        <Col md={6}>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title>Connexion JWT</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Utilisateur</Form.Label>
                  <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </Form>
              <p className="mt-3 text-muted small">Démo : user / password — admin / admin</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
