import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RatingWidget from "../components/RatingWidget.jsx";
import YouTubePlayer from "../components/YouTubePlayer.jsx";
import { SAMPLE_REVIEWS, findTitle, totalMinutes } from "../data/titles.js";
import { useAppState } from "../state.jsx";

// UC-2 View title, UC-3 Watch episode, UC-5 Rate, UC-6 Lists (FR-3, FR-7, FR-8, FR-10, FR-11)
const LIST_LABELS = { watching: "Watching", planned: "Plan to watch", completed: "Completed", dropped: "Dropped" };

export default function TitlePage() {
  const { id } = useParams();
  const title = findTitle(id);
  const [epIndex, setEpIndex] = useState(0);
  const { ratings, rate, listOf, moveToList } = useAppState();
  useEffect(() => setEpIndex(0), [id]);

  if (!title) {
    return (
      <div className="empty">
        <h2>This title is not in the catalogue</h2>
        <Link to="/">Back to the catalogue</Link>
      </div>
    );
  }

  const episode = title.episodes[Math.min(epIndex, title.episodes.length - 1)];
  const currentList = listOf(title.id);

  return (
    <>
      <Link to="/" className="back">Back to the catalogue</Link>
      <div className="title-layout">
        <div className="title-main">
          <YouTubePlayer title={title} episode={episode} number={epIndex + 1} />

          <div className="title-head">
            <h1>{title.name}</h1>
            <p className="by">by {title.author}</p>
          </div>

          <dl className="facts">
            <div><dt>Rating</dt><dd>{title.rating.toFixed(1)}</dd></div>
            <div><dt>Format</dt><dd>{title.format}</dd></div>
            <div><dt>Status</dt><dd>{title.status}</dd></div>
            <div><dt>Released</dt><dd>{title.year}</dd></div>
            <div><dt>Runtime</dt><dd>{totalMinutes(title)} min</dd></div>
          </dl>

          <div className="tags" aria-label="Genres and tags">
            {title.genres.map((g) => <span key={g} className="tag genre">{g}</span>)}
            {title.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          <section className="reviews" aria-labelledby="reviews-h">
            <h2 id="reviews-h">What viewers say</h2>
            {SAMPLE_REVIEWS.map((r) => (
              <article key={r.user} className="review">
                <div className="review-head"><b>{r.user}</b><span className="muted">rated {r.score}/10</span></div>
                <p>{r.text}</p>
              </article>
            ))}
          </section>
        </div>

        <aside className="side">
          <section className="panel" aria-labelledby="eps-h">
            <h2 id="eps-h">Episodes</h2>
            <table className="xsheet">
              <thead>
                <tr><th className="num">Ep.</th><th>Title</th><th className="len">Length</th></tr>
              </thead>
              <tbody>
                {title.episodes.map((e, i) => (
                  <tr key={e.name} aria-current={i === epIndex}>
                    <td className="num"><button onClick={() => setEpIndex(i)} aria-label={`Play episode ${i + 1}`}>{i + 1}</button></td>
                    <td>
                      <button onClick={() => setEpIndex(i)}>
                        {e.name}{e.unavailable && <span className="gone">removed</span>}
                      </button>
                    </td>
                    <td className="len"><button onClick={() => setEpIndex(i)} tabIndex={-1}>{e.minutes} min</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="panel" aria-labelledby="rate-h">
            <h2 id="rate-h">Your rating</h2>
            <RatingWidget value={ratings[title.id]} onRate={(n) => rate(title.id, n)} />
          </section>

          <section className="panel" aria-labelledby="list-h">
            <h2 id="list-h">Your list</h2>
            <div className="segmented">
              {Object.entries(LIST_LABELS).map(([key, label]) => (
                <button key={key} type="button" aria-pressed={currentList === key} onClick={() => moveToList(title.id, key)}>
                  {label}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
