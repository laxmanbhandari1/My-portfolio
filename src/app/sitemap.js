export default function sitemap() {
  const base = "https://www.laxmanbhandari.com";

  return [
    { url: base, lastModified: new Date() },
    // add your other pages below, for example:
    // { url: `${base}/about`, lastModified: new Date() },
    // { url: `${base}/projects`, lastModified: new Date() },
  ];
}
