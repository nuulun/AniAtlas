export default function RatingWidget({ value = 0, onRate }) {
  return (
    <div className="stars">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button key={n} type="button" className={value >= n ? "on" : ""} aria-label={`Rate ${n}`} onClick={() => onRate(n)}>
          {n}
        </button>
      ))}
    </div>
  );
}
