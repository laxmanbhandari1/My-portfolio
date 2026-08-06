import { ContainerScroll } from "./ui/ContainerScroll";
import { Counter } from "./ui/Counter";
import { SplitReveal } from "./ui/SplitReveal";
import { profile, essay } from "@/lib/data";

export function About() {
  return (
    <div className="about-wrap section" id="about">
      <ContainerScroll
        titleComponent={
          <div>
            <div className="eyebrow-row" style={{ justifyContent: "center" }}>
              <span className="tick" />
              <span className="mono"><span className="num">{"// 01"}</span> — About</span>
            </div>
            <SplitReveal as="h2" className="section-title" text={essay.title} />
          </div>
        }
      >
        <div className="about-essay-box">
          <p className="about-lead">{essay.lead}</p>
          {essay.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="about-stats-row">
            {profile.stats.map((s) => (
              <div className="stat" key={s.label}>
                <b><Counter value={s.value} /></b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
