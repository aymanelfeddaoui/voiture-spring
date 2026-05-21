import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { api } from '../api/client';

export default function AiAssistant() {
  const [message, setMessage] = useState('Quelle voiture recommandez-vous pour un budget de 100000 MAD ?');
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReply('');
    try {
      const { data } = await api.post('/api/ai/chat', { message });
      setReply(data.reply);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Assistant IA indisponible. Définissez ANTHROPIC_API_KEY dans le fichier .env'
      );
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
                <Button type="submit" variant="info" disabled={loading}>
                  {loading ? 'Réflexion...' : 'Demander'}
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
