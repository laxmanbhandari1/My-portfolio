"use client";

import { useEffect, useRef, useState } from "react";
import { profile, stats, quotes } from "@/lib/data";

const StatIcon = {
  stack: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5M3 18l9 5 9-5" />
    </svg>
  ),
  code: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
    </svg>
  ),
  heart: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-7-4.4-9.3-8.5C1 9.5 2.5 6 6 6c2 0 3.2 1.2 4 2.3C10.8 7.2 12 6 14 6c3.5 0 5 3.5 3.3 6.5C19 16.6 12 21 12 21z" />
    </svg>
  ),
};

function MagneticBtn({ className, href, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.26;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const reset = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <a ref={ref} className={className} href={href} data-cursor {...rest}>
      {children}
    </a>
  );
}

function QuoteCarousel() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      const t = setTimeout(() => {
        setI((v) => (v + 1) % quotes.length);
        setShow(true);
      }, 380);
      return () => clearTimeout(t);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const current = quotes[i];

  return (
    <div className="hero-quotes" data-reveal>
      <span className="hq-label">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M7 7h3v6H7a3 3 0 0 1-3-3V8a1 1 0 0 1 1-1zM17 7h3v6h-3a3 3 0 0 1-3-3V8a1 1 0 0 1 1-1z" />
        </svg>
        Words to ship by
      </span>
      <div className={"hq-body" + (show ? " in" : "")}>
        <p className="hq-text">{current.q}</p>
        <span className="hq-author">— {current.a}</span>
      </div>
      <div className="hq-dots">
        {quotes.map((_, idx) => (
          <span key={idx} className={"hq-dot" + (idx === i ? " active" : "")} />
        ))}
      </div>
    </div>
  );
}

export default function Hero({ entered }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const my = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.setProperty("--mx", mx.toFixed(4));
      el.style.setProperty("--my", my.toFixed(4));
    };
    const reset = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <section
      id="top"
      className={"hero" + (entered ? " hero-live" : "")}
      ref={heroRef}
    >
      <div
        className="hero-amb-wrap"
        data-parallax
        data-speed="0.05"
        aria-hidden="true"
      >
        <div className="hero-amb">
          <span className="hero-dots-wrap">
            <span className="hero-dots" />
          </span>
          <span className="hero-blob" />
        </div>
      </div>

      <div className="hero-grid">
        <div className="hero-left" data-reveal>
          <span className="hero-stagger hero-hey">
            Hey, I&apos;m <i />
          </span>
          <h1 className="hero-name">
            <span className="hero-stagger first">LAXMAN</span>
            <span className="hero-stagger last">BHANDARI</span>
          </h1>
          <span className="hero-stagger hero-rule" />
          <p className="hero-stagger hero-role">
            Software Developer <i className="hd" />
          </p>
          <p className="hero-stagger hero-tag">{profile.tagline}</p>
          <MagneticBtn className="hero-stagger hero-btn primary" href="#work">
            View my work <span aria-hidden="true">↗</span>
          </MagneticBtn>
        </div>

        <div className="hero-photo-outer" data-parallax data-speed="0.10">
          <div className="hero-photo-wrap" data-reveal>
            <div className="hero-photo">
              <span className="halo2-wrap">
                <span className="halo2" />
              </span>
              <span className="halo-wrap">
                <span className="halo" />
              </span>
              <span className="ring-wrap">
                <span className="ring" />
              </span>
              <span className="ring-wrap dotted">
                <span className="ring dotted" />
              </span>
              <span className="cross h" />
              <span className="cross v" />
              <img src="/me.png" alt={profile.name} />
            </div>
          </div>
        </div>

        <div className="hero-right-col" data-parallax data-speed="-0.06">
          <QuoteCarousel />
        </div>
      </div>

      <div className="hero-stats" data-reveal>
        {stats.map((s) => (
          <div className="hstat" key={s.k}>
            <span className="hstat-ic">{StatIcon[s.icon]}</span>
            <strong>{s.n}</strong>
            <em>{s.k}</em>
          </div>
        ))}
      </div>

      <div className="hero-connect" data-reveal>
        <span className="hero-connect-label">
          Let&apos;s connect <i />
        </span>
        <div className="hero-socials">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-cursor
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
            </svg>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-cursor
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.5 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" />
            </svg>
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" data-cursor>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
