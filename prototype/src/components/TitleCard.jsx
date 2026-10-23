import { useNavigate } from "react-router-dom";
import Poster from "./Poster.jsx";
import { useAppState } from "../state.jsx";

export default function TitleCard({ title }) {
  const navigate = useNavigate();
  const { compare, toggleCompare } = useAppState();
  const inCompare = compare.has(title.id);
  return (
    <div>
      <button className="card" onClick={() => navigate(`/title/${title.id}`)}>
        <Poster title={title} />
        <span className="ct">{title.name}</span>
      </button>
      <div className="meta">
        <span>{title.genres.join(" · ")}</span>
        <b>★ {title.rating.toFixed(1)}</b>
      </div>
      <div className="meta">
        <span>{title.year} · {title.episodes.length} ep</span>
        <button className="cmpbtn" aria-pressed={inCompare} onClick={() => toggleCompare(title.id)}>
          {inCompare ? "✓ Compare" : "+ Compare"}
        </button>
      </div>
    </div>
  );
}
