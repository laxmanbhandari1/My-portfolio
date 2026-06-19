import { skillBars } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="sk">
      <div className="sec-head" data-reveal>
        <div data-parallax data-speed="0.06">
          <span className="sec-eyebrow">Toolbox</span>
          <h2 className="sec-title">The stack I <span>build with</span>.</h2>
        </div>
      </div>
      <div className="sk-bars">
        {skillBars.map((s, i) => (
          <div className="sk-bar" data-reveal style={{ transitionDelay: `${i * 0.05}s` }} key={s.name}>
            <span className="sk-bar-name">{s.name}</span>
            <span className="sk-track"><span className="sk-fill" style={{ "--lvl": `${s.level}%` }} /></span>
          </div>
        ))}
      </div>
    </section>
  );
}
