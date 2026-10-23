# AniAtlas UI prototype (React)

A clickable prototype of the key user scenarios, built with React 18, React Router and Vite: the same stack and component structure planned for `frontend/`. All titles, authors and ratings are fictional sample data.

## Run

Requires Node.js 18 or newer.

```bash
cd prototype
npm install
npm run dev        # open http://localhost:5173
```

`npm run build` creates a production build in `dist/` (not committed).

## Structure

| Path | Purpose |
|---|---|
| `src/pages/` | One page per scenario: CatalogPage (UC-1), TitlePage (UC-2, UC-3, UC-5, UC-6), ComparePage (UC-7), MyListsPage (UC-6, UC-10), SubmitPage (UC-8) |
| `src/components/` | Reusable UI: TitleCard, Poster (generated placeholder artwork), FilterGroup, RatingWidget, YouTubePlayer (embed placeholder), Header |
| `src/lib/recommend.js` | Filtering and the content-based recommendation scoring from docs/07 §7.5 |
| `src/data/titles.js` | Sample titles; in the real app these come from `GET /api/titles` |
| `src/state.jsx` | Prototype client state: compare selection (max 3), ratings, lists |
| `src/styles.css` | Design tokens and styles; light and dark themes |

## Visual language

The interface borrows from the animator's desk: light-table paper, non-photo-blue construction lines and red pencil accents. Title cards are drawn as cels with registration peg holes, placeholder artwork is an onion-skin pencil test, and the episode list is laid out like an exposure sheet. Fonts: Bricolage Grotesque for headings, Atkinson Hyperlegible for body text.
