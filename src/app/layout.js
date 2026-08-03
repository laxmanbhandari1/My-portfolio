import "./globals.css";

export const metadata = {
  title: "Laxman Bhandari — Software Developer",
  description:
    "Laxman Bhandari — software developer in London. Full-stack web with a soft spot for game dev. Building simple, intuitive, impactful products.",
  keywords: [
    "Laxman Bhandari",
    "Software Developer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "London",
    "Portfolio",
  ],
  openGraph: {
    title: "Laxman Bhandari — Software Developer",
    description:
      "Full-stack web with a soft spot for game dev. Building simple, intuitive, impactful products.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
