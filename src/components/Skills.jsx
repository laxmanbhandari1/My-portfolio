import { skills } from "@/lib/data";
import { SplitReveal } from "./ui/SplitReveal";

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-head container">
        <div className="eyebrow-row">
          <span className="tick" />
          <span className="mono">
            <span className="num">{"// 03"}</span> — Toolbox
          </span>
        </div>
        <SplitReveal as="h2" className="section-title" text="The stack I build with." />
      </div>
      <div className="container">
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-cell" key={s}>
              <span className="k">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
