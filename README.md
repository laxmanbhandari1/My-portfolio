# Laxman Bhandari — Portfolio (Next.js)

A cinematic portfolio: an animated **entry gate** (signature draws in) → a **glass-shatter**
transition → the **marigold home/hero** → about → colourful **project cards** → skills → contact.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy (free)
Push to GitHub and import on **Vercel** — zero config. Or `npm run build` then `npm start`.

## Make it yours
- **Your photo:** replace `public/me.png` with your background-removed PNG (portrait, transparent bg).
- **Project images:** swap `public/projects/*.png` with real screenshots.
- **Text, links, email, projects, skills, stats:** all in `lib/data.js`
  (email is `hello@laxmanbhandari.com`, with `official@laxmanbhandari.com` in the footer).
- **Accent colour:** change `--gold` in `app/globals.css`.
- The signature uses the **Dancing Script** Google font — it renders as flowing cursive in a real browser.

## Structure
- `components/Gate.jsx` — intro signature + glass-shatter
- `components/Hero.jsx` — marigold home
- `components/Projects.jsx` — colourful project cards
- `components/About / Skills / Contact / Nav` — the rest
- `components/Site.jsx` — ties it together (gate → reveal → scroll animations)

## What's included (latest)
- **Entry gate → glass-shatter → home** (kept; plays on every load).
- **Projects carousel** — 4 projects, 3 visible, tilted/animated cards; the side arrows slide the window (first hides as the 4th appears). Edit/add projects in `lib/data.js`.
- **Blog** at `/blog` with individual post pages. Edit posts in `lib/blog.js`.
- **Contact form** (name/email/message). On submit it opens the visitor's mail app to `hello@laxmanbhandari.com`.
  - Want messages saved to a database instead? Tell me and I'll wire the form to **Supabase** (needs your project URL + anon key in `.env.local`).
- Nav: **Blog** replaces Play.
