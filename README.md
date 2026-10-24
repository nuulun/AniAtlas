# AniAtlas

**A platform for the discovery and cataloguing of independent web animation**

AniAtlas aggregates animated web series, films and shorts that independent creators publish on open platforms such as YouTube. Viewers can search them by genre and tags, compare and rate them, track what they watch, get recommendations based on their genre preferences, and watch episodes through the official YouTube embed player.

Diploma project · Astana IT University · Software Engineering · 2026–2027

## Problem

Independent animation reaches large audiences on YouTube. For example, the pilot of *The Amazing Digital Circus* has more than 350 million views. Even so, there is no specialised place to discover this kind of content:

- YouTube has no structured metadata such as genre, format, status or episode order, and its recommender favours already-popular videos.
- Catalogue sites either exclude Western independent animation (MyAnimeList) or mix it with millions of films and TV shows (IMDb).

See [Project proposal](docs/01-project-proposal.md) and [Evidence of relevance](docs/02-evidence-of-relevance.md).

## Target users

- **Viewers** looking for new animated series beyond mainstream streaming services.
- **Independent authors** who want their work to be found.
- **Moderators** who keep the catalogue accurate.

## Expected outcomes

- An MVP web platform (frontend, backend, PostgreSQL) started with one `docker compose up`.
- A catalogue of at least 50 real independent titles imported via the YouTube Data API.
- Content-based recommendations evaluated against a popularity baseline.

## Team

| Member | Group | Role | Responsibilities |
|---|---|---|---|
| Nurlan Bekov | SE-2406 | Frontend developer, co-architect | Literature review, requirements, use case and context diagrams, UI prototype, React client |
| Madiyar Armish | SE-2420 | Backend developer, SRE/DevOps | Proposal and scope, system and technology comparison, component diagram, data model, Spring Boot API, YouTube integration, Docker/CI |

**Supervisor:** Akbota Rakym

## Scope

**MVP:** catalogue with search and filters, embed playback, accounts, ratings, reviews, lists, comparison, playlist import with moderation, genre-based recommendations.
**Out of scope:** video hosting, sources other than YouTube, mobile apps.

## Current status

**Defense 1 / probationary period 1 (tag `prob-period-1`), 24 October 2026.**

| Deliverable | Status |
|---|---|
| Proposal, literature review, system and technology comparison | Done |
| User interviews (3 viewers), findings and requirement changes | Done; more interviews planned |
| Requirements with priorities, acceptance criteria and traceability | Done |
| System context, use case, component diagrams and data model | Done (component diagram is a draft) |
| Clickable React prototype | Done; usability test planned |
| Verification plan | Done; all automated tests planned, none executed yet |
| Supervisor feedback log | Done, see [Section 11](docs/11-supervisor-feedback.md) |
| Backend and frontend skeleton, Docker, CI | Not started; planned for pre-defense 2 |

## Technologies

Java 21 · Spring Boot 3 · PostgreSQL 16 · Flyway · React + Vite (React Router, TanStack Query) · YouTube Data API v3 · YouTube IFrame Player API · Docker Compose · GitHub Actions. The choices are justified in [Technology comparison](docs/05-technology-comparison.md).

## Links

- **YouTrack:** https://aniatlas.youtrack.cloud/issues/ANI
- **Prototype (React):** [prototype/](prototype), run with `cd prototype && npm install && npm run dev`
- **Consolidated report (PDF):** [docs/report/SE-2406_Bekov_ProbPeriod1.pdf](docs/report/SE-2406_Bekov_ProbPeriod1.pdf)
- **Documentation:**

| # | Section |
|---|---|
| 1 | [Project proposal](docs/01-project-proposal.md) |
| 2 | [Evidence of relevance](docs/02-evidence-of-relevance.md) |
| 3 | [Literature review](docs/03-literature-review.md) |
| 4 | [Existing system comparison](docs/04-existing-systems.md) |
| 5 | [Technology comparison](docs/05-technology-comparison.md) |
| 6 | [Requirements specification](docs/06-requirements.md) |
| 7 | [Architecture and diagrams](docs/07-architecture.md) · [API draft](docs/api.md) |
| 8 | [UX / prototype](docs/08-ux-prototype.md) |
| 9 | [Verification and evaluation plan](docs/09-verification-plan.md) |
| 10 | [Project management and risks](docs/10-project-management.md) |
| 11 | [Supervisor feedback](docs/11-supervisor-feedback.md) |

## Repository structure

```
backend/            Spring Boot service              (stage 2)
frontend/           React client                     (stage 2)
tests/              automated tests, evaluation data (stage 2+)
docs/               sections 1–11 of the documentation
diagrams/src/       editable diagram sources (.mmd Mermaid, .dot Graphviz)
diagrams/export/    PNG/SVG exports
prototype/          clickable React prototype (Vite)
.env.example        configuration template (no real secrets)
```

## Setup, run and test

Instructions will be added with the first runnable code (stage 2). Planned:

```bash
cp .env.example .env      # fill in YOUTUBE_API_KEY etc.
docker compose up --build
./backend/mvnw test
```

## Contribution workflow

YouTrack task `ANI-n` → branch `ANI-n-short-name` → commits `ANI-n: …` → Pull Request reviewed by the other member → merge into `main`. Every stage submission is tagged, and tags are never moved after submission.

## Legal note

AniAtlas does not host, download or re-upload video. Playback uses the official YouTube embed player under the YouTube Terms of Service. All rights to the content belong to its authors.
