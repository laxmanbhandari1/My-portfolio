import { posts } from "@/lib/data";
import { SplitReveal } from "./ui/SplitReveal";

export function Blog() {
  return (
    <section className="section" id="blog">
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
