import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChipGroup from "../components/ChipGroup.jsx";
import TitleCard from "../components/TitleCard.jsx";
import { FORMATS, GENRES, STATUSES, TITLES } from "../data/titles.js";
import { filterTitles } from "../lib/recommend.js";
import { useAppState } from "../state.jsx";

// UC-1 Search and filter catalogue (FR-4, FR-5, FR-6)
function useToggleSet() {
  const [set, setSet] = useState(new Set());
  const toggle = (v) => setSet((prev) => {
    const next = new Set(prev);
    next.has(v) ? next.delete(v) : next.add(v);
    return next;
  });
  return [set, toggle];
}

export default function CatalogPage() {
  const navigate = useNavigate();
  const { compare } = useAppState();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rating");
  const [genres, toggleGenre] = useToggleSet();
  const [formats, toggleFormat] = useToggleSet();
  const [statuses, toggleStatus] = useToggleSet();

  const results = useMemo(
    () => filterTitles(TITLES, { query, genres, formats, statuses, sort }),
    [query, genres, formats, statuses, sort]
  );

  return (
    <section>
      <h1>Independent animation, catalogued</h1>
      <p className="sub">Web series, films and shorts published by independent creators on YouTube.</p>
      <div className="cat">
        <aside className="rail" aria-label="Filters">
          <div>
            <label className="lbl" htmlFor="q">Search</label>
            <input id="q" type="search" placeholder="Title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <ChipGroup label="Genres" options={GENRES} selected={genres} onToggle={toggleGenre} />
          <ChipGroup label="Format" options={FORMATS} selected={formats} onToggle={toggleFormat} />
          <ChipGroup label="Status" options={STATUSES} selected={statuses} onToggle={toggleStatus} />
        </aside>
        <div style={{ minWidth: 0 }}>
          <div className="toolbar">
            <span className="count">{results.length} title{results.length === 1 ? "" : "s"}</span>
            <label className="lbl" htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="rating">Rating</option>
              <option value="year">Release year</option>
              <option value="added">Recently added</option>
            </select>
            <button onClick={() => navigate("/compare")}>Compare ({compare.size})</button>
          </div>
          {results.length ? (
            <div className="grid">
              {results.map((t) => <TitleCard key={t.id} title={t} />)}
            </div>
          ) : (
            <div className="empty">No titles match these filters. Remove a genre or clear the search.</div>
          )}
        </div>
      </div>
    </section>
  );
}
