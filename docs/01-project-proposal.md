# 1. Project Proposal

| | |
|---|---|
| **Project title** | AniAtlas — a platform for the discovery and cataloguing of independent web animation |
| **Team** | Nurlan Bekov (SE-2406) — frontend, co-architect<br>Madiyar Armish (SE-2420) — backend, SRE/DevOps |
| **Supervisor** | Akbota Tursynkulova |
| **Programme** | Software Engineering, Astana IT University |

## 1.1 Problem statement

Independent creators increasingly publish animated series, films and shorts directly on open platforms, above all YouTube, instead of going through studios and premium streaming services. Some of these works reach very large audiences: the pilot of *The Amazing Digital Circus* (GLITCH) passed 350 million views on YouTube [S2], and the pilot of *Hazbin Hotel* (2019) was later followed by a full series on Amazon Prime Video in 2024 [S4]. Most independent projects, however, stay small and hard to find.

On YouTube these works sit among all other kinds of video. There is no structured metadata such as genre, format, release status or episode order. Discovery depends on a general recommendation algorithm that favours already-popular content [6, 9]. Existing catalogue sites either do not accept independent Western web animation (MyAnimeList only lists professionally produced Asian animation, see [Section 4](04-existing-systems.md)), or treat it as one item among millions of films and TV shows (IMDb).

**As a result, there is no single specialised place where viewers can find, compare, rate and track independent animated web series, and where their authors can be found by an interested audience.**

## 1.2 Target users

| Group | Description |
|---|---|
| Viewers | Teenagers and young adults who watch animation online and look for new series beyond mainstream streaming services |
| Independent authors and studios | Creators who publish animation on YouTube and want structured visibility for their work |
| Moderators | Platform staff who keep the catalogue accurate |

## 1.3 Aim

To design and develop a web platform that aggregates independent animated web content published on open platforms and lets users discover, compare, rate, track and watch it, with personalised recommendations based on genre preferences.

## 1.4 Objectives

1. Analyse user needs and existing systems, and specify verifiable requirements.
2. Design the data model, architecture and REST API of the platform.
3. Implement the catalogue with search and multi-criteria filtering by genre, tags, format and status.
4. Integrate the YouTube Data API v3 to import series metadata from playlists and channels.
5. Provide playback through the official YouTube embed player, without re-hosting video.
6. Implement user accounts, ratings, reviews, personal watch lists and title comparison.
7. Implement a content-based recommendation service using genre preferences, with a cold-start strategy.
8. Containerise the system with Docker and evaluate it against the verification plan.

## 1.5 Expected outcomes

- A working MVP web platform (frontend, backend, database) deployable with one `docker compose up`.
- A catalogue seeded with at least 50 real independent animated titles.
- A recommendation module with measured quality compared to a popularity baseline.
- Project documentation: requirements, architecture, test results and the diploma thesis.

## 1.6 Scope

**In scope (MVP):** YouTube as the only source; web interface; catalogue, search and filters; embed playback; accounts, ratings, reviews, lists, comparison; moderator approval of submissions; content-based recommendations.

**Out of scope:** hosting or downloading video; other sources such as Vimeo or Bilibili (future work); native mobile apps; monetisation and payments; large-scale production deployment.

## 1.7 Engineering complexity

- A relational data model with many-to-many relationships (titles, genres, tags, authors) and full-text search.
- Integration with an external API under a strict daily quota of 10,000 units [S5], which requires caching and scheduled synchronisation.
- Detecting videos that become unavailable on YouTube.
- A recommendation algorithm and its offline evaluation (precision@k, coverage) against a baseline.
- Authentication and role-based access control, a modular backend, and containerised deployment with CI.

References: [Section 3 — Literature review](03-literature-review.md#references).
