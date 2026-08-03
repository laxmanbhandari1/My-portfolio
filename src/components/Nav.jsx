import { navLinks } from "@/lib/data";

// Floating frosted pill nav — fixed, centered, over the hero scene and content.
export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      {navLinks.map((l, i) => (
        <a key={l.href} href={l.href} className={i === 0 ? "active" : ""}>
          {l.label}
        </a>
      ))}
      <span className="sep" />
      <a href="#contact">Contact</a>
    </nav>
  );
}
