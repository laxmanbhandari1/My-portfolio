export const posts = [
  {
    slug: "building-byaparhub",
    title: "Building ByaparHub: a marketplace for a diaspora",
    date: "2025-05-12",
    read: "5 min",
    tags: ["Next.js", "Supabase", "Product"],
    excerpt: "Why I built a business directory for the global Nepali community, and what I learned shipping a full-stack product solo.",
    body: [
      "ByaparHub started from a simple frustration: it was hard for the Nepali community abroad to find trusted local businesses and services. I wanted one place for listings, reviews, verified owner dashboards and jobs.",
      "I built it with Next.js and Supabase. Supabase gave me Postgres, auth and storage out of the box, so I could focus on the product instead of plumbing. Prisma kept my data layer typed and predictable.",
      "The hardest part wasn't the code — it was scope. Building solo, I had to cut ruthlessly to ship. I started with listings and search, then added owner verification and reviews once the core loop worked.",
      "Biggest lesson: ship the smallest thing that delivers value, then let real usage tell you what to build next.",
    ],
  },
  {
    slug: "cyberdefend-backend",
    title: "The backend behind CyberDefend Runner",
    date: "2025-03-02",
    read: "4 min",
    tags: ["Godot", "Supabase", "Backend"],
    excerpt: "How I wired a real-time global leaderboard and player profiles into a 3D game built in Godot.",
    body: [
      "CyberDefend Runner is a 3D cybersecurity game built by a team of four. My job was the backend — the part that makes a single-player game feel connected.",
      "I used Supabase as the backend and talked to it from the game over REST. Player profiles, scores and a global leaderboard all live in Postgres, with row-level security so players can only write their own scores.",
      "The interesting challenge was trust: a client sending its own score can lie. I added server-side checks and rate limits to keep the leaderboard honest.",
      "Working across a game engine and a web backend taught me how to design a clean API boundary between two very different worlds.",
    ],
  },
  {
    slug: "accessibility-first-society",
    title: "Accessibility-first: SocietysubidhaHub",
    date: "2024-11-20",
    read: "4 min",
    tags: ["Accessibility", "HTML", "CSS"],
    excerpt: "Building a residential community platform with ARIA and full keyboard navigation from day one.",
    body: [
      "SocietysubidhaHub is a platform for residential communities — facilities, events, amenity booking and complaint tracking. I built it with plain HTML, CSS and JavaScript, on purpose.",
      "I wanted to prove you don't need a heavy framework to build something usable and accessible. Every interactive element is reachable by keyboard, every control has a proper label, and the markup is semantic.",
      "Accessibility isn't a feature you add at the end — it's a constraint that makes your whole design clearer. Designing for screen readers forced me to structure content better for everyone.",
      "If you only test with a mouse, you've only tested half your users.",
    ],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
