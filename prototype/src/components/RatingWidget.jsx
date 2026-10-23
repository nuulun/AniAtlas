export default function RatingWidget({ value = 0, onRate }) {
  return (
    <div>
      <div className="scale" role="radiogroup" aria-label="Your rating from 1 to 10">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            className={value >= n ? "on" : ""}
            onClick={() => onRate(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="hint">{value ? `You rated it ${value} out of 10.` : "Not rated yet."}</p>
    </div>
  );
}
