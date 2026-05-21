import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavigationBar({ username, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/images/logo-voiture.jpg"
            height="40"
            alt="ENSIAS — Voiture Shop"
            className="d-inline-block me-2"
            style={{ objectFit: 'contain' }}
          />
          <span>Voiture Shop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add">
              Ajouter Voiture
            </Nav.Link>
            <Nav.Link as={Link} to="/list">
              Liste Voitures
            </Nav.Link>
            <Nav.Link as={Link} to="/ai">
              Assistant IA
            </Nav.Link>
          </Nav>
          <Nav>
            {username ? (
              <>
                <span className="navbar-text text-light me-3">{username}</span>
                <Nav.Link onClick={onLogout}>Déconnexion</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Connexion
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
