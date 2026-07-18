import Link from "next/link";
import { posts } from "@/lib/blog";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = { title: "Writing — Laxman Bhandari" };

export default function BlogIndex() {
  return (
    <div className="edb">
      <header className="edb-head">
        <Link className="edb-brand" href="/">
          LB<span>.</span>
        </Link>
        <span className="edb-crumb">Writing — Index</span>
        <div className="edb-head-right">
          <ThemeToggle />
          <Link className="edb-back" href="/">
            Back home ↗
          </Link>
        </div>
      </header>

      <div className="edb-hero">
        <span className="edb-count">
          {String(posts.length).padStart(2, "0")} entries
        </span>
        <h1 className="edb-title">Writing</h1>
        <p className="edb-lead">
          Notes on the things I&apos;ve built — what worked, what broke, and
          what I&apos;d do differently.
        </p>
      </div>

      <ol className="edb-list">
        {posts.map((p, i) => {
          const d = new Date(p.date);
          const year = d.getFullYear();
          const date = d
            .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
            .toUpperCase();
          return (
            <li key={p.slug} className="edb-row-wrap">
              <Link className="edb-row" href={`/blog/${p.slug}`}>
                <span className="edb-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="edb-main">
                  <span className="edb-row-title">{p.title}</span>
                  <span className="edb-row-ex">{p.excerpt}</span>
                  <span className="edb-tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                </span>
                <span className="edb-meta">
                  <span className="edb-date">{date}</span>
                  <span className="edb-year">{year}</span>
                  <span className="edb-read">{p.read}</span>
                </span>
                <span className="edb-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
