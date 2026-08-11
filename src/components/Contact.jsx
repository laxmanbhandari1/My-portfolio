"use client";
import { useState } from "react";
import { profile } from "@/lib/data";
import { sendContact } from "@/lib/api";
import { PeekingCharacters } from "./ui/PeekingCharacters";
import { Icon } from "./ui/Icons";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState("");
  const [focusField, setFocusField] = useState(null);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await sendContact(form);
      setStatus("done");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong — please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="contact-form-done">
        <span className="dot" /> Message sent — thanks! I&apos;ll get back to you soon.
        <button className="contact-form-again" onClick={() => setStatus("idle")}>Send another</button>
      </div>
    );
  }

  return (
    <div className="contact-form-wrap">
      <PeekingCharacters focusField={focusField} passwordVisible={false} />

      <form className="contact-form" onSubmit={submit}>
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={update("website")}
          className="contact-hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <div className="contact-form-row">
          <label>
            <span>Name</span>
            <input
              type="text" required value={form.name} onChange={update("name")}
              onFocus={() => setFocusField("name")} onBlur={() => setFocusField(null)}
              placeholder="Your name"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email" required value={form.email} onChange={update("email")}
              onFocus={() => setFocusField("email")} onBlur={() => setFocusField(null)}
              placeholder="you@email.com"
            />
          </label>
        </div>
        <label>
          <span>Message</span>
          <textarea
            required rows={4} value={form.message} onChange={update("message")}
            onFocus={() => setFocusField("message")} onBlur={() => setFocusField(null)}
            placeholder="What's on your mind?"
          />
        </label>
        {status === "error" && <div className="contact-form-error">{errorMsg}</div>}
        <button type="submit" className="contact-form-submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="contact">
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

        <ContactForm />
      </div>

      <div className="contact-links">
        <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link">
          <span className="cl-icon"><Icon name="github" /></span>
          <span className="cl-text">GitHub</span>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link">
          <span className="cl-icon"><Icon name="linkedin" /></span>
          <span className="cl-text">LinkedIn</span>
        </a>
        <a href={`mailto:${profile.email}`} className="contact-link">
          <span className="cl-icon"><Icon name="mail" /></span>
          <span className="cl-text">Email</span>
        </a>
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
