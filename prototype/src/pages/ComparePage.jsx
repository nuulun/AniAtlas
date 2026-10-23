import { findTitle, totalMinutes } from "../data/titles.js";
import { useAppState } from "../state.jsx";

// UC-7 Compare titles (FR-12)
export default function ComparePage() {
  const { compare } = useAppState();
  const titles = [...compare].map(findTitle);
  const maxRating = Math.max(...titles.map((t) => t.rating));
  const rows = [
    ["Format", (t) => t.format],
    ["Status", (t) => t.status],
    ["Released", (t) => t.year],
    ["Genres", (t) => t.genres.join(", ")],
    ["Tags", (t) => t.tags.join(", ")],
    ["Episodes", (t) => t.episodes.length],
    ["Total runtime", (t) => `${totalMinutes(t)} min`],
    ["Average rating", (t) => <span className={t.rating === maxRating ? "best" : ""}>★ {t.rating.toFixed(1)}</span>],
    ["Author", (t) => t.author],
  ];

  return (
    <section>
      <h1>Compare titles</h1>
      <p className="sub">Pick up to three titles in the catalogue with the “+ Compare” button.</p>
      {titles.length < 2 ? (
        <div className="empty" style={{ marginTop: 18 }}>Select at least two titles in the catalogue to compare them.</div>
      ) : (
        <div className="tbl">
          <table>
            <thead>
              <tr><th />{titles.map((t) => <th key={t.id} scope="col">{t.name}</th>)}</tr>
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
    </section>
  );
}
