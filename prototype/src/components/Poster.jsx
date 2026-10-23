export default function Poster({ title, small = false }) {
  return (
    <div className="poster" style={{ background: `linear-gradient(160deg, ${title.colors[0]}, ${title.colors[1]})` }}>
      {!small && <span className="badge">{title.format.toUpperCase()}</span>}
      {!small && <span>{title.name}</span>}
    </div>
  );
}
