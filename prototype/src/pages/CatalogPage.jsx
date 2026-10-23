import { useMemo, useState } from "react";
import FilterGroup from "../components/FilterGroup.jsx";
import TitleCard from "../components/TitleCard.jsx";
import { FORMATS, GENRES, STATUSES, TITLES } from "../data/titles.js";
import { filterTitles } from "../lib/recommend.js";

// UC-1 Search and filter catalogue (FR-4, FR-5, FR-6)
function useToggleSet() {
  const [set, setSet] = useState(new Set());
  const toggle = (v) =>
    setSet((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });
  return [set, toggle, () => setSet(new Set())];
}

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rating");
  const [genres, toggleGenre, clearGenres] = useToggleSet();
  const [formats, toggleFormat, clearFormats] = useToggleSet();
  const [statuses, toggleStatus, clearStatuses] = useToggleSet();

  const results = useMemo(
    () => filterTitles(TITLES, { query, genres, formats, statuses, sort }),
    [query, genres, formats, statuses, sort]
  );
  const filtersOn = query || genres.size || formats.size || statuses.size;
  const clearAll = () => { setQuery(""); clearGenres(); clearFormats(); clearStatuses(); };

  return (
    <>
      <section className="intro">
        <h1>Find your next independent animated series</h1>
        <p>
          Series, films and shorts made by independent studios and published on YouTube.
          Filter by genre, format and status, then watch right here in the official YouTube player.
        </p>
      </section>

      <div className="catalogue">
        <aside className="filters" aria-label="Filters">
          <FilterGroup legend="Genre" options={GENRES} selected={genres} onToggle={toggleGenre}
            countFor={(g) => TITLES.filter((t) => t.genres.includes(g)).length} />
          <FilterGroup legend="Format" options={FORMATS} selected={formats} onToggle={toggleFormat}
            countFor={(f) => TITLES.filter((t) => t.format === f).length} />
          <FilterGroup legend="Status" options={STATUSES} selected={statuses} onToggle={toggleStatus}
            countFor={(s) => TITLES.filter((t) => t.status === s).length} />
        </aside>

        <section aria-label="Results" style={{ minWidth: 0 }}>
          <div className="toolbar">
            <div className="field">
              <label htmlFor="q">Search by title or author</label>
              <input id="q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="For example: orbit, Hollow Mile" />
            </div>
            <div className="field">
              <label htmlFor="sort">Sort by</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="rating">Highest rated</option>
                <option value="year">Newest release</option>
                <option value="added">Recently added</option>
              </select>
            </div>
          </div>

          <div className="result-line">
            <span>{results.length} of {TITLES.length} titles</span>
            {filtersOn ? <button className="btn-link" onClick={clearAll}>Clear filters</button> : null}
          </div>

          {results.length ? (
            <div className="grid">
              {results.map((t) => <TitleCard key={t.id} title={t} />)}
            </div>
          ) : (
            <div className="empty">
              <h2>No titles match all of these filters</h2>
              <p className="muted">Genres are combined, so each extra genre narrows the list. Remove one or clear all filters.</p>
              <button className="btn" onClick={clearAll}>Clear filters</button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
