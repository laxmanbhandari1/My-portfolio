import Link from "next/link";
import { posts } from "@/lib/blog";

export default function BlogTeaser() {
  const top = posts.slice(0, 3);
  return (
    <section id="blog" className="bt">
      <div className="sec-head" data-reveal>
        <span className="sec-eyebrow">From the blog</span>
        <h2 className="sec-title">Latest <span>writing</span>.</h2>
      </div>

      <div className="bt-grid">
        {top.map((p, idx) => {
          const date = new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
          return (
            <Link className="bt-card" href={`/blog/${p.slug}`} key={p.slug} data-reveal style={{ transitionDelay: `${idx * 0.07}s` }}>
              <span className="bt-meta">{date} · {p.read}</span>
              <h3 className="bt-title">{p.title}</h3>
              <p className="bt-ex">{p.excerpt}</p>
              <div className="bt-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <span className="bt-read">Read article <span aria-hidden="true">↗</span></span>
            </Link>
          );
        })}
      </div>

      <div className="bt-more" data-reveal>
        <Link className="hero-btn ghost" href="/blog">View all posts <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
