import Link from "next/link";
import { posts } from "@/lib/blog";

export default function BlogTeaser() {
  const top = posts.slice(0, 3);
  return (
    <section id="blog" className="bt">
      <div className="sec-head" data-reveal>
        <span className="sec-eyebrow">From the blog</span>
        <h2 className="sec-title">
          Latest <span>writing</span>.
        </h2>
      </div>

      <ol className="btx-list" data-reveal>
        {top.map((p, i) => {
          const d = new Date(p.date);
          const date = d
            .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
            .toUpperCase();
          return (
            <li className="btx-row-wrap" key={p.slug}>
              <Link className="btx-row" href={`/blog/${p.slug}`}>
                <span className="btx-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="btx-main">
                  <span className="btx-title">{p.title}</span>
                  <span className="btx-ex">{p.excerpt}</span>
                  <span className="btx-tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                </span>
                <span className="btx-meta">
                  <span className="btx-date">{date}</span>
                  <span className="btx-read">{p.read}</span>
                </span>
                <span className="btx-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="bt-more" data-reveal>
        <Link className="hero-btn ghost" href="/blog">
          View all posts <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
