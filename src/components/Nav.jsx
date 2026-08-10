"use client";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";

// Section ids to watch, in page order, matched against navLinks by href (#about → "about").
const SECTION_IDS = navLinks.map((l) => l.href.replace("#", ""));

export function Nav() {
  const [active, setActive] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    // Track which section is most visible near the top of the viewport —
    // a thin horizontal band just under the fixed nav is the "active zone".
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // pick the one closest to the top of the viewport
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(top.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav2" aria-label="Primary">
      <a href="#top" className="nav2-brand">LB<b>.</b></a>
      <div className="nav2-links">
        {navLinks.map((l) => {
          const id = l.href.replace("#", "");
          return (
            <a key={l.href} href={l.href} className={active === id ? "active" : ""}>
              {l.label}
            </a>
          );
        })}
        <a href="#contact" className={active === "contact" ? "active" : ""}>Contact</a>
      </div>
      <div className="nav2-right">
        <a href="#contact" className="nav2-talk">Let&apos;s talk <span className="dot">•</span></a>
        <button className="nav2-menu" aria-label="Menu"><span /><span /></button>
      </div>
    </nav>
  );
}
