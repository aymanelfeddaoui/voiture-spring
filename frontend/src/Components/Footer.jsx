import React from 'react';
import { Navbar, Container, Col } from 'react-bootstrap';

export default function Footer() {
  const fullYear = new Date().getFullYear();
  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Col lg={12} className="text-center text-muted">
          <div>
            {fullYear}-{fullYear + 1}, All Rights Reserved by Master MIOLA
          </div>
        </Col>
      </Container>
    </Navbar>
  );
}
