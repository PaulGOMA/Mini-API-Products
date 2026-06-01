# Mini API Products

API REST minimaliste écrite en **Node.js natif (sans framework)** permettant de gérer des produits.  
Le projet inclut :

- CRUD complet (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- Architecture modulaire (routes, contrôleurs, services, repository)
- Validation et gestion d’erreurs centralisées
- Tests unitaires + tests d’intégration (Vitest + Supertest)
- Documentation OpenAPI (`/openapi`)
- Documentation HTML statique générée avec Redoc (`/docs`)
- Dockerfile pour exécuter l’API dans un conteneur
- Support TypeScript complet

---

## 🚀 Installation

```bash
npm install
```

---

## ▶️ Lancer le serveur en développement

```bash
npm run dev
```

Le serveur démarre sur :

```
http://127.0.0.1:3000/
```

---

## 🧪 Tests

```bash
npm run test
```

Les tests couvrent :

- Repository In-Memory
- Service métier
- Validation
- Routes HTTP (intégration)

---

## 📘 Documentation API

### OpenAPI (YAML)
```
GET /openapi
```

### Documentation HTML (Redoc)
```
GET /docs
```

---

## 🐳 Exécuter avec Docker

### Construire l’image

```bash
docker build -t mini-api .
```

### Lancer le conteneur

```bash
docker run -p 3000:3000 mini-api
```

---

## 📁 Structure du projet

```
src/
 ├── controllers/
 ├── errors/
 ├── routes/
 │     ├── products.route.ts
 │     └── static.route.ts
 ├── services/
 ├── repositories/
 ├── models/
 ├── index.ts
 └── server.ts

docs/
 ├── openapi.yaml
 └── docs.html
```

---

## 🧱 Technologies utilisées

- Node.js 24
- TypeScript
- Vitest
- Supertest
- Redocly
- Docker

---

## 📌 Versionnement

Le projet suit le schéma **Semantic Versioning (SemVer)** :

```
MAJOR.MINOR.PATCH
```

---

## 📄 Licence

Projet personnel — libre d’utilisation pour l’apprentissage.


