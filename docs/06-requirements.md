# 6. Requirements Specification

Priorities use the MoSCoW scheme:

- **M** — Must: required for the MVP.
- **S** — Should: important.
- **C** — Could: if time allows.
- **W** — Won't in this version.

Every *Must* requirement has an acceptance criterion that can be checked by a test or a demonstration. The "Source" column links each requirement to evidence ([Section 2](02-evidence-of-relevance.md)) or literature ([Section 3](03-literature-review.md)).

## 6.1 Actors

- **Guest**: unauthenticated visitor.
- **Viewer**: registered user.
- **Author**: creator who submits titles.
- **Moderator**: approves content and manages reference data.
- **YouTube**: external system that provides the Data API and the embed player.

## 6.2 Functional requirements

| ID | Requirement | Priority | Acceptance criterion | Source |
|---|---|---|---|---|
| FR-1 | The system stores titles with name, description, poster, format (series/film/short), status (ongoing/completed/hiatus), release year, authors, genres and tags | M | A title created with all fields via API is returned unchanged by `GET /titles/{id}` | D5, A2 |
| FR-2 | A series consists of seasons and episodes; each episode references one YouTube video ID | M | A title with 2 seasons × 3 episodes is returned with correct order and video IDs | D1 |
| FR-3 | A title page shows metadata, the episode list, average rating and reviews | M | UI test: all elements are visible for a seeded title | — |
| FR-4 | Full-text search by title and author name | M | Searching "digital circus" returns *The Amazing Digital Circus* first in the seeded catalogue | A1 |
| FR-5 | Filtering by genres, tags, format, status and release year, combinable | M | Each filter and a combination of 3 filters return only matching titles (integration test on seed data) | A2 |
| FR-6 | Sorting by rating, date added and release year | S | The order of results matches the chosen key | — |
| FR-7 | Episodes are played through the official YouTube IFrame embed player | M | An episode plays on the title page; no video file is requested from AniAtlas servers (checked in browser network tab) | A3, NFR-6 |
| FR-8 | Episodes whose video is no longer available are marked as unavailable | S | After a video ID is made invalid, the sync job sets `available = false` and the UI shows a label | S6 |
| FR-9 | Registration and login with email and password | M | A user can register, log in and receive a JWT; invalid credentials return 401 | — |
| FR-10 | A viewer can rate a title (1–10) and write a review | M | The rating is saved; the average rating updates; a second rating by the same user replaces the first | A4 |
| FR-11 | A viewer keeps personal lists: watching, planned, completed, dropped, with last watched episode | M | Moving a title between lists is reflected in `GET /me/lists` | A4 |
| FR-12 | A viewer can compare 2–3 titles side by side | S | The comparison page shows genres, format, episode count, total duration and rating for each selected title | C7 |
| FR-13 | An author or moderator submits a title by YouTube playlist URL; metadata and episodes are imported automatically | M | Submitting a valid public playlist creates a PENDING title with all its videos as episodes; an invalid URL returns 400 | A6, S5 |
| FR-14 | A scheduled job refreshes metadata of published titles within the API quota | S | The job runs daily at 03:00 (cron set by `YOUTUBE_SYNC_CRON`), adds new episodes, marks removed videos and logs quota units used; daily usage stays below `YOUTUBE_DAILY_QUOTA_LIMIT` (9,000 units, a buffer under the 10,000 quota) | S5 |
| FR-15 | Submitted titles appear publicly only after moderator approval | M | A PENDING title is not returned to guests; after approval it is | — |
| FR-16 | The system builds a genre/tag preference profile from the user's ratings, lists and chosen genres | M | Unit test: profile vector matches the expected values for a fixed set of ratings | [1, 5] |
| FR-17 | The system recommends unseen titles ranked by similarity to the profile, with an explanation ("because you like …") | M | Recommendations exclude titles already in the user's lists; each item has an explanation; offline precision@10 is above the popularity baseline (Section 9) | [1, 6, 7] |
| FR-18 | New users choose at least 3 favourite genres at sign-up (cold start) | M | A new user with no ratings receives non-empty recommendations matching the chosen genres | [5] |
| FR-19 | The moderator manages genres and tags and can edit or reject titles | S | CRUD for genres/tags is available only to the MODERATOR role | — |
| FR-20 | Notifications about new episodes of titles in "watching" | C | — | A4 |
| FR-21 | Sources other than YouTube (Vimeo, Bilibili) | W | — | — |

## 6.3 Non-functional requirements

| ID | Category | Requirement | Priority | Acceptance criterion |
|---|---|---|---|---|
| NFR-1 | Performance | Catalogue search and filtering respond fast | M | p95 latency < 500 ms with 10,000 titles and 20 concurrent users (k6 load test) |
| NFR-2 | Security | Passwords are hashed; access is role-based | M | Passwords stored with BCrypt; endpoints for other roles return 403; OWASP ZAP baseline scan has no high-risk findings |
| NFR-3 | External API | YouTube API usage stays within the free quota | M | Quota counter in logs; < 10,000 units/day during a 7-day test run |
| NFR-4 | Portability | The system starts with one command | M | `docker compose up` on a clean machine starts all services; README instructions are enough |
| NFR-5 | Usability | Responsive interface | S | Key pages are usable at 375 px and 1440 px width; SUS score ≥ 70 in the user test |
| NFR-6 | Legal | No video is downloaded or re-hosted | M | Code review and network check: only YouTube embed URLs are used |
| NFR-7 | Maintainability | Automated tests | S | Backend line coverage ≥ 60%; CI runs tests on every pull request |
| NFR-8 | Privacy | Minimal personal data | M | Only email, username and password hash are stored; no secrets in the repository |

## 6.4 Traceability

| Requirement group | Use cases (Section 7) | Components (Section 7) | Tests (Section 9) |
|---|---|---|---|
| FR-1…FR-6 | UC-1 Search catalogue, UC-2 View title | Catalogue module | T-CAT |
| FR-7, FR-8 | UC-3 Watch episode | Frontend player, Aggregation module | T-PLAY |
| FR-9…FR-12 | UC-4…UC-7 | Users module | T-USR |
| FR-13…FR-15, FR-19 | UC-8 Submit title, UC-9 Moderate | Aggregation, Catalogue | T-AGG |
| FR-16…FR-18 | UC-10 Get recommendations | Recommendation module | T-REC, offline evaluation |
