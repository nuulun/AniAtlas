# 3. Literature Review

## 3.1 Scope and method

The review answers three questions:

- **Q1.** How is independent web content produced and discovered, and what problems do its creators face?
- **Q2.** Which recommendation approaches fit a small catalogue with sparse user data?
- **Q3.** How should search, recommendation and the platform as a whole be evaluated?

Sources were searched in Google Scholar, the ACM Digital Library, SpringerLink, SAGE Journals and arXiv. The search terms were *web series*, *YouTube creators*, *content-based recommendation*, *cold start*, *popularity bias*, *recommender evaluation* and *multimedia recommendation*. Most of the core sources are from 2021–2025. Foundational works such as Lops et al. 2011, Gomez-Uribe & Hunt 2015 and Covington et al. 2016 are kept because they define the methods used. Platform documentation and industry reports (S1–S7) are used only as evidence of facts, not as scientific sources.

The search was carried out in October 2026.

- **Inclusion criteria:** peer-reviewed journal and conference papers, academic monographs and handbooks in English; directly related to Q1–Q3; published 2015–2025, with older works allowed only if they define a method used in the project. One recent arXiv preprint [14] is included because it gives the newest empirical data on YouTube recommendations; it is marked as a preprint in the table.
- **Exclusion criteria:** papers without access to the full text; work on unrelated domains (e.g. news or e-commerce recommendation) without transferable findings.
- **Non-scientific sources:** blog posts and platform documentation are not counted as scientific sources and are used only as supporting evidence (S1–S7).

## 3.2 Critical review

### Q1 — Independent web content and its discovery

Christian [11] shows that web television developed as an "open" alternative to the Hollywood network system. Independent creators gained distribution without gatekeepers, but in return they bear the full burden of marketing and visibility. Cunningham and Craig [12] describe "social media entertainment" as a separate industry in which creators depend on platform infrastructure they do not control.

Recent empirical work confirms the inequality of this ecosystem. Rieder et al. [9] analysed about 153,000 YouTube channels and 137 million videos. Most of the economic value concentrates at the top of an "aspirational curve", and smaller creators rely on crowdfunding. Bishop [10] and Choi et al. [8] show that creators experience the recommendation algorithm as opaque. They form "folk theories" about it and suffer stress from unexplained changes in visibility.

**Implication for AniAtlas:** a specialised catalogue with explicit, structured metadata gives independent animation a discovery channel that does not depend only on YouTube's general algorithm.

### Q2 — Recommendation approaches

Covington et al. [2] describe YouTube's two-stage deep-learning recommender. It relies on billions of interaction events, which a small new platform does not have. Gomez-Uribe and Hunt [3] show that Netflix combines several algorithms, including genre-based rows. Klimashevskaia et al. [6] review popularity bias: collaborative systems trained on interaction data systematically over-recommend popular items. This is exactly the bias that hides small independent creators.

Content-based filtering [1, 13] recommends items similar to those a user liked, using item features such as genres and tags. It works with few users and treats new and old items equally, but it is limited to the features that are available and tends towards over-specialisation. Deldjoo et al. [4] review multimedia recommenders and show that richer content features (visual, audio, text) can improve on metadata-only approaches, at a much higher computational cost. Panda and Ray [5] review cold-start solutions. For new users, asking for initial preferences (for example, favourite genres at sign-up) and hybridising content-based and collaborative signals are the most common practical approaches.

**Implication for AniAtlas:** the MVP uses content-based filtering on genre and tag vectors. Cold start for new users is handled by preference elicitation at sign-up [5]. Collaborative and multimedia features are left for later stages, once enough data exists [4, 13].

### Q3 — Evaluation

Zangerle and Bauer [7] propose a framework for recommender evaluation. It distinguishes offline metrics (accuracy such as precision@k and nDCG; beyond-accuracy metrics such as coverage and diversity) from user studies. It also stresses comparison against simple baselines. Klimashevskaia et al. [6] recommend measuring popularity bias explicitly, for example by the share of long-tail items in recommendations. Cakmak et al. [14] show empirically that YouTube Shorts recommendations disproportionately promote high-view videos. This supports using a popularity-based recommender as the baseline for comparison.

**Implication for AniAtlas:** the verification plan ([Section 9](09-verification-plan.md)) compares the content-based recommender with a popularity baseline using precision@10, catalogue coverage and long-tail share, and adds a small user study.

## 3.3 Analysis table of publications

| # | Source | Year | Type | Approach / data | Key findings | Limitations | Use in AniAtlas |
|---|---|---|---|---|---|---|---|
| 1 | Lops, de Gemmis, Semeraro | 2011 | Book chapter | Review of content-based recommenders | Item features + user profile; good for new items | Over-specialisation; depends on feature quality | Basis of the recommender |
| 2 | Covington, Adams, Sargin | 2016 | Conference (RecSys) | Deep two-stage recommender at YouTube | Scales to billions of events | Needs huge interaction data | Why YouTube's approach is not reproducible; motivation |
| 3 | Gomez-Uribe, Hunt | 2015 | Journal (ACM TMIS) | Netflix recommender as a business system | Several algorithms, genre rows, A/B tests | Industrial, few reproducible details | Genre-based rows on the home page |
| 4 | Deldjoo et al. | 2020 | Journal (ACM CSUR) | Survey of multimedia recommenders | Content features improve cold-item recommendations | High compute cost | Future work: thumbnail/description features |
| 5 | Panda, Ray | 2022 | Journal (JIIS) | Systematic review of cold-start methods | Preference elicitation and hybrids are most common | Few comparisons on small catalogues | Genre choice at sign-up |
| 6 | Klimashevskaia et al. | 2024 | Journal (UMUAI) | Survey of popularity bias | Collaborative recommenders over-promote popular items; metrics for bias | Mostly offline studies | Long-tail metric, popularity baseline |
| 7 | Zangerle, Bauer | 2022 | Journal (ACM CSUR) | Recommender evaluation framework | Offline + beyond-accuracy + user studies; baselines | General, not domain-specific | Structure of the verification plan |
| 8 | Choi, Kang, Lee, Kim | 2023 | Conference (CHI) | Interviews with 14 YouTube creators + design workshop | Algorithm is opaque; creators feel stress and unfairness | Small qualitative sample | Creator-side motivation |
| 9 | Rieder et al. | 2023 | Journal (Social Media + Society) | 153k channels, 137M videos | Strong inequality; small creators rely on crowdfunding | Only channels with ≥100k subscribers | Evidence of unequal visibility |
| 10 | Bishop | 2019 | Journal (New Media & Society) | Ethnography of YouTube creators | "Algorithmic gossip" shapes creator behaviour | Beauty vlogger community | Creator-side motivation |
| 11 | Christian | 2018 | Monograph (NYU Press) | History and economics of web TV | Open distribution vs. visibility burden | Pre-2018 data | Framing of independent web series |
| 12 | Cunningham, Craig | 2019 | Monograph (NYU Press) | Social media entertainment industry | Creators depend on platform infrastructure | Broad, not animation-specific | Context of the problem |
| 13 | Ricci, Rokach, Shapira (eds.) | 2022 | Handbook (Springer) | Comprehensive recommender reference | Taxonomy of methods and evaluation | Textbook level | Method selection |
| 14 | Cakmak, Agarwal, Poudel | 2025 | Preprint (arXiv) | 685k YouTube Shorts videos analysed | Popularity bias in recommendations | Shorts only, preprint | Supports popularity baseline choice |

Scientific sources: 14 (journal articles, conference papers, monographs, handbook). Of these, 7 were published in 2021–2025 and 1 in 2020; the other 6 (2011–2019) are foundational works that define the methods used. Supporting documentation and data sources: S1–S7.

## 3.4 Limitations the project takes into account

1. Interaction data will be sparse, so collaborative filtering is postponed [5, 6].
2. Content-based recommendations risk over-specialisation, so diversity is measured [1, 7].
3. Metadata comes from a quota-limited external API, so caching and scheduled updates are required [S5].
4. Video availability is controlled by YouTube, so the system must detect removed videos [S6].

## References

### Scientific

1. Lops, P., de Gemmis, M., Semeraro, G. (2011). Content-based recommender systems: State of the art and trends. In *Recommender Systems Handbook*, Springer, 73–105. https://doi.org/10.1007/978-0-387-85820-3_3
2. Covington, P., Adams, J., Sargin, E. (2016). Deep neural networks for YouTube recommendations. *Proc. 10th ACM RecSys*, 191–198. https://doi.org/10.1145/2959100.2959190
3. Gomez-Uribe, C. A., Hunt, N. (2015). The Netflix recommender system: Algorithms, business value, and innovation. *ACM TMIS*, 6(4), 13. https://doi.org/10.1145/2843948
4. Deldjoo, Y., Schedl, M., Cremonesi, P., Pasi, G. (2020). Recommender systems leveraging multimedia content. *ACM Computing Surveys*, 53(5), 1–38. https://doi.org/10.1145/3407190
5. Panda, D. K., Ray, S. (2022). Approaches and algorithms to mitigate cold start problems in recommender systems: a systematic literature review. *Journal of Intelligent Information Systems*, 59(2), 341–366. https://doi.org/10.1007/s10844-022-00698-5
6. Klimashevskaia, A., Jannach, D., Elahi, M., Trattner, C. (2024). A survey on popularity bias in recommender systems. *User Modeling and User-Adapted Interaction*. https://arxiv.org/abs/2308.01118
7. Zangerle, E., Bauer, C. (2022). Evaluating recommender systems: Survey and framework. *ACM Computing Surveys*, 55(8), 170. https://doi.org/10.1145/3556536
8. Choi, Y., Kang, E. J., Lee, M. K., Kim, J. (2023). Creator-friendly algorithms: Behaviors, challenges, and design opportunities in algorithmic platforms. *Proc. CHI '23*. https://doi.org/10.1145/3544548.3581386
9. Rieder, B., Borra, E., Coromina, Ò., Matamoros-Fernández, A. (2023). Making a living in the creator economy: A large-scale study of linking on YouTube. *Social Media + Society*, 9(2). https://doi.org/10.1177/20563051231180628
10. Bishop, S. (2019). Managing visibility on YouTube through algorithmic gossip. *New Media & Society*, 21(11–12), 2589–2606. https://doi.org/10.1177/1461444819854731
11. Christian, A. J. (2018). *Open TV: Innovation beyond Hollywood and the Rise of Web Television*. NYU Press.
12. Cunningham, S., Craig, D. (2019). *Social Media Entertainment: The New Intersection of Hollywood and Silicon Valley*. NYU Press.
13. Ricci, F., Rokach, L., Shapira, B. (Eds.) (2022). *Recommender Systems Handbook* (3rd ed.). Springer.
14. Cakmak, M. C., Agarwal, N., Poudel, D. (2025). Investigating algorithmic bias in YouTube Shorts. arXiv:2507.04605. https://arxiv.org/abs/2507.04605

### Supporting sources (documentation, data, industry)

- S1. YouTube Culture & Trends (2024, Oct 28). Set in motion: The new wave of indie animation. https://blog.youtube/culture-and-trends/indie-animation/
- S2. YouTube Official Blog (2024, Nov 21). The Amazing Digital Circus. https://blog.youtube/creator-and-artist-stories/amazing-digital-circus/
- S3. Wikipedia. Hazbin Hotel. https://en.wikipedia.org/wiki/Hazbin_Hotel
- S4. Amazon MGM Studios (2023). Prime Video announces premiere date and guest cast for Hazbin Hotel. https://press.amazonmgmstudios.com/us/en/press-release/prime-video-announces-premiere-date-and-guest-cast
- S5. Google for Developers. YouTube Data API overview (quota). https://developers.google.com/youtube/v3/getting-started
- S6. Google for Developers. YouTube IFrame Player API. https://developers.google.com/youtube/iframe_api_reference
- S7. MyAnimeList forum: database guidelines discussion. https://myanimelist.net/forum/message/58190915?goto=topic
