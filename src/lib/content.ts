// All site copy lives here. Edit text and links in this file.
export const site = {
  name: "NSR",
  fullName: "Naga Sai Rakshith",
  intro: "I design and build apps end to end. Now learning to build with AI.",
  email: "email@domain.com",
  links: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "Email", href: "mailto:email@domain.com" },
  ],
  nav: [
    { label: "Work", href: "/", current: true },
    { label: "About" },
    { label: "Notes" },
  ],
}

// A row in a list card. href starting with "/" stays on the site (⟶); anything else leaves it (↗).
export type Item = { label: string; href?: string; prefix?: string; meta?: string }

export type CardContent = {
  label?: string
  title?: string
  body?: string
  meta?: string
  live?: boolean
  project?: boolean
  items?: Item[]
  more?: Item
  link?: Item
  kind?: "hero" | "nav" | "toggle" | "links" | "riva" | "empty"
}

export const cards = {
  hero: { kind: "hero" },
  nav: { kind: "nav" },
  toggle: { kind: "toggle" },
  now: {
    label: "Now",
    title: "Shipping Riva",
    meta: "● Public release Nov 8",
    live: true,
  },
  empty: { kind: "empty" },
  riva: {
    label: "01",
    title: "Riva",
    body: "Encrypted notes, passwords and files you share with family and friends.",
    meta: "Flutter, Next.js, Hono",
    project: true,
  },
  tryRiva: {
    label: "Try Riva",
    kind: "riva",
    link: { label: "rivaspaces.com", href: "https://rivaspaces.com" },
  },
  projects: {
    label: "Projects",
    items: [{ prefix: "01", label: "Riva", href: "/projects/riva" }],
    more: { label: "View All", href: "/projects" },
  },
  caseStudies: {
    label: "Case Studies",
    items: [{ label: "Build logs", meta: "Soon" }],
  },
  stack: {
    label: "Stack",
    items: ["Flutter", "Next.js", "Hono", "Cloudflare", "Postgres"].map((label) => ({ label })),
    more: { label: "View All", href: "/stack" },
  },
  elsewhere: { label: "Elsewhere", kind: "links" },
  colophon: { body: "Designed in Penpot.\nBuilt in Next.js" },
  copyright: { meta: "© 2026" },
} satisfies Record<string, CardContent>

export type CardId = keyof typeof cards
