import { useState } from "react";
import { Link } from "react-router-dom";
import Poster from "../components/Poster.jsx";
import { TITLES, findTitle } from "../data/titles.js";
import { recommend } from "../lib/recommend.js";
import { useAppState } from "../state.jsx";

// UC-6 Manage lists, UC-10 Get recommendations (FR-11, FR-16…FR-18)
const FAVOURITES = ["Horror", "Comedy", "Sci-fi"];
const LIST_LABELS = { watching: "Watching", planned: "Plan to watch", completed: "Completed", dropped: "Dropped" };

const joinAnd = (items) => (items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : items[0]);

export default function MyListsPage() {
  const { lists } = useAppState();
  const [tab, setTab] = useState("watching");
  const seen = new Set(Object.values(lists).flat());
  const recs = recommend(TITLES, FAVOURITES, seen);
  const items = lists[tab].map(findTitle);

  return (
    <>
      <section className="intro">
        <h1>My lists</h1>
        <p>Recommendations are based on the genres you picked when you signed up ({joinAnd(FAVOURITES)}) and on how you rate titles.</p>
      </section>

      <div className="two-col">
        <section aria-labelledby="recs-h">
          <h2 id="recs-h">Recommended for you</h2>
          {recs.length ? (
            <ol className="recs">
              {recs.map(({ title, shared, score }) => (
                <li key={title.id} className="rec">
                  <Poster title={title} className="mini" />
                  <div>
                    <Link to={`/title/${title.id}`} className="rec-title">{title.name}</Link>
                    <p className="muted">Because you like {joinAnd(shared)}</p>
                  </div>
                  <span className="match" title="How closely the genres match your favourites">{Math.round(score * 100)}% match</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="muted">You have seen everything that matches your genres. Rate a few more titles to widen the recommendations.</p>
          )}
        </section>

        <section aria-labelledby="lists-h">
          <h2 id="lists-h" style={{ marginBottom: 14 }}>Watch lists</h2>
          <div className="tabs" role="tablist">
            {Object.entries(LIST_LABELS).map(([key, label]) => (
              <button key={key} role="tab" aria-selected={tab === key} onClick={() => setTab(key)}>
                {label} ({lists[key].length})
              </button>
            ))}
          </div>
          {items.length ? (
            <ul className="list-rows">
              {items.map((t) => (
                <li key={t.id}>
                  <Link to={`/title/${t.id}`}>{t.name}</Link>
                  <span className="progress">
                    {tab === "watching" ? `Episode ${Math.min(2, t.episodes.length)} of ${t.episodes.length}` : `${t.episodes.length} ep.`}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted" style={{ paddingTop: 12 }}>Nothing here yet. Add titles from their page with the “Your list” buttons.</p>
          )}
        </section>
      </div>
    </>
  );
}
