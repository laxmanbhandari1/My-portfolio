import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export function generateMetadata({ params }) {
  const p = getPost(params.slug);
  return { title: p ? `${p.title} — Laxman Bhandari` : "Post" };
}

export default function Post({ params }) {
  const p = getPost(params.slug);
  if (!p) return notFound();
  return (
    <div className="blogpage">
      <header className="bloghead">
        <Link className="nav-brand" href="/">LB<span>.</span></Link>
        <Link className="blog-back" href="/blog">← All posts</Link>
      </header>
      <article className="post-wrap">
        <span className="blog-meta">{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {p.read}</span>
        <h1 className="post-title">{p.title}</h1>
        <div className="blog-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <div className="post-body">{p.body.map((para, i) => <p key={i}>{para}</p>)}</div>
        <Link className="ct-send post-cta" href="/blog">← Back to all posts</Link>
      </article>
    </div>
  );
}
