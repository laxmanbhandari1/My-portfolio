"use client";
import { useState } from "react";
import { ContainerScroll } from "./ui/ContainerScroll";
import { Counter } from "./ui/Counter";
import { SplitReveal } from "./ui/SplitReveal";
import { StoryModal } from "./ui/StoryModal";
import { profile, essay } from "@/lib/data";

export function About() {
  const [open, setOpen] = useState(false);
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
          <p className="about-clamped">{essay.body[0]}</p>
          <button className="about-seemore" onClick={() => setOpen(true)}>
            See full story <span>→</span>
          </button>
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

      <StoryModal
        open={open}
        onClose={() => setOpen(false)}
        title={essay.title}
        paragraphs={[essay.lead, ...essay.body]}
      />
    </div>
  );
}
