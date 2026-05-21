import React from 'react';
import { Alert, Container } from 'react-bootstrap';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Container className="mt-4">
          <Alert variant="danger">
            <Alert.Heading>Erreur interface</Alert.Heading>
            <p>{this.state.error.message}</p>
            <p className="mb-0 small">
              Essayez Ctrl+F5 ou videz le cache. Si le problème persiste :{' '}
              <code>docker compose up --build</code>
            </p>
          </Alert>
        </Container>
      );
    }
    return this.props.children;
  }
}
