export default function ChipGroup({ label, options, selected, onToggle }) {
  return (
    <div>
      <div className="lbl">{label}</div>
      <div className="chips">
        {options.map((o) => (
          <button key={o} type="button" className="chip" aria-pressed={selected.has(o)} onClick={() => onToggle(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
