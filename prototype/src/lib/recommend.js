// Content-based ranking used in the prototype (simplified version of docs/07 §7.5).
// score = cosine(user genre profile, title genre vector) + 0.05 * normalised rating
export function recommend(titles, favouriteGenres, seenIds, limit = 5) {
  return titles
    .filter((t) => !seenIds.has(t.id))
    .map((t) => {
      const shared = t.genres.filter((g) => favouriteGenres.includes(g));
      const cosine = shared.length / Math.sqrt(t.genres.length * favouriteGenres.length);
      return { title: t, shared, score: cosine + 0.05 * (t.rating / 10) };
    })
    .filter((r) => r.shared.length > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function filterTitles(titles, { query, genres, formats, statuses, sort }) {
  const q = query.trim().toLowerCase();
  const list = titles.filter(
    (t) =>
      (!q || `${t.name} ${t.author}`.toLowerCase().includes(q)) &&
      [...genres].every((g) => t.genres.includes(g)) &&
      (!formats.size || formats.has(t.format)) &&
      (!statuses.size || statuses.has(t.status))
  );
  const by = { rating: (a, b) => b.rating - a.rating, year: (a, b) => b.year - a.year, added: (a, b) => b.id - a.id };
  return list.sort(by[sort]);
}
