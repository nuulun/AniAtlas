# 10. Project Management and Risks

## 10.1 Tools and workflow

- **Repository:** https://github.com/nuulun/AniAtlas. `main` is the reviewed baseline.
- **Task tracking:** YouTrack project `AniAtlas` (prefix ANI): https://aniatlas.youtrack.cloud/issues/ANI. Each task has an assignee, priority, due date, expected outcome and acceptance criteria.
- **Workflow:**
  1. Create a YouTrack task.
  2. Create a branch `ANI-<n>-short-name`.
  3. Make commits whose messages start with `ANI-<n>:`.
  4. Open a Pull Request that references the task and describes how the change was checked.
  5. The other team member reviews the PR.
  6. Merge, add the PR link to the task, and move the task to Done.
- **Tags:** one tag for each submitted stage (`prob-period-1`, then `pre-defense-1`, `pre-defense-2`, `final-pre-defense`). Tags are never moved after submission.
- **Meetings:** weekly team sync; meetings with the supervisor every two weeks.

## 10.2 Allocation of responsibilities

| Area | Nurlan Bekov | Madiyar Armish |
|---|---|---|
| Analysis | Literature review, requirements | Project proposal and scope, existing system comparison |
| Design | System context and use case diagrams, UI prototype | Technology comparison, component diagram, ER model, API |
| Implementation | Frontend (React), player, search UI, recommendations UI | Backend (Spring Boot), database, YouTube integration, recommender service, Docker, CI |
| Quality | E2E tests, user test (SUS) | Unit/integration tests, load test, offline evaluation |
| Shared | Interviews (2+ each), mutual PR reviews, thesis chapters for own areas |

## 10.3 Milestones

| # | Milestone | Main deliverables | Due |
|---|---|---|---|
| M1 | Probationary period 1 (`prob-period-1`) | Sections 1–11 of this documentation, prototype, YouTrack | 24.10.2026 |
| M2 | Backend and frontend skeleton | Spring Boot + PostgreSQL + Flyway, React app, Docker Compose, CI | mid-Nov 2026 |
| M3 | Catalogue MVP | CRUD, search, filters, title page, embed player | early Dec 2026 |
| M4 | Pre-defense 1 | Accounts, ratings, lists, YouTube import, moderation | Dec 2026 (planned, aligned with the official schedule when published) |
| M5 | Recommendations | Profile, ranking, cold start, offline evaluation | Feb 2027 (planned) |
| M6 | Testing and evaluation | Load, security, user test | Mar 2027 (planned) |
| M7 | Final pre-defense and defence | Thesis, deployment, presentation | Apr–May 2027 (planned) |

## 10.4 Dependencies

| Dependency | Type | Affects | Mitigation |
|---|---|---|---|
| YouTube Data API key and quota | External | FR-13, FR-14 | Request a key early; cache responses; WireMock in tests |
| YouTube embed allowed by uploader | External | FR-7 | Detect non-embeddable videos (`status.embeddable`) and link to YouTube instead |
| Interview respondents and test users | People | Section 2, user test | Recruit from student groups and animation communities early |
| Ratings data for evaluation | Data | FR-17 evaluation | Rating session with ≥ 20 participants |
| Backend API → Frontend | Internal | M3 | Agree on the OpenAPI contract first; frontend uses mock data until endpoints are ready |
| Catalogue → Recommendations | Internal | M5 | Seed catalogue by M3 |

## 10.5 Risks

| ID | Risk | Probability | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | YouTube API quota exhausted or terms change | Medium | High | Caching, batch requests (50 IDs per call), incremental sync, quota monitoring | Madiyar |
| R2 | Videos removed or made non-embeddable | High | Medium | Availability checks in sync job; "unavailable" state | Madiyar |
| R3 | Too few ratings for meaningful evaluation | Medium | High | Organise rating session early; content-based method does not need many users | Both |
| R4 | Uneven workload in a team of two | Medium | Medium | Balanced task allocation; weekly sync; YouTrack board review | Both |
| R5 | Scope creep (extra sources, social features) | Medium | Medium | MoSCoW priorities; *Won't* items stay out | Both |
| R6 | Copyright or ToS concerns | Low | High | Only official embeds; no downloads; legal note in README | Both |
| R7 | Exam period reduces available time | High | Medium | Buffer before pre-defenses; prioritise *Must* requirements | Both |
