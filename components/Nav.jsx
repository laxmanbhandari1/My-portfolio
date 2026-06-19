import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  return (
    <nav className="nav">
      <a className="nav-brand" href="#top" data-cursor>LB<span>.</span></a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#blog">Blog</a>
        <a href="#skills">Skills</a>
      </div>
      <div className="nav-right">
        <ThemeToggle />
        <a className="nav-contact" href="#contact">Contact <span aria-hidden="true">↗</span></a>
      </div>
    </nav>
  );
}
