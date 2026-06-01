# ✅ CHANGELOG.md

# Changelog
Tous les changements notables de ce projet seront documentés ici.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/), et ce projet suit le versionnement sémantique [SemVer](https://semver.org/).

---

## [1.0.0] - 2026-06-01
### Added
- CRUD complet pour le modèle `Product`
- Architecture modulaire (routes, contrôleurs, services, repository)
- Validation des données et gestion d’erreurs centralisée
- Tests unitaires (repository, service, validation)
- Tests d’intégration (toutes les routes HTTP)
- Documentation OpenAPI (`openapi.yaml`)
- Documentation HTML statique générée avec Redoc (`docs.html`)
- Routes statiques `/openapi` et `/docs`
- Dockerfile (Node 24)
- Réorganisation du routeur (séparation routes produits / routes statiques)

### Changed
- Nettoyage et refactorisation du routeur principal
- Amélioration de la structure du projet

### Fixed
- Correction du DELETE 204 (pas de body)
- Correction des erreurs liées à Redoc (`yaml` manquant)

---

## [Unreleased]
### Planned
- Pagination (`page`, `limit`)
- Filtres (`minPrice`, `maxPrice`, `inStock`)
- Ajout d’une base SQLite
- docker-compose
- Multi-stage build pour production
