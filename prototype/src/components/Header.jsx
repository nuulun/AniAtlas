import { NavLink } from "react-router-dom";
import { useAppState } from "../state.jsx";

function Mark() {
  // three registration peg holes — the mark of an animation cel
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
      <rect x="1" y="3" width="7" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="13" cy="6" r="3.4" fill="var(--red)" />
      <rect x="18" y="3" width="7" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Header() {
  const { compare } = useAppState();
  const links = [
    ["/", "Catalogue"],
    ["/compare", `Compare (${compare.size})`],
    ["/me", "My lists"],
    ["/submit", "Submit a series"],
  ];
  return (
    <header className="masthead">
      <div className="wrap masthead-row">
        <NavLink to="/" className="wordmark"><Mark />AniAtlas</NavLink>
        <nav className="nav" aria-label="Main">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>
          ))}
        </nav>
        <span className="account">Signed in as demo_viewer</span>
      </div>
    </header>
  );
}
