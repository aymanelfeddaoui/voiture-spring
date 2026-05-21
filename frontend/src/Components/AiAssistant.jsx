import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { api } from '../api/client';

export default function AiAssistant() {
  const [message, setMessage] = useState('Quelle voiture recommandez-vous pour un budget de 100000 MAD ?');
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const recommendLocal = async () => {
    setLoading(true);
    setError('');
    setReply('');
    try {
      const { data } = await api.get('/api/ai/recommend?budgetMax=100000');
      const list = (data.modeles || []).join(', ') || 'aucun modèle dans ce budget';
      setReply(`Recommandation locale (sans Claude) pour ≤ ${data.budgetMax} MAD : ${list}`);
    } catch {
      setError('Impossible de charger la recommandation locale.');
    } finally {
      setLoading(false);
    }
  };

  const send = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReply('');
    try {
      const { data } = await api.post('/api/ai/chat', { message });
      setReply(data.reply);
    } catch (err) {
      const data = err.response?.data;
      const msg = data?.error || 'Assistant IA indisponible.';
      const detail = data?.detail ? `\n\nDétail : ${data.detail}` : '';
      setError(msg + detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col md={8}>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title>Assistant IA — Spring AI (Anthropic)</Card.Title>
              <Form onSubmit={send}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mb-3"
                />
                <Button type="submit" variant="info" disabled={loading} className="me-2">
                  {loading ? 'Réflexion...' : 'Demander (Claude)'}
                </Button>
                <Button type="button" variant="secondary" disabled={loading} onClick={recommendLocal}>
                  Recommandation locale
                </Button>
              </Form>
              {error && <Alert variant="warning" className="mt-3">{error}</Alert>}
              {reply && (
                <Alert variant="success" className="mt-3">
                  {reply}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
