import { profile } from "@/lib/data";
import { SnakeLayer } from "./ui/SnakeLayer";

const YELLOW = [{ color: "#f0a500", dark: "#a86e00", light: "rgba(255,236,160,.6)", pellet: "#f0a500", pr: "240,165,0" }];

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="contact has-snake">
        <SnakeLayer colors={YELLOW} />
        <div className="eyebrow-row" style={{ justifyContent: "center" }}>
          <span className="tick" />
          <span className="mono" style={{ color: "rgba(255,255,255,.6)" }}>
            Say hello
          </span>
        </div>
        <h2 className="section-title">
          Let&apos;s build something good<span className="dot">.</span>
        </h2>
        <div>
          <a href={`mailto:${profile.email}`} className="contact-email">
            {profile.email}
          </a>
        </div>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span className="mono">Built with Next.js</span>
    </footer>
  );
}
