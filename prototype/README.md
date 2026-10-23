# AniAtlas UI prototype (React)

A clickable prototype of the key user scenarios, built with React 18, React Router and Vite: the same stack and component structure planned for `frontend/`. All data is fictional sample data.

## Open without installing anything

Open **`demo.html`** in a browser. It is a single self-contained build.

## Run from source

```bash
cd prototype
npm install
npm run dev      # http://localhost:5173
npm run build    # writes a single-file build to dist/index.html
```

## Structure

| Path | Purpose |
|---|---|
| `src/pages/` | One page per scenario: CatalogPage (UC-1), TitlePage (UC-2, UC-3, UC-5, UC-6), ComparePage (UC-7), MyListsPage (UC-6, UC-10), SubmitPage (UC-8) |
| `src/components/` | Reusable UI: TitleCard, Poster, ChipGroup (filters), RatingWidget, YouTubePlayer (embed placeholder), Header |
| `src/lib/recommend.js` | Filtering and the content-based recommendation scoring from docs/07 §7.5 |
| `src/data/titles.js` | Sample titles; in the real app these come from `GET /api/titles` |
| `src/state.jsx` | Prototype client state (compare selection, ratings, lists) |
