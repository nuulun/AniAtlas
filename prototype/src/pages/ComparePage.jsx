import { Link } from "react-router-dom";
import Poster from "../components/Poster.jsx";
import { findTitle, totalMinutes } from "../data/titles.js";
import { useAppState } from "../state.jsx";

// UC-7 Compare titles (FR-12)
export default function ComparePage() {
  const { compare, toggleCompare } = useAppState();
  const titles = [...compare].map(findTitle);
  const maxRating = Math.max(...titles.map((t) => t.rating));
  const maxEpisodes = Math.max(...titles.map((t) => t.episodes.length));

  const rows = [
    ["Rating", (t) => <span className={t.rating === maxRating ? "best" : ""}>{t.rating.toFixed(1)}{t.rating === maxRating && titles.length > 1 ? " (highest)" : ""}</span>],
    ["Format", (t) => t.format],
    ["Status", (t) => t.status],
    ["Released", (t) => t.year],
    ["Episodes", (t) => <span className={t.episodes.length === maxEpisodes ? "best" : ""}>{t.episodes.length}</span>],
    ["Total runtime", (t) => `${totalMinutes(t)} min`],
    ["Genres", (t) => t.genres.join(", ")],
    ["Tags", (t) => t.tags.join(", ")],
    ["Author", (t) => t.author],
  ];

  return (
    <>
      <section className="intro">
        <h1>Compare titles</h1>
        <p>Pick up to three titles in the catalogue with the Compare checkbox and see them side by side.</p>
      </section>

      {titles.length < 2 ? (
        <div className="empty">
          <h2>Select at least two titles</h2>
          <p className="muted">You have {titles.length} selected. Tick Compare on the titles you want in the catalogue.</p>
          <Link className="btn" to="/">Open the catalogue</Link>
        </div>
      ) : (
        <div className="table-scroll">
          <table className="compare">
            <thead>
              <tr>
                <th />
                {titles.map((t) => (
                  <th key={t.id} scope="col">
                    <div>
                      <Poster title={t} className="mini" />
                      <Link to={`/title/${t.id}`}>{t.name}</Link>
                      <button className="btn-link" onClick={() => toggleCompare(t.id)}>Remove</button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, cell]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {titles.map((t) => <td key={t.id}>{cell(t)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
