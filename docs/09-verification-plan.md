# 9. Verification and Evaluation Plan

The project aim (Section 1.3) is achieved if: (a) every *Must* requirement passes its acceptance criterion, (b) the recommender outperforms a baseline, and (c) users can complete the key scenarios.

## 9.1 Testing plan

| Level | What | Tools | When | Pass condition |
|---|---|---|---|---|
| Unit | Services: search query builder, profile builder, similarity ranking, playlist URL parser | JUnit 5, Mockito | Every PR (CI) | All pass; backend line coverage ≥ 60% (JaCoCo) |
| Component | React components: filters, title card, rating widget, player wrapper | Vitest, React Testing Library | Every PR (CI) | All pass |
| Integration | REST endpoints with a real database | Spring Boot Test, Testcontainers (PostgreSQL) | Every PR (CI) | All acceptance tests for FR-1…FR-19 pass |
| External API | YouTube client against recorded responses | WireMock | Every PR | Import works on recorded playlists; quota counter correct |
| End-to-end | Key scenarios in the browser | Playwright | Before each pre-defense | UC-1, UC-3, UC-5, UC-6, UC-8, UC-10 pass |
| Performance | Search and filter under load | k6 | Stage 6 | p95 < 500 ms, 10,000 titles, 20 virtual users (NFR-1) |
| Security | Role checks, dependency and baseline scan | Integration tests, OWASP ZAP baseline | Stage 6 | No high-risk findings (NFR-2) |
| Usability | Moderated user test | SUS questionnaire, task success | Stage 6 | SUS ≥ 70; ≥ 80% task success (NFR-5) |

Test IDs map to requirement groups: T-CAT (FR-1…6), T-PLAY (FR-7, 8), T-USR (FR-9…12), T-AGG (FR-13…15, 19), T-REC (FR-16…18).

## 9.2 Outcome metrics

| Aim component | Metric | Target |
|---|---|---|
| Catalogue completeness | Number of real independent titles imported | ≥ 50 titles, ≥ 300 episodes |
| Search quality | Precision@5 for 20 predefined queries (relevance judged by both team members) | ≥ 0.8 |
| Recommendation accuracy | Precision@10, nDCG@10 (offline) [7] | Higher than the popularity baseline |
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
