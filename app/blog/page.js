import Link from "next/link";
import { posts } from "@/lib/blog";

export const metadata = { title: "Blog — Laxman Bhandari" };

export default function BlogIndex() {
  return (
    <div className="blogpage">
      <header className="bloghead">
        <Link className="nav-brand" href="/">LB<span>.</span></Link>
        <Link className="blog-back" href="/">← Back home</Link>
      </header>
      <div className="blog-wrap">
        <span className="sec-eyebrow">Writing</span>
        <h1 className="blog-h1">Notes on what I&apos;ve <span>built</span>.</h1>
        <div className="blog-list">
          {posts.map((p) => (
            <Link className="blog-card" href={`/blog/${p.slug}`} key={p.slug}>
              <span className="blog-meta">{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {p.read}</span>
              <h2 className="blog-title">{p.title}</h2>
              <p className="blog-excerpt">{p.excerpt}</p>
              <div className="blog-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <span className="blog-readmore">Read →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
