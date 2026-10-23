import { createContext, useContext, useState } from "react";

// Prototype-only client state. In the real app ratings and lists come from /api/me/* via TanStack Query.
const AppState = createContext(null);

export function AppStateProvider({ children }) {
  const [compare, setCompare] = useState(new Set([1, 4]));
  const [ratings, setRatings] = useState({});
  const [lists, setLists] = useState({ watching: [1, 7], planned: [4, 11], completed: [2, 9], dropped: [] });

  const toggleCompare = (id) =>
    setCompare((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 3) next.add(id);
      return next;
    });

  const rate = (id, score) => setRatings((r) => ({ ...r, [id]: score }));

  const moveToList = (id, list) =>
    setLists((prev) => {
      const next = Object.fromEntries(Object.entries(prev).map(([k, ids]) => [k, ids.filter((x) => x !== id)]));
      next[list] = [...next[list], id];
      return next;
    });

  const listOf = (id) => Object.keys(lists).find((k) => lists[k].includes(id));

  return (
    <AppState.Provider value={{ compare, toggleCompare, ratings, rate, lists, moveToList, listOf }}>
      {children}
    </AppState.Provider>
  );
}

export const useAppState = () => useContext(AppState);
