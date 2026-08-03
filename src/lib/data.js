// ─────────────────────────────────────────────────────────────
//  Single source of truth for portfolio content.
//  Edit here to update the whole site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Laxman Bhandari",
  role: "Software Developer",
  location: "London",
  email: "hello@laxmanbhandari.com",
  github: "https://github.com/laxmanbhandari1",
  linkedin: "https://www.linkedin.com/",
  hook: "From Kathmandu to London — I learn by building real products people actually use.",
  about:
    "I'm a software developer focused on full-stack web, with a soft spot for game dev. I learn by building real things — a marketplace for the Nepali diaspora, a cybersecurity game, a community platform. I care about clean, accessible, intuitive interfaces and shipping work people actually use.",
  stats: [
    { value: "3+", label: "Products shipped" },
    { value: "6", label: "Languages" },
    { value: "2026", label: "Portfolio" },
  ],
};

export const roles = [
  { label: "Full-stack developer", detail: "Next.js, React & Supabase", icon: "code" },
  { label: "Game-dev backend", detail: "Godot, real-time leaderboards", icon: "gamepad" },
  { label: "Accessibility-first", detail: "ARIA, full keyboard nav", icon: "book" },
];

export const projects = [
  {
    id: "algoflow",
    index: "01",
    title: "AlgoFlow",
    // TODO: replace this placeholder with the real AlgoFlow details.
    placeholder: true,
    tagline: "— details coming soon —",
    description:
      "Placeholder card. Drop the real AlgoFlow write-up here: what it does, the problem it solves, and how it's built.",
    tech: ["TBD", "TBD", "TBD"],
    liveLink: "#",
    githubLink: "#",
    image: "/projects/algoflow.png",
    accent: "red",
  },
  {
    id: "byaparhub",
    index: "02",
    title: "ByaparHub",
    tagline: "A marketplace for a diaspora",
    description:
      "A business directory for the global Nepali community — listings, reviews, verified owner dashboards and jobs. Designed, built and launched solo.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Prisma"],
    liveLink: "https://www.byaparhub.com",
    githubLink: "https://github.com/laxmanbhandari1",
    image: "/projects/byaparhub.png",
    accent: "ink",
  },
  {
    id: "cyberdefend",
    index: "03",
    title: "CyberDefend Runner",
    tagline: "Backend for a 3D game",
    description:
      "A 3D cybersecurity game. I built the backend — a real-time global leaderboard and player profiles, wired from the game over REST.",
    tech: ["Godot 4", "GDScript", "Supabase"],
    liveLink: "https://cyberdefendrun.netlify.app",
    githubLink: "https://github.com/laxmanbhandari1/CYBERRUN",
    image: "/projects/cyberdefend.png",
    accent: "ink",
  },
  {
    id: "society",
    index: "04",
    title: "SocietysubidhaHub",
    tagline: "Accessibility-first community platform",
    description:
      "A residential community platform — facilities, events, amenity booking and complaint tracking. Built accessibility-first with ARIA and full keyboard navigation.",
    tech: ["HTML", "CSS", "JavaScript", "Accessibility"],
    liveLink: "https://societysubidhahubv1.netlify.app",
    githubLink: "https://github.com/laxmanbhandari1/sobidhasociety",
    image: "/projects/society.png",
    accent: "ink",
  },
];

export const skills = [
  "JavaScript / React",
  "Next.js",
  "HTML / CSS",
  "Python / FastAPI",
  "PostgreSQL / Supabase",
  "Prisma / REST APIs",
  "Godot / GDScript",
  "Git · Figma · Vercel",
];

export const posts = [
  {
    index: "01",
    title: "Building ByaparHub: a marketplace for a diaspora",
    blurb:
      "Why I built a business directory for the global Nepali community, and what I learned shipping a full-stack product solo.",
    tags: ["Next.js", "Supabase", "Product"],
    date: "12 MAY",
    read: "5 min",
    href: "https://www.laxmanbhandari.com/blog/building-byaparhub",
  },
  {
    index: "02",
    title: "The backend behind CyberDefend Runner",
    blurb:
      "How I wired a real-time global leaderboard and player profiles into a 3D game built in Godot.",
    tags: ["Godot", "Supabase", "Backend"],
    date: "02 MAR",
    read: "4 min",
    href: "https://www.laxmanbhandari.com/blog/cyberdefend-backend",
  },
  {
    index: "03",
    title: "Accessibility-first: SocietysubidhaHub",
    blurb:
      "Building a residential community platform with ARIA and full keyboard navigation from day one.",
    tags: ["Accessibility", "HTML", "CSS"],
    date: "20 NOV",
    read: "4 min",
    href: "https://www.laxmanbhandari.com/blog/accessibility-first-society",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "#blog" },
  { label: "Skills", href: "#skills" },
];
