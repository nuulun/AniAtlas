import { Link } from "react-router-dom";
import Poster from "./Poster.jsx";
import { useAppState } from "../state.jsx";

export default function TitleCard({ title }) {
  const { compare, toggleCompare } = useAppState();
  const inCompare = compare.has(title.id);
  const compareFull = compare.size >= 3 && !inCompare;
  const to = `/title/${title.id}`;

  return (
    <article className="cel">
      <Link to={to} className="cel-frame" aria-label={title.name} tabIndex={-1}>
        <svg className="pegs" width="120" height="10" viewBox="0 0 120 10" aria-hidden="true">
          <rect x="1" y="1" width="30" height="8" rx="4" fill="var(--paper)" stroke="currentColor" />
          <circle cx="60" cy="5" r="4" fill="var(--paper)" stroke="currentColor" />
          <rect x="89" y="1" width="30" height="8" rx="4" fill="var(--paper)" stroke="currentColor" />
        </svg>
        <Poster title={title} />
      </Link>
      <div>
        <h3><Link to={to}>{title.name}</Link></h3>
        <p className="by">{title.author}, {title.year}</p>
      </div>
      <p className="cel-meta">
        <span>{title.genres.join(", ")}</span>
        <span className="rating">{title.rating.toFixed(1)}</span>
      </p>
      <p className="cel-meta">
        <span>{title.format === "Series" ? `${title.episodes.length} episodes` : title.format}</span>
        <label
          className={`compare-toggle${compareFull ? " is-disabled" : ""}`}
          title={compareFull ? "You can compare up to 3 titles" : undefined}
        >
          <input type="checkbox" checked={inCompare} disabled={compareFull} onChange={() => toggleCompare(title.id)} />
          Compare
        </label>
      </p>
    </article>
  );
}
