# Laxman Bhandari — Portfolio (Next.js)

A cinematic white-and-red portfolio: a landing gate that hands off to the home
page via a solid red-wipe transition, then a 3D scroll-tilt About, a
horizontal-scroll Projects section, and a stacked-card statement — all in one
Next.js App Router project.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

Build for production:

```bash
npm run build && npm start
```

## Stack

- **Next.js 14** (App Router, JavaScript)
- **Framer Motion** — all scroll-linked animations
- Plain CSS design system in `src/app/globals.css`
- Fonts loaded at runtime: Bricolage Grotesque (display), Instrument Sans
  (body), JetBrains Mono (labels)

## Where things live

```
src/
  app/
    layout.js         fonts + SEO metadata
    page.js           renders <Experience/>
    globals.css       the whole white/red design system + tokens
  components/
    Experience.jsx    orchestrates gate → red-wipe → home
    Landing.jsx       the intro gate
    Nav.jsx  Hero.jsx  StackStatement.jsx
    About.jsx         3D scroll-tilt reveal
    Projects.jsx      horizontal-scroll panels
    Skills.jsx  Blog.jsx  Contact.jsx
    ui/
      ContainerScroll.jsx   the tilt engine
      HorizontalScroll.jsx  the pinned vertical→horizontal engine
      Icons.jsx
  lib/
    data.js           ← EDIT THIS to change all content
```

## To finish (placeholders)

1. **AlgoFlow** — open `src/lib/data.js`, find the `algoflow` entry (marked
   `placeholder: true`) and fill in `title`, `tagline`, `description`, `tech`,
   `liveLink`, `githubLink`. Then set `placeholder: false`.
2. **Project screenshots** — drop images in `public/projects/` matching the
   `image` paths in `data.js` (e.g. `public/projects/byaparhub.png`). Until
   then, each card shows a labelled placeholder telling you the expected path.
3. **Colors / copy / links** — everything is tokenised. Palette lives at the top
   of `globals.css` (`--red`, `--ink`, etc.); all text lives in `data.js`.

## Design notes

- The signature moment is the **landing → home red wipe** (in `Experience.jsx`).
- `prefers-reduced-motion` is respected — the wipe and orbital animation are
  skipped for users who ask for reduced motion.
- The horizontal Projects scroll is desktop-first; on narrow screens the panels
  stack vertically.
