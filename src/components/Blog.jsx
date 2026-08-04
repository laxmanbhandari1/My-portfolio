import { posts } from "@/lib/data";
import { SplitReveal } from "./ui/SplitReveal";
import { SnakeLayer } from "./ui/SnakeLayer";

const BLOG_SNAKE = [{ color: "#7c3aed", dark: "#4a1d95", light: "rgba(210,180,255,.55)", pellet: "#7c3aed", pr: "124,58,237" }];

export function Blog() {
  return (
    <section className="section has-snake" id="blog">
      <SnakeLayer colors={BLOG_SNAKE} />
      <div className="section-head container">
        <div className="eyebrow-row">
          <span className="tick" />
          <span className="mono">
            <span className="num">{"// 04"}</span> — Writing
          </span>
        </div>
        <SplitReveal as="h2" className="section-title" text="From the blog." />
      </div>
      <div className="container">
        <div className="post-list">
          {posts.map((post) => (
            <a className="post" key={post.index} href={post.href} target="_blank" rel="noreferrer">
              <span className="post-num">{post.index}</span>
              <div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-blurb">{post.blurb}</p>
                <div className="post-tags">
                  {post.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="post-meta">
                {post.date}
                <br />
                {post.read}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
