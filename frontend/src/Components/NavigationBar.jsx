import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default function NavigationBar({ username, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to="/" className="navbar-brand">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/Tata_Tamo_Racemo.jpg"
          width="25"
          height="25"
          alt="logo"
        />
      </Link>
      <Navbar.Toggle aria-controls="nav" />
      <Navbar.Collapse id="nav">
        <Nav className="me-auto">
          <Link to="/add" className="nav-link">
            Ajouter Voiture
          </Link>
          <Link to="/list" className="nav-link">
            Liste Voitures
          </Link>
          <Link to="/ai" className="nav-link">
            Assistant IA
          </Link>
        </Nav>
        <Nav>
          {username ? (
            <>
              <Navbar.Text className="text-light me-3">{username}</Navbar.Text>
              <Nav.Link onClick={onLogout}>Déconnexion</Nav.Link>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Connexion
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
