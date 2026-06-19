export default function About() {
  return (
    <section id="about" className="about">
      <div className="sec-head" data-reveal>
        <div data-parallax data-speed="0.07">
          <span className="sec-eyebrow">About</span>
          <h2 className="sec-title">From <span>Kathmandu</span> to <span>London</span>.</h2>
        </div>
      </div>
      <div className="about-grid">
        <div data-parallax data-speed="0.06">
          <p className="about-lead" data-reveal>
            I&apos;m a software developer focused on full-stack web — with a soft spot for game dev. I learn by building real things:
            a marketplace for the Nepali diaspora, a cybersecurity game, a community platform. I care about clean, accessible,
            intuitive interfaces and shipping work that people actually use.
          </p>
        </div>
        <div data-parallax data-speed="-0.05">
          <div className="about-facts" data-reveal>
            <div><strong>Now</strong><span>Studying computing in London · open to junior roles.</span></div>
            <div><strong>Focus</strong><span>Next.js, React &amp; Supabase — Python / FastAPI on the backend.</span></div>
            <div><strong>Approach</strong><span>Ship, learn, refine. Accessibility-first.</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
