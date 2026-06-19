"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${f.name || "someone"}`);
    const body = encodeURIComponent(`${f.message}\n\n— ${f.name}\n${f.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }
  function copy() {
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <section id="contact" className="ct">
      <div className="ct-wrap">
        <div className="ct-left" data-reveal>
          <div data-parallax data-speed="0.05">
            <span className="sec-eyebrow">Say hello</span>
            <h2 className="ct-title">Let&apos;s build<br />something <span>good</span>.</h2>
            <p className="ct-sub">Open to junior roles, internships and freelance — tell me what you&apos;re working on.</p>
            <button className="ct-mail" onClick={copy} aria-label="Copy email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              {copied ? "Copied ✓" : profile.email}
            </button>
            <div className="ct-social">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" /></svg>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.5 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div data-parallax data-speed="-0.04">
          <form className="ct-form" data-reveal onSubmit={submit}>
          <label className="ct-field">
            <span>Name</span>
            <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" required />
          </label>
          <label className="ct-field">
            <span>Email</span>
            <input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@email.com" required />
          </label>
          <label className="ct-field">
            <span>Message</span>
            <textarea rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="What's on your mind?" required />
          </label>
          <button type="submit" className="ct-send">Send message <span aria-hidden="true">↗</span></button>
          </form>
        </div>
      </div>
    </section>
  );
}
