"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiJavascript, SiReact, SiNextdotjs, SiSupabase, SiPython, SiPostgresql,
  SiPrisma, SiGodotengine, SiHtml5, SiCss, SiGit, SiVercel,
} from "react-icons/si";
import { SplitReveal } from "./ui/SplitReveal";

// most-used tech sits on the inner ring (closer to the core), the rest orbit further out
const INNER = [
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#111111" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
];
const OUTER = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Prisma", Icon: SiPrisma, color: "#2D3748" },
  { name: "Godot", Icon: SiGodotengine, color: "#478CBF" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss, color: "#1572B6" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Vercel", Icon: SiVercel, color: "#111111" },
];

function Badges({ items, dir }) {
  return items.map((it, i) => {
    const a = (i / items.length) * 360;
    return (
      <div
        key={it.name}
        className="orbit-item"
        style={{ left: `${50 + Math.cos((a * Math.PI) / 180) * 50}%`, top: `${50 + Math.sin((a * Math.PI) / 180) * 50}%` }}
      >
        <div className={`orbit-badge ${dir}`}>
          <it.Icon style={{ color: it.color }} />
          <span className="orbit-name">{it.name}</span>
        </div>
      </div>
    );
  });
}

export function SolarSkills() {
  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);

  return (
    <section className="section" id="skills">
      <div className="section-head container">
        <div className="eyebrow-row">
          <span className="tick" />
          <span className="mono"><span className="num">{"// 03"}</span> — Toolbox</span>
        </div>
        <SplitReveal as="h2" className="section-title" text="The stack I build with." />
        <p className="section-sub">The tools I reach for most sit closest to the core — the rest orbit around.</p>
      </div>

      <div className="solar-stage" ref={stageRef}>
        <motion.div className="solar" style={{ rotateX, opacity, transformPerspective: 1300 }}>
          <div className="orbit-path p-inner" />
          <div className="orbit-path p-outer" />
          <div className="ring ring-inner"><Badges items={INNER} dir="rev-in" /></div>
          <div className="ring ring-outer"><Badges items={OUTER} dir="rev-out" /></div>
          <div className="solar-core">
            <span>MY<br />STACK</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
