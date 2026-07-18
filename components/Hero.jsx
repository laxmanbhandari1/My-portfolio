"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/lib/data";

export default function Hero({ entered }) {
  const heroRef = useRef(null);
  const shotRef = useRef(null);
  const helloRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const shot = shotRef.current;
    if (!hero || !shot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      live = false,
      raf = null;

    const tick = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      shot.style.setProperty("--px", cx.toFixed(1) + "px");
      shot.style.setProperty("--py", cy.toFixed(1) + "px");
      raf =
        Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4
          ? requestAnimationFrame(tick)
          : null;
    };

    const onMove = (e) => {
      const r = shot.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      const hero2 = heroRef.current;
      const hello = helloRef.current;
      if (hero2 && hello) {
        const hr = hero2.getBoundingClientRect();
        const nx = (e.clientX - (hr.left + hr.width / 2)) / (hr.width / 2);
        const ny = (e.clientY - (hr.top + hr.height / 2)) / (hr.height / 2);
        hello.style.setProperty("--hx", (nx * 7).toFixed(2) + "deg");
        hello.style.setProperty("--hy", (-ny * 5).toFixed(2) + "deg");
      }
      if (!live) {
        live = true;
        cx = tx;
        cy = ty;
        shot.style.setProperty("--px", cx.toFixed(1) + "px");
        shot.style.setProperty("--py", cy.toFixed(1) + "px");
        shot.classList.add("lit");
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      live = false;
      shot.classList.remove("lit");
      const hello = helloRef.current;
      if (hello) {
        hello.style.setProperty("--hx", "0deg");
        hello.style.setProperty("--hy", "0deg");
      }
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className={"ed-hero" + (entered ? " ed-live" : "")}
      ref={heroRef}
    >
      <span className="ed-rail" aria-hidden="true" />
      <span className="ed-vlabel top">Software Developer</span>
      <span className="ed-vlabel bot">{new Date().getFullYear()}</span>

      <div className="ed-inner">
        <div className="ed-stats ed-anim" style={{ transitionDelay: ".55s" }}>
          <div className="ed-stat">
            <span className="ed-num">
              <sup>+</sup>
              <b>3</b>
            </span>
            <span className="ed-cap">Products shipped</span>
          </div>
          <div className="ed-stat">
            <span className="ed-num">
              <sup>+</sup>
              <b>6</b>
            </span>
            <span className="ed-cap">Languages</span>
          </div>
        </div>

        <h1 className="ed-hello" ref={helloRef}>
          <span>
            <b>Hello</b>
          </span>
        </h1>

        <p className="ed-sub ed-anim" style={{ transitionDelay: ".78s" }}>
          — It&apos;s Laxman, a software developer
        </p>

        <a
          className="ed-scroll ed-anim"
          href="#about"
          style={{ transitionDelay: ".92s" }}
        >
          <i aria-hidden="true" />
          Scroll down
        </a>
      </div>

      <div
        className="ed-shot"
        ref={shotRef}
        data-parallax
        data-speed="-0.08"
        aria-hidden="true"
      >
        <img className="ed-bw" src="/me.png" alt="" draggable="false" />
        <img className="ed-col" src="/me.png" alt="" draggable="false" />
      </div>

      <span className="ed-sr">
        {profile.name} — {profile.role}
      </span>
    </section>
  );
}
