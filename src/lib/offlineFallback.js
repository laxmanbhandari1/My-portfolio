import { profile, roles, projects, skills, essay, posts } from "@/lib/data";

// When the backend is unreachable, we still answer from the same data the
// site itself is built from — keyword-matched, so it feels like a real
// (if simpler) assistant rather than a broken error message.

const OFFLINE_PREFIX = "I'm running in offline mode right now (my AI backend isn't reachable), but here's what I know: ";

function findProject(text) {
  return projects.find((p) => text.includes(p.title.toLowerCase()));
}

export function offlineAnswer(question) {
  const q = question.toLowerCase();

  const project = findProject(q);
  if (project) {
    const bits = [project.description];
    if (project.tech?.length) bits.push(`Built with ${project.tech.join(", ")}.`);
    if (project.liveLink && project.liveLink !== "#") bits.push(`Live at ${project.liveLink}.`);
    return OFFLINE_PREFIX + bits.join(" ");
  }

  if (/(project|work|built|portfolio|shipped)/.test(q)) {
    const list = projects.filter((p) => !p.placeholder).map((p) => p.title).join(", ");
    return `${OFFLINE_PREFIX}${profile.name.split(" ")[0]}'s main projects are ${list}. Ask me about any one of them by name for more detail.`;
  }

  if (/(skill|stack|tech|tool|language|framework)/.test(q)) {
    return `${OFFLINE_PREFIX}he works mainly with ${skills.slice(0, 6).join(", ")}, and more.`;
  }

  if (/(story|about|who (is|are)|background|forest)/.test(q)) {
    return `${OFFLINE_PREFIX}${essay.lead}`;
  }

  if (/(contact|email|reach|hire|connect)/.test(q)) {
    return `${OFFLINE_PREFIX}you can reach him directly at ${profile.email}, or use the contact form on this page.`;
  }

  if (/(role|job|do you do|what does he do|developer|engineer)/.test(q)) {
    const list = roles.map((r) => r.label).join(", ");
    return `${OFFLINE_PREFIX}he's a ${list.toLowerCase()}, based in ${profile.location}.`;
  }

  if (/(blog|write|article|post)/.test(q)) {
    const list = posts.slice(0, 3).map((p) => p.title).join("; ");
    return `${OFFLINE_PREFIX}recent posts include: ${list}.`;
  }

  return (
    OFFLINE_PREFIX +
    `${profile.name} is a ${roles[0]?.label.toLowerCase() || "software developer"} based in ${profile.location}. ` +
    `Try asking about his projects, skills, story, or how to contact him — or email ${profile.email} directly.`
  );
}
