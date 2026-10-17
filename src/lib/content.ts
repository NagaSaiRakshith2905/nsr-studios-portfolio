// All site copy lives here. Edit text and links in this file.
export const site = {
  name: "NSR",
  intro: "Developer learning to build with AI, one project at a time.",
  email: "email@domain.com",
  links: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
  ],
  nav: [
    { label: "Work", href: "/", current: true },
    { label: "About" },
    { label: "Notes" },
    { label: "Contact", href: "mailto:email@domain.com" },
  ],
};

export type CardContent = {
  label?: string;
  title?: string;
  body?: string;
  meta?: string;
  live?: boolean;
  project?: boolean;
  kind?: "hero" | "nav" | "email" | "links";
};

// Non-breaking spaces keep the path from wrapping anywhere but before an arrow.
const path = "Next.js -> Spring Boot -> Python";

export const cards = {
  hero: { kind: "hero" },
  now: {
    label: "Now",
    title: "Building Persona Chat",
    meta: "● In progress",
    live: true,
  },
  focus: { label: "Focus", title: "AI apps,\nend to end" },
  focusLong: { label: "Focus", title: "Learning to build AI apps end to end" },
  persona: {
    label: "01",
    title: "Persona Chat",
    body: "Chat with AI personas, each with its own voice. Replies stream in as they're written.",
    meta: "Next.js, AI SDK",
    project: true,
  },
  springBoot: {
    label: "02",
    title: "Spring Boot",
    body: "Next on the learning path.",
    meta: "Up next",
    project: true,
  },
  python: {
    label: "03",
    title: "Python",
    body: "After Spring Boot.",
    meta: "Later",
    project: true,
  },
  language: { label: "Language", title: "TypeScript" },
  framework: { label: "Framework", title: "Next.js" },
  path: { label: "Path", title: path },
  toolkit: {
    label: "Toolkit",
    body: "shadcn/ui, AI SDK\nDrizzle, Better Auth",
  },
  nav: { kind: "nav" },
  contact: { label: "Contact", kind: "email" },
  elsewhere: { label: "Elsewhere", kind: "links", meta: "© 2026" },
  elsewhereInline: { label: "Elsewhere", kind: "links" },
  notes: {
    label: "Notes",
    title: "Coming soon",
    body: "What I learn building each project.",
  },
  colophon: {
    label: "Colophon",
    body: "Set in Geist Mono.\nDesigned in Penpot.",
    meta: "© 2026 NSR",
  },
} satisfies Record<string, CardContent>;

export type CardId = keyof typeof cards;
