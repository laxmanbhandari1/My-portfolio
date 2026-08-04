"use client";
import { useEffect, useRef, useState } from "react";
import { profile, roles } from "@/lib/data";
import { Icon } from "./ui/Icons";
import { runSnakes } from "@/lib/snakeEngine";

const initials = profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const HERO_SNAKES = [
  { color: "#cf1f16", dark: "#8f110b", light: "rgba(255,158,148,.55)", pellet: "#e5261f", pr: "229,38,31" },
  { color: "#16a34a", dark: "#0b6b31", light: "rgba(150,255,190,.55)", pellet: "#16a34a", pr: "22,163,74" },
];

export function Hero() {
  const heroRef = useRef(null);
  const snakeRef = useRef(null);
  const tiltRef = useRef(null);
  const ctaRef = useRef(null);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      if (tiltRef.current) {
        const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        tiltRef.current.style.transform = `rotateY(${nx * 14}deg) rotateX(${-ny * 14}deg)`;
      }
      if (ctaRef.current) {
        const cr = ctaRef.current.getBoundingClientRect();
        const cx = e.clientX - (cr.left + cr.width / 2), cy = e.clientY - (cr.top + cr.height / 2);
        if (Math.abs(cx) < 160 && Math.abs(cy) < 120) ctaRef.current.style.transform = `translate(${cx * 0.18}px, ${cy * 0.32}px)`;
        else ctaRef.current.style.transform = "";
      }
    };
    const onLeave = () => { if (tiltRef.current) tiltRef.current.style.transform = ""; if (ctaRef.current) ctaRef.current.style.transform = ""; };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => { hero.removeEventListener("pointermove", onMove); hero.removeEventListener("pointerleave", onLeave); };
  }, []);

  useEffect(() => {
    const c = snakeRef.current;
    if (!c) return;
    return runSnakes(c, HERO_SNAKES);
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-glow" aria-hidden="true" />
      <canvas className="float-layer" ref={snakeRef} aria-hidden="true" />

      <div className="center">
        <div className="avatar-pop">
          <div className="avatar-tilt" ref={tiltRef}>
            <div className="avatar" title="Drop your photo at public/me.png">
              {imgOk ? <img src="/me.png" alt={profile.name} onError={() => setImgOk(false)} /> : <span className="ph">{initials}</span>}
            </div>
          </div>
        </div>

        <div className="socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
          <a href="#work" aria-label="Work"><Icon name="code" /></a>
        </div>

        <h1 className="name">{profile.name}<span className="dot">.</span></h1>
        <div className="name-underline" />

        <div className="roles">
          {roles.map((r) => (
            <div className="role" key={r.label}>
              <Icon name={r.icon} /><span><b>{r.label}</b> — {r.detail}</span>
            </div>
          ))}
        </div>

        <div className="hero-cta">
          <a href="#contact" ref={ctaRef}><span>Let&apos;s Connect</span><span className="arrow"><Icon name="arrow" /></span></a>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll down"><span>Scroll</span><span className="scroll-cue-line"><span /></span></a>
    </section>
  );
}
