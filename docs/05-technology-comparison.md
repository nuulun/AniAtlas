# 5. Technology Comparison

Each decision is evaluated against requirements from [Section 6](06-requirements.md) and the team's skills. Scores are on a 1–5 scale; the selected option is in **bold**.

## 5.1 Server platform

| Criterion (weight) | **Java 21 + Spring Boot 3** | Go + Gin | Node.js + NestJS |
|---|---|---|---|
| Team experience (×3) | 5 — both members studied Java and design patterns | 3 — some Go experience | 2 |
| Ecosystem for REST, security, ORM, scheduling (×3) | 5 — Spring Web, Security, Data JPA, `@Scheduled` | 3 — separate libraries for each | 4 |
| Support for modular architecture (×2) | 5 | 4 | 4 |
| Performance (×1) | 4 | 5 | 3 |
| **Weighted total** | **44** | 31 | 29 |

**Decision:** Spring Boot. Authentication and role-based access (NFR-2), scheduled YouTube synchronisation (FR-14) and the relational data model (FR-1, FR-2) are all covered by mature Spring modules, and the team already knows Java.

## 5.2 Data storage

| Criterion (weight) | **PostgreSQL 16** | MySQL 8 | MongoDB 7 |
|---|---|---|---|
| Fit for a relational model with many-to-many links (×3) | 5 | 5 | 2 — embedded documents complicate joins |
| Built-in full-text search (×2) | 5 — `tsvector`, GIN indexes | 3 | 4 |
| Array/JSON support for genre vectors and API payloads (×2) | 5 — arrays, JSONB | 3 | 5 |
| Team experience (×1) | 4 | 4 | 4 — Advanced Databases (NoSQL) course |
| **Weighted total** | **39** | 31 | 28 |

**Decision:** PostgreSQL. Catalogue search (FR-4, NFR-1) runs on built-in full-text indexes without an extra search engine.

**Cache:** Spring Cache (Caffeine) is used in the MVP. Redis is considered if several backend instances are deployed.

## 5.3 Component interaction

| Criterion (weight) | **REST (JSON over HTTP)** | GraphQL | gRPC |
|---|---|---|---|
| Browser support without proxies (×3) | 5 | 5 | 2 — needs gRPC-Web |
| Simplicity and tooling (OpenAPI, Swagger UI) (×2) | 5 | 3 | 3 |
| Flexible queries for the comparison page (×1) | 3 | 5 | 3 |
| Team experience (×2) | 5 | 2 | 2 |
| **Weighted total** | **38** | 30 | 19 |

**Decision:** REST with an OpenAPI specification. The backend modules communicate in-process in the MVP. If they are split into separate services later, REST stays the protocol.

## 5.4 Frontend

| Criterion (weight) | Vanilla HTML/CSS/JS | **React + Vite** | Thymeleaf (server-side) |
|---|---|---|---|
| Interactive filtering without page reloads (×3) | 3 | 5 | 2 |
| Reusable components: cards, player, filters (×2) | 2 | 5 | 3 |
| Team experience (×2) | 5 | 3 | 3 |
| Separation from the backend (×1) | 5 | 5 | 1 |
| **Weighted total** | 28 | **36** | 19 |

**Decision:** the whole frontend is built with React and Vite. A single-page application gives instant filtering without page reloads (FR-5), and reusable components (title card, filter panel, YouTube player wrapper, rating widget) keep the five main screens consistent.

| Concern | Library |
|---|---|
| Build and dev server | Vite |
| Routing (catalogue, title, compare, profile, submit, moderation) | React Router |
| Server state and caching of API calls | TanStack Query |
| YouTube playback | Wrapper component over the IFrame Player API |
| Forms and validation (sign-up, submission) | React Hook Form |
| Unit and component tests | Vitest + React Testing Library |

## 5.5 Recommendation method

| Criterion | **Content-based (genre/tag vectors)** | Collaborative filtering | Hybrid / neural |
|---|---|---|---|
| Works with few users (cold start) [5] | ✅ | ❌ | ◐ |
| Treats new and unpopular titles fairly [6] | ✅ | ❌ popularity bias | ◐ |
| Explainable to the user ("because you like Horror") | ✅ | ◐ | ❌ |
| Implementation effort | Low | Medium | High |

**Decision:** content-based filtering in the MVP. Collaborative signals are added as a hybrid if enough ratings are collected (future work).

## 5.6 Other choices

| Area | Choice | Alternatives considered | Reason |
|---|---|---|---|
| Video playback | YouTube IFrame Player API | Downloading or re-hosting video | Legal compliance (NFR-6); views stay with the author |
| Metadata source | YouTube Data API v3 | Web scraping | Officially supported, within ToS, quota-managed |
| Migrations | Flyway | Liquibase, Hibernate `ddl-auto` | Versioned SQL scripts, simple |
| Deployment | Docker Compose | Kubernetes, bare metal | Sufficient for an MVP; one-command start (NFR-4) |
| CI | GitHub Actions | GitLab CI, Jenkins | Repository is on GitHub |
