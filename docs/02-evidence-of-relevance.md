# 2. Evidence of Relevance and User Interviews

This section separates **verified findings** (from available data and from interviews) from **assumptions** that still need checking.

## 2.1 Analysis of available data

| # | Finding | Source |
|---|---|---|
| D1 | The pilot of *The Amazing Digital Circus* (GLITCH, an independent studio) passed 350 million views on YouTube | YouTube Official Blog, 2024 [S2] (company blog, not peer-reviewed) |
| D2 | Videos related to the series on the GLITCH channel have more than 750 million views | YouTube Culture & Trends, 2024 [S1] (company blog) |
| D3 | *Hazbin Hotel* started as a self-published YouTube pilot (2019) and became a series on Amazon Prime Video (2024) | Amazon MGM Studios press release [S4] |
| D4 | MyAnimeList only lists professionally produced animation from Japan, China and Korea | MAL database guidelines, quoted on the MAL forum [S7] |
| D5 | General recommender systems tend to amplify already-popular items | Peer-reviewed survey [6]; empirical YouTube study (preprint) [14] |

## 2.2 User interviews

**Method.** Three semi-structured interviews with viewers, October 2026, 15–20 minutes each, conducted in Russian by the team. Respondents are anonymised as R1–R3; no names or contact details are stored. Notes are kept in `docs/interviews/`.

**Question guide**

1. How often do you watch animation, and where?
2. Do you watch independent animated series or shorts?
3. How did you find the last independent animated series you watched?
4. Do you look for such series? What makes finding and following them difficult?
5. Do you use IMDb, MyAnimeList, Letterboxd or similar services? What is missing there for web animation?
6. What do you consider when choosing what to watch?
7. Do you trust ratings and recommendations from other viewers?

**Respondents and key statements**

| | Profile | Key statements |
|---|---|---|
| R1 | Occasional viewer; prefers studio animation (Pixar), sometimes anime | Only independent title seen: *The Amazing Digital Circus*. Fan animations "find me" through YouTube recommendations or friends; "without algorithms or word of mouth I would hardly come across these works". Does not use tracking services. Chooses by friends' advice and popularity; would watch independent animation more often if it appeared in the information space. |
| R2 | Frequent viewer who draws inspiration from animation; watches mostly on YouTube | Independent animation is a favourite because of new ideas and styles. Found the last series by chance in YouTube recommendations because of interest in a related game. Large creators are easy to follow, but "good animation gets lost because of YouTube's recommendation algorithms". Rarely uses IMDb; does not trust other viewers' ratings; chooses by story and purpose of the work. |
| R3 | Rare viewer; YouTube and sometimes streaming services | Watches independent animation rarely because it "rarely comes into view". The last series was recommended by a friend. Independent series are scattered across platforms, have no advertising, and algorithms favour popular content. Irregular releases make it easy to miss new episodes. IMDb-like services lack new-episode information and many independent projects. Would like to follow a series, be notified about new episodes and see where to watch. Chooses by genre, theme, humour and visual style; trusts specific reviews from acquaintances; decides after the first episode. |

## 2.3 Findings

| Finding | Evidence | Effect on requirements |
|---|---|---|
| F1. Independent animation is found by chance, through the YouTube algorithm or friends | R1, R2, R3 | Confirms the core problem; dedicated catalogue (FR-1…FR-6) |
| F2. Small creators are hidden by popularity-driven recommendations | R2, R3; D5 | Content-based ranking with explanations (FR-16, FR-17); popularity used only as a baseline |
| F3. Following irregular releases is hard; new episodes are missed | R3 | Watch lists with progress (FR-11); **FR-20 notifications raised from Could to Should** |
| F4. Viewers choose by genre, theme, humour and visual style | R2, R3 | Genre and tag filters; tags and artwork visible on cards (FR-5) |
| F5. Generic ratings are trusted little; friends' advice and specific text reviews matter more | R1, R2, R3 | Text reviews (FR-10); "because you like …" explanations instead of a bare score |
| F6. Existing databases are not used for web animation | R1, R2, R3 | Confirms the gap in Section 4 |

## 2.4 Assumptions and their status

| # | Assumption | Status after interviews |
|---|---|---|
| A1 | Viewers find it hard to discover independent animated series | **Confirmed** (3/3) |
| A2 | Viewers want to filter by genre, tags and format | **Partly confirmed** (R3, R2 choose by genre/theme/story; R1 by popularity) |
| A3 | Viewers are willing to watch through an embedded player | **Not verified**: to be tested in the usability study before pre-defense 2 |
| A4 | Viewers would use watch lists and episode tracking | **Partly confirmed** (R3 strongly; R1, R2 do not track today) |
| A5 | Genre preferences are a sufficient basis for recommendations | **Open**: mixed trust in recommendations; to be checked by the offline evaluation |

## 2.5 Requirements-change summary

| Change | Reason |
|---|---|
| FR-20 (new-episode notifications) raised from *Could* to *Should* | F3 |
| Recommendations must show an explanation, not just a score (FR-17 acceptance criterion) | F5 |
| Usability test must include a task on embedded playback | A3 not verified |

## 2.6 Limitations and next steps

Three respondents form a small convenience sample of viewers only. Before pre-defense 2 the team will add interviews with at least one independent creator or catalogue moderator and run task-based usability sessions with the prototype (see Section 11, items 1 and 7).
