import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RatingWidget from "../components/RatingWidget.jsx";
import YouTubePlayer from "../components/YouTubePlayer.jsx";
import { SAMPLE_REVIEWS, findTitle, totalMinutes } from "../data/titles.js";
import { useAppState } from "../state.jsx";

// UC-2 View title, UC-3 Watch episode, UC-5 Rate, UC-6 Lists (FR-3, FR-7, FR-8, FR-10, FR-11)
const LIST_LABELS = { watching: "Watching", planned: "Planned", completed: "Completed", dropped: "Dropped" };

export default function TitlePage() {
  const { id } = useParams();
  const title = findTitle(id);
  const [epIndex, setEpIndex] = useState(0);
  const { ratings, rate, listOf, moveToList } = useAppState();
  useEffect(() => setEpIndex(0), [id]);

  if (!title) return <div className="empty">This title does not exist. <Link to="/">Back to the catalogue</Link></div>;
  const episode = title.episodes[Math.min(epIndex, title.episodes.length - 1)];
  const currentList = listOf(title.id);

  return (
    <section>
      <Link to="/" className="lbl" style={{ textDecoration: "none" }}>← Catalogue</Link>
      <div className="tp">
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <YouTubePlayer title={title} episode={episode} />
          <div>
            <h1>{title.name}</h1>
            <p className="sub">by {title.author} · {title.format} · {title.year} · {title.status}</p>
          </div>
          <div className="tags">
            {title.genres.map((g) => <span key={g} className="tag"><b>{g}</b></span>)}
            {title.tags.map((g) => <span key={g} className="tag">#{g}</span>)}
          </div>
          <div className="panel">
            <h2>Your rating</h2>
            <RatingWidget value={ratings[title.id]} onRate={(n) => rate(title.id, n)} />
            <div className="lbl">Add to list</div>
            <div className="lists">
              {Object.entries(LIST_LABELS).map(([key, label]) => (
                <button key={key} type="button" aria-pressed={currentList === key} onClick={() => moveToList(title.id, key)}>{label}</button>
              ))}
            </div>
          </div>
          <div className="panel">
            <h2>Reviews</h2>
            {SAMPLE_REVIEWS.map((r) => (
              <div key={r.user} className="review"><b>{r.user}</b> · ★ {r.score}<br />{r.text}</div>
            ))}
          </div>
        </div>
        <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="panel">
            <h2>Episodes</h2>
            <ol className="eps">
              {title.episodes.map((e, i) => (
                <li key={e.name}>
                  <button type="button" aria-current={i === epIndex} onClick={() => setEpIndex(i)}>
                    <span className="n">E{String(i + 1).padStart(2, "0")}</span>
                    <span>{e.name}{e.unavailable && <> <span className="na">unavailable</span></>}</span>
                    <span className="d">{e.minutes} min</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="panel">
            <dl className="kv">
              <dt>Average rating</dt><dd>★ {title.rating.toFixed(1)} · {title.viewsM * 13} ratings</dd>
              <dt>Episodes</dt><dd>{title.episodes.length}</dd>
              <dt>Total runtime</dt><dd>{totalMinutes(title)} min</dd>
              <dt>YouTube views</dt><dd>{title.viewsM}M</dd>
              <dt>Source</dt><dd>YouTube playlist</dd>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
