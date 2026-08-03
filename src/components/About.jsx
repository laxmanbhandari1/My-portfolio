import { ContainerScroll } from "./ui/ContainerScroll";
import { Counter } from "./ui/Counter";
import { SplitReveal } from "./ui/SplitReveal";
import { profile, skills } from "@/lib/data";

export function About() {
  return (
    <div className="about-wrap section" id="about">
      <ContainerScroll
        titleComponent={
          <div>
            <div className="eyebrow-row" style={{ justifyContent: "center" }}>
              <span className="tick" />
              <span className="mono">
                <span className="num">{"// 01"}</span> — About
              </span>
            </div>
            <SplitReveal as="h2" className="section-title" text="From Kathmandu to London." />
          </div>
        }
      >
        <div className="about-copy">
          <p>{profile.about}</p>
          <div className="about-tags">
            {skills.slice(0, 6).map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="about-stats">
          {profile.stats.map((s) => (
            <div className="stat" key={s.label}>
              <b><Counter value={s.value} /></b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </ContainerScroll>
    </div>
  );
}
