import React from 'react';
import { Jumbotron } from './Jumbotron';

export default function Bienvenue() {
  return (
    <Jumbotron className="bg-dark text-white text-center">
      <img
        src="/images/logo-voiture.jpg"
        alt="ENSIAS"
        height="120"
        className="mb-4"
        style={{ objectFit: 'contain', maxWidth: '100%' }}
      />
      <h1>Bienvenue au Magasin des Voitures</h1>
      <blockquote className="blockquote mb-0">
        <p>Le meilleur de nos voitures est exposé près de chez vous</p>
        <footer className="blockquote-footer text-light">Master MIOLA — ENSIAS</footer>
      </blockquote>
    </Jumbotron>
  );
}
