# Magasin de Voitures — Atelier Full Stack ENSIAS

Projet Spring Boot + React conforme à l'atelier (Voiture / Propriétaire, REST, Spring Data REST, Swagger, tests JPA), avec **JWT**, **Spring AI (Anthropic)** et **Docker Compose**.

## Démarrage rapide (professeur / correcteur)

```bash
# 1. Copier les variables d'environnement
cp .env.example .env

# 2. Assistant IA : clé Anthropic avec crédits actifs
# Éditer .env : ANTHROPIC_API_KEY=votre_cle_anthropic
# Compte sans crédits → message « credit balance is too low » sur /api/ai/chat

# 3. Lancer toute la stack
docker compose up --build
```

| Service   | URL |
|-----------|-----|
| Frontend  | http://localhost:3000 |
| Backend   | http://localhost:8080 |
| Swagger   | http://localhost:8080/swagger-ui.html |
| API HAL   | http://localhost:8080/api |

### Comptes de démo (JWT)

| Utilisateur | Mot de passe |
|-------------|--------------|
| `user`      | `password`   |
| `admin`     | `admin`      |

1. Ouvrir http://localhost:3000 → page d'accueil (si écran gris vide : **Ctrl+F5**)
2. Cliquer **Connexion** → `user` / `password`
3. Accéder à **Liste Voitures**, **Ajouter**, **Assistant IA**

### Pages backend

| URL | Comportement |
|-----|----------------|
| http://localhost:8080/ | JSON d'accueil (public) |
| http://localhost:8080/swagger-ui.html | Swagger — cliquer **Authorize** |
| http://localhost:8080/api | HAL public en **GET** (atelier) |
| http://localhost:8080/voitures | Public en **GET** ; POST/PUT/DELETE → JWT |

**Swagger + JWT :**
1. `POST /api/auth/login` avec `{"username":"user","password":"password"}`
2. Copier le `token` de la réponse
3. **Authorize** → coller le token (sans le mot « Bearer »)
4. Tester `GET /voitures`

## Architecture

```
voiture-spring/
├── backend/          # Spring Boot 3 — org.cours
├── frontend/         # React + Vite + Bootstrap
├── docker-compose.yml
└── .env.example
```

### Backend

- Entités `Voiture` / `Proprietaire` (relation ManyToOne)
- `VoitureController` → `/voitures`
- Spring Data REST → `/api/voitures` (+ recherche `findByCouleur`, etc.)
- Spring Security + **JWT** (`POST /api/auth/login`)
- **Spring AI** → `POST /api/ai/chat` (si `ANTHROPIC_API_KEY` est définie)
- MariaDB via Docker

### Frontend

- React Router : `/`, `/list`, `/add`, `/edit/:id`, `/ai`, `/login`
- Axios avec token Bearer

## Sécurité — clé API

**Ne jamais committer** `.env` ni une clé API dans le dépôt GitHub. Utilisez uniquement `.env.example` comme modèle.

## Tests Maven (backend)

```bash
cd backend
mvn test
```

## GitHub

```bash
git init
git add .
git commit -m "Atelier full stack voitures — Spring Boot, React, Docker, JWT, Spring AI"
git remote add origin https://github.com/VOTRE_USER/voiture-spring.git
git push -u origin main
```

## Arrêt

```bash
docker compose down
```
