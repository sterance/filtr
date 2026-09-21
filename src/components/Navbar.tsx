import { APP_NAME, NAV_LINKS } from "../config.ts";
import { ThemeToggle } from "./ThemeToggle.tsx";
import { Link } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link className="navbar__brand" to="/">
          {APP_NAME}
        </Link>

        {NAV_LINKS.length > 0 && (
          <nav className="navbar__nav" aria-label="Main">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="navbar__actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
