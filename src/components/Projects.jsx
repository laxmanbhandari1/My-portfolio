"use client";
import { motion } from "framer-motion";
import { HorizontalScroll } from "./ui/HorizontalScroll";
import { Icon } from "./ui/Icons";
import { SplitReveal } from "./ui/SplitReveal";
import { projects, profile } from "@/lib/data";

const PANEL_COUNT = projects.length + 1; // projects + CTA panel

function ProjectPanel({ p }) {
  return (
    <div className="panel">
      <div className="project">
        <motion.div
          className={`project-media ${p.accent === "red" ? "red" : ""}`}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {/* Drop a real screenshot at public{p.image} to replace this placeholder */}
          <div className="ph">
            <b>{p.title}</b>
            {p.placeholder ? "placeholder — add screenshot & details" : `screenshot → public${p.image}`}
          </div>
        </motion.div>

        <div className="project-body">
          <span className="project-index">{p.index} — Project</span>
          <h3 className="project-title">{p.title}</h3>
          <p className="project-tagline">{p.tagline}</p>
          <p className="project-desc">{p.description}</p>
          <div className="tech-row">
            {p.tech.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
          <div className="project-links">
            {!p.placeholder && (
              <>
                <a href={p.liveLink} target="_blank" rel="noreferrer" className="btn-primary">
                  Live <Icon name="arrow" />
                </a>
                <a href={p.githubLink} target="_blank" rel="noreferrer" className="btn-ghost">
                  GitHub ↗
                </a>
              </>
            )}
            {p.placeholder && <span className="btn-ghost">Coming soon</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work">
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head container">
          <div className="eyebrow-row">
            <span className="tick" />
            <span className="mono">
              <span className="num">{"// 02"}</span> — Portfolio
            </span>
          </div>
          <SplitReveal as="h2" className="section-title" text="Featured work." />
          <p className="section-sub">Scroll down — each project slides in horizontally.</p>
        </div>
      </div>

      <HorizontalScroll panelCount={PANEL_COUNT}>
        {projects.map((p) => (
          <ProjectPanel key={p.id} p={p} />
        ))}
        {/* Closing CTA panel */}
        <div className="panel cta">
          <div className="cta-inner">
            <span className="mono">Like what you see?</span>
            <h3 className="project-title" style={{ margin: "16px 0" }}>
              Let&apos;s build something good<span className="dot">.</span>
            </h3>
            <a href="#contact" className="btn-primary">
              Get in touch <Icon name="arrow" />
            </a>
          </div>
        </div>
      </HorizontalScroll>
    </section>
  );
}
