// Stacked rounded-card reveal: two sticky cards stack over each other as
// you scroll, flipping the palette from paper to red. This is the
// "card over card" moment that bridges the hero into the content.
export function StackStatement() {
  return (
    <div className="stack">
      <section className="stack-card light">
        <div className="stack-inner">
          <span className="mono">What I do</span>
          <p className="stack-statement">
            I design and build full-stack products — end to end, on my own.
          </p>
        </div>
      </section>
      <section className="stack-card red">
        <div className="stack-inner">
          <span className="mono">How I work</span>
          <p className="stack-statement">
            Ship. Learn. Refine. <em>Accessibility-first</em>, every time.
          </p>
        </div>
      </section>
    </div>
  );
}
