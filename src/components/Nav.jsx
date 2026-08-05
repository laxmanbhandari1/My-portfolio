import { navLinks } from "@/lib/data";

// Top-bar nav in the reference style: LB left, links centre, Let's talk + menu right.
export function Nav() {
  return (
    <nav className="nav2" aria-label="Primary">
      <a href="#top" className="nav2-brand">LB<b>.</b></a>
      <div className="nav2-links">
        {navLinks.map((l, i) => (
          <a key={l.href} href={l.href} className={i === 0 ? "active" : ""}>{l.label}</a>
        ))}
        <a href="#contact">Contact</a>
      </div>
      <div className="nav2-right">
        <a href="#contact" className="nav2-talk">Let&apos;s talk <span className="dot">•</span></a>
        <button className="nav2-menu" aria-label="Menu"><span /><span /></button>
      </div>
    </nav>
  );
}
