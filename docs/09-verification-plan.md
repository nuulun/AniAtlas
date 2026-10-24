# 9. Verification and Evaluation Plan

The project aim (Section 1.3) is demonstrated if: (a) every *Must* requirement passes its acceptance criterion, (b) the recommender is evaluated against the baselines in 9.4 and the results are reported whatever they show, and (c) users can complete the key scenarios.

**Status (24 Oct 2026).** No application code exists yet, so **all automated tests below are planned, none executed**. Executed so far: a manual walkthrough of the React prototype (all five screens, 1360 px and 390 px width, light and dark theme). Results of executed tests will be stored in `tests/results/` and listed in a separate "Executed" table from pre-defense 2 onwards.

## 9.1 Testing plan

| Level | What | Tools | When | Pass condition | Status |
|---|---|---|---|---|---|
| Unit | Services: search query builder, profile builder, similarity ranking, playlist URL parser | JUnit 5, Mockito | Every PR (CI) | All pass; backend line coverage ≥ 60% (JaCoCo) | Planned |
| Component | React components: filters, title card, rating widget, player wrapper | Vitest, React Testing Library | Every PR (CI) | All pass | Planned |
| Integration | REST endpoints with a real database | Spring Boot Test, Testcontainers (PostgreSQL) | Every PR (CI) | All acceptance tests for Must requirements pass (see traceability in 9.6) | Planned |
| External API | YouTube client against recorded responses | WireMock | Every PR | Import works on recorded playlists; quota counter correct | Planned |
| End-to-end | Key scenarios in the browser | Playwright | Before each pre-defense | UC-1, UC-3, UC-5, UC-6, UC-8, UC-10 pass | Planned |
| Performance | Search and filter under load | k6 | Stage 6 | p95 < 500 ms, 10,000 titles, 20 virtual users (NFR-1) | Planned |
| Security | Role checks, dependency and baseline scan | Integration tests, OWASP ZAP baseline | Stage 6 | No high-risk findings (NFR-2) | Planned |
| Usability | Moderated user test | SUS questionnaire, task success | Stage 6 | SUS ≥ 70; ≥ 80% task success (NFR-5) | Planned |

Test IDs map to requirement groups: T-CAT (FR-1…6), T-PLAY (FR-7, 8), T-USR (FR-9…12), T-AGG (FR-13…15, 19), T-REC (FR-16…18).

## 9.2 Outcome metrics

| Aim component | Metric | Target |
|---|---|---|
| Catalogue completeness | Number of real independent titles imported | ≥ 50 titles, ≥ 300 episodes |
| Search quality | Precision@5 for 20 predefined queries (relevance judged by both team members) | ≥ 0.8 |
| Recommendation accuracy | Precision@10, nDCG@10 (offline) [7] | Reported against the popularity and random baselines |
| Recommendation fairness | Catalogue coverage; share of long-tail titles in top-10 [6] | Coverage ≥ 40%; long-tail share higher than baseline |
| Performance | p95 latency of `/api/titles` | < 500 ms |
| API efficiency | YouTube quota units per day | < 10,000 |
| Usability | SUS score; task completion rate | ≥ 70; ≥ 80% |

## 9.3 Measurement conditions

- **Environment:** Docker Compose on one machine (record CPU and RAM in the report). PostgreSQL is seeded with real titles plus synthetic titles up to 10,000 for load tests.
- **Offline recommendation evaluation:** at least 20 participants (classmates and interview respondents) each rate at least 15 titles. For each user, 20% of their positive ratings (score ≥ 7) are hidden. The model must rank the hidden titles among the top 10. The evaluation is repeated over 5 random splits and the mean ± standard deviation is reported.
- **User test:** 5–8 participants who did not take part in development, 6 tasks each (find a horror short, watch an episode, rate a title, add it to a list, compare two titles, open recommendations). After the tasks they fill in the SUS questionnaire.
- All raw results are stored in `tests/results/`.

## 9.4 Baselines for comparison

| Component | Baseline | Why |
|---|---|---|
| Recommender | **Popularity**: top titles by number of ratings and views, excluding seen titles | The standard simple baseline [7]; it reflects how general platforms surface content [6, 14] |
| Recommender | **Random** among unseen titles | Lower bound |
| Discovery task | Finding the same titles via **YouTube search** | Shows the benefit of structured filters (task time and success compared in the user test) |

## 9.5 Evidence produced

The evidence consists of test reports from CI, a JaCoCo coverage report, k6 output, an offline evaluation notebook (`tests/recsys-eval/`), and SUS results. Together they are the basis for the "Results" chapter of the thesis.

## 9.6 Traceability: Must requirements → tests → evidence

| Requirement | Acceptance test (planned) | Evidence to be produced | Status |
|---|---|---|---|
| FR-1 Store titles | T-CAT-01: create title via API, read it back | CI test report | Planned |
| FR-2 Seasons and episodes | T-CAT-02: 2 seasons × 3 episodes returned in order | CI test report | Planned |
| FR-3 Title page | E2E-UC2: all page elements visible | Playwright report | Planned (prototype screen exists) |
| FR-4 Full-text search | T-CAT-03: known title ranked first | CI test report | Planned |
| FR-5 Combined filters | T-CAT-04: 3 filters return only matching titles | CI test report | Planned (prototype screen exists) |
| FR-7 Embed playback | E2E-UC3: episode plays; no video requests to backend | Playwright report + network log | Planned |
| FR-9 Registration and login | T-USR-01: register, login, 401 on bad password | CI test report | Planned |
| FR-10 Rating and review | T-USR-02: rating saved, average updated, re-rating replaces | CI test report | Planned |
| FR-11 Watch lists | T-USR-03: move title between lists | CI test report | Planned |
| FR-13 Playlist submission | T-AGG-01: valid playlist → PENDING title; invalid → 400 (WireMock) | CI test report | Planned |
| FR-15 Moderation | T-AGG-02: PENDING hidden from guests, visible after approval | CI test report | Planned |
| FR-16 Preference profile | T-REC-01: profile vector for fixed ratings | CI test report | Planned |
| FR-17 Recommendations | T-REC-02: seen titles excluded, explanation present; offline evaluation (9.3) | CI report + evaluation notebook | Planned |
| FR-18 Cold start | T-REC-03: new user with 3 genres gets recommendations | CI test report | Planned |
| NFR-1 Performance | k6 load test | k6 output | Planned |
| NFR-2 Security | Role tests (403), ZAP baseline | CI report, ZAP report | Planned |
| NFR-3 API quota | Quota counter in logs over 7 days | Log export | Planned |
| NFR-4 Portability | `docker compose up` on a clean machine | Screen recording | Planned |
| NFR-6 Legal | Code review: only embed URLs | PR review | Planned |
| NFR-8 Privacy | No secrets in repo; only email, username, password hash stored | `.gitignore`, schema review | Partly done (`.gitignore`, `.env.example`) |
