import { NavLink } from "react-router-dom";

const LINKS = [
  ["/", "Catalogue"],
  ["/title/1", "Title page"],
  ["/compare", "Compare"],
  ["/me", "My lists"],
  ["/submit", "Submit a series"],
];

export default function Header() {
  return (
    <header>
      <div className="proto">
        Clickable prototype (React). Titles, ratings and users are fictional sample data. The real platform plays episodes in the official YouTube player.
      </div>
      <div className="wrap bar">
        <div className="logo"><i aria-hidden="true" />AniAtlas</div>
        <nav aria-label="Screens">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
