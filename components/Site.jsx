"use client";

import { useEffect, useState } from "react";
import Gate from "@/components/Gate";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import BlogTeaser from "@/components/BlogTeaser";
import Contact from "@/components/Contact";
import { profile } from "@/lib/data";

export default function Site() {
  const [entered, setEntered] = useState(false);
  const [shattering, setShattering] = useState(false);
  const showContent = shattering || entered;

  // lock scroll while the gate is up
  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    if (entered) window.scrollTo(0, 0);
  }, [entered]);

  // scroll reveal + progress bar + sticky nav once we're in
  useEffect(() => {
    if (!entered) return;
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.14 }
    );
    els.forEach((el) => io.observe(el));
    const t = setTimeout(() => els.forEach((el) => el.classList.add("in")), 2500);

    const bar = document.getElementById("sb");
    const onScroll = () => {
      const h = document.documentElement;
      const sp = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar) bar.style.setProperty("--sp", `${Math.min(sp, 1) * 100}%`);
      h.classList.toggle("scrolled", h.scrollTop > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, [entered]);

  // global scroll parallax — rAF loop with lerp smoothing for a fluid, premium feel
  useEffect(() => {
    if (!entered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll("[data-parallax]")).map((el) => ({
      el,
      speed: parseFloat(el.dataset.speed) || 0,
      current: 0,
      target: 0,
    }));
    let raf = null;

    const measure = () => {
      const center = window.innerHeight * 0.5;
      els.forEach((item) => {
        const rect = item.el.getBoundingClientRect();
        const offset = rect.top + rect.height * 0.5 - center;
        item.target = offset * item.speed;
      });
    };

    const tick = () => {
      let stillMoving = false;
      els.forEach((item) => {
        const diff = item.target - item.current;
        if (Math.abs(diff) > 0.05) {
          item.current += diff * 0.12;
          stillMoving = true;
        } else {
          item.current = item.target;
        }
        item.el.style.transform = `translate3d(0, ${item.current.toFixed(2)}px, 0)`;
      });
      raf = stillMoving ? requestAnimationFrame(tick) : null;
    };

    const kick = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
    kick();
    // settle into place even if scroll never fires (first paint)
    measure();
    els.forEach((item) => { item.current = item.target; item.el.style.transform = `translate3d(0, ${item.current.toFixed(2)}px, 0)`; });

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [entered]);

  return (
    <>
      <div className="scrollbar" id="sb"><i /></div>
      {!entered && (
        <Gate
          onShatterStart={() => setShattering(true)}
          onDone={() => { setShattering(false); setEntered(true); }}
        />
      )}
      <div className={showContent ? "site-content" : "site-content site-hidden"} aria-hidden={!showContent}>
        <Nav />
        <main>
          <Hero entered={entered} />
          <About />
          <Projects />
          <Skills />
          <BlogTeaser />
          <Contact />
        </main>
        <footer className="foot">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <div className="foot-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" /></svg>
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            </a>
            <span>{profile.emailAlt}</span>
          </div>
        </footer>
      </div>
    </>
  );
}
