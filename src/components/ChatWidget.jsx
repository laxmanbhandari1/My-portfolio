"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { streamChat } from "@/lib/api";
import { offlineAnswer } from "@/lib/offlineFallback";
import { profile } from "@/lib/data";

const GREETING = `Hi! I'm ${profile.name.split(" ")[0]}'s AI assistant. Ask me anything about his work, skills, or story.`;

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const sessionId = useRef(uid());
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  async function send(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setError("");
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);

    // placeholder assistant bubble we'll stream into
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const history = next.filter((m) => m.content).slice(-20);
      await streamChat(history, sessionId.current, (_chunk, full) => {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: full };
          return copy;
        });
      });
    } catch (err) {
      // Backend unreachable — answer locally instead of showing a raw error,
      // typed out so it still feels like a live reply rather than a dead end.
      const fallback = offlineAnswer(text);
      let shown = "";
      for (const ch of fallback) {
        shown += ch;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: shown };
          return copy;
        });
        await new Promise((r) => setTimeout(r, 8));
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close chat" : "Open chat"}>
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            role="dialog"
            aria-label="Chat with Laxman's AI assistant"
          >
            <div className="chat-head">
              <div>
                <div className="chat-head-title">Ask about {profile.name.split(" ")[0]}</div>
                <div className="chat-head-sub">AI assistant · usually replies instantly</div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>

            <div className="chat-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chat-bubble ${m.role}`}>
                  {m.content || (sending && i === messages.length - 1 ? "…" : "")}
                </div>
              ))}
              {error && <div className="chat-error">{error}</div>}
            </div>

            <form className="chat-input-row" onSubmit={send}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question…"
                disabled={sending}
                aria-label="Message"
              />
              <button type="submit" disabled={sending || !input.trim()} aria-label="Send">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
