import { useState } from "react";
import { Link } from "react-router-dom";
import Poster from "../components/Poster.jsx";
import { TITLES, findTitle } from "../data/titles.js";
import { recommend } from "../lib/recommend.js";
import { useAppState } from "../state.jsx";

// UC-6 Manage lists, UC-10 Get recommendations (FR-11, FR-16…FR-18)
const FAVOURITES = ["Horror", "Comedy", "Sci-fi"];
const LIST_LABELS = { watching: "Watching", planned: "Planned", completed: "Completed", dropped: "Dropped" };

export default function MyListsPage() {
  const { lists } = useAppState();
  const [tab, setTab] = useState("watching");
  const seen = new Set(Object.values(lists).flat());
  const recs = recommend(TITLES, FAVOURITES, seen);
  const items = lists[tab].map(findTitle);

  return (
    <section>
      <h1>My lists</h1>
      <p className="sub">Signed in as <b>demo_viewer</b>. Favourite genres chosen at sign-up: {FAVOURITES.join(", ")}.</p>
      <div className="two">
        <div className="panel">
          <h2>Recommended for you</h2>
          <div>
            {recs.map(({ title, shared, score }) => (
              <div key={title.id} className="rec">
                <Poster title={title} small />
                <div>
                  <Link to={`/title/${title.id}`} className="ct" style={{ color: "inherit" }}>{title.name}</Link>
                  <div className="why">Because you like {shared.map((g, i) => <span key={g}>{i > 0 && " and "}<em>{g}</em></span>)}</div>
                </div>
                <span className="score">{score.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <h2>Watch lists</h2>
          <div className="lists">
            {Object.entries(LIST_LABELS).map(([key, label]) => (
              <button key={key} type="button" aria-pressed={tab === key} onClick={() => setTab(key)}>
                {label} ({lists[key].length})
              </button>
            ))}
          </div>
          <div>
            {items.length ? items.map((t) => (
              <div key={t.id} className="li">
                <span>{t.name}</span>
                <span className="prog">{tab === "watching" ? `episode 2 of ${t.episodes.length}` : `${t.episodes.length} ep`}</span>
              </div>
            )) : <p className="sub">Nothing here yet. Add titles from their title page.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
