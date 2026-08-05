"use client";
import { useState } from "react";
import { profile } from "@/lib/data";
import { Icon } from "./ui/Icons";

export function Hero() {
  const [imgOk, setImgOk] = useState(true);
  return (
    <section className="hero2" id="top">
      <img src="/snake.png" alt="" className="hero2-snake" aria-hidden="true" />

      <div className="hero2-inner">
        <div className="hero2-left">
          <div className="hero2-eyebrow">
            <Icon name="code" /> Full-stack developer
          </div>
          <h1 className="hero2-name">
            <span className="n-ink">LAXMAN</span>
            <span className="n-red">BHANDARI<span className="dot">.</span></span>
          </h1>
          <a href="#work" className="hero2-explore">
            <span className="circle"><Icon name="arrow" /></span>
            <span className="lbl">Explore my work</span>
          </a>
        </div>

        <div className="hero2-visual">
          <div className="hero2-shape" aria-hidden="true" />
          <div className="hero2-portrait">
            {imgOk ? (
              <img src="/me.png" alt={profile.name} onError={() => setImgOk(false)} />
            ) : (
              <div className="hero2-ph"><span>YOUR<br />PHOTO</span><em>drop me.png in /public</em></div>
            )}
          </div>
        </div>
      </div>

      <div className="hero2-scroll">Scroll</div>
      <div className="hero2-index">01</div>
      <div className="hero2-loc"><span className="d">•</span> Based in London, UK</div>
      <div className="hero2-socials">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
        <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
      </div>
    </section>
  );
}
