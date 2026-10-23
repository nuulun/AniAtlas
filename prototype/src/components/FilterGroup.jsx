export default function FilterGroup({ legend, options, selected, onToggle, countFor }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      {options.map((o) => (
        <label key={o} className="check">
          <input type="checkbox" checked={selected.has(o)} onChange={() => onToggle(o)} />
          <span>{o}</span>
          <span className="count">{countFor(o)}</span>
        </label>
      ))}
    </fieldset>
  );
}
