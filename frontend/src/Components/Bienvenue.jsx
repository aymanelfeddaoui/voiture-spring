import React from 'react';
import { Jumbotron } from './Jumbotron';

export default function Bienvenue() {
  return (
    <Jumbotron className="bg-dark text-white">
      <h1>Bienvenue au Magasin des Voitures</h1>
      <blockquote className="blockquote mb-0">
        <p>Le meilleur de nos voitures est exposé près de chez vous</p>
        <footer className="blockquote-footer">Master MIOLA — ENSIAS</footer>
      </blockquote>
    </Jumbotron>
  );
}
