import { skills } from "@/lib/data";

// Infinite scrolling ribbon of skills — constant motion across the page.
export function Marquee() {
  const items = [...skills, ...skills];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((s, i) => (
          <span className="marquee-item" key={i}>
            {s}<span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
