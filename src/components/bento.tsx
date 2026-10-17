import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { cards, site, type CardId, type CardContent } from "@/lib/content"
import type { Mark, Placed, Stacked, TitleSize } from "@/lib/layouts"
import { ThemeToggle } from "@/components/theme-toggle"

const titleSizes: Record<TitleSize, string> = {
  sm: "text-[14px]",
  base: "text-[16px]",
  md: "text-[20px]",
  lg: "text-[24px]",
}

const link =
  "rounded-[2px] underline decoration-border underline-offset-4 transition-opacity duration-100 hover:decoration-current active:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

function Card({ id, size, display = 80, className, style }: {
  id: CardId
  size?: TitleSize
  display?: 80 | 120
  className?: string
  style?: CSSProperties
}) {
  const c: CardContent = cards[id]
  const top = c.kind === "nav" ? <ThemeToggle /> : c.label && <p className="font-pixel-circle text-[15px] leading-[1.3] text-faint">{c.label}</p>
  const titleClass = cn(titleSizes[size ?? (c.project ? "md" : "base")], "font-medium leading-[1.3] tracking-[-0.01em] text-balance whitespace-pre-line")

  let main
  if (c.kind === "hero") {
    main = (
      <div className="flex flex-col gap-4">
        <h1 className="font-pixel-circle leading-none" style={{ fontSize: display }}>{site.name}</h1>
        <p className="text-[13px] leading-[1.55] text-muted-foreground text-balance">{site.intro}</p>
      </div>
    )
  } else if (c.kind === "nav") {
    main = (
      <nav aria-label="Main">
        <ul className={cn(titleSizes.base, "flex flex-col gap-1.5 font-medium leading-[1.3] tracking-[-0.01em]")}>
          {site.nav.map((n) => (
            <li key={n.label}>
              {n.href ? (
                <a href={n.href} aria-current={n.current ? "page" : undefined}
                  className={cn(link, "no-underline", n.current ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {n.label}
                </a>
              ) : (
                <span className="text-faint">
                  {n.label} <span className="font-pixel-circle text-[11px]">soon</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
  } else {
    const Title = c.project ? "h2" : "p"
    main = (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {c.kind === "email" && <a href={`mailto:${site.email}`} className={cn(titleClass, link, "w-fit")}>{site.email}</a>}
          {c.kind === "links" && (
            <ul className={cn("flex text-[13px] font-medium leading-[1.3] tracking-[-0.01em]", id === "elsewhereInline" ? "flex-wrap gap-x-10" : "flex-col")}>
              {site.links.map((l) => (
                <li key={l.label}><a href={l.href} className={link}>{l.label}</a></li>
              ))}
            </ul>
          )}
          {c.title && <Title className={titleClass}>{c.title}</Title>}
          {c.body && <p className="text-[13px] leading-[1.55] text-muted-foreground text-pretty whitespace-pre-line">{c.body}</p>}
        </div>
        {c.meta && <p className={cn("text-[12px] leading-[1.3]", c.live ? "text-live" : "text-muted-foreground")}>{c.meta}</p>}
      </div>
    )
  }

  return (
    <article className={cn("card flex flex-col p-6", top ? "justify-between" : "justify-end", className)} style={style}>
      {top}
      {main}
    </article>
  )
}

function Marks({ outer = [], inner = [] }: { outer?: Mark[]; inner?: Mark[] }) {
  const corner = "absolute size-1 bg-mark"
  return (
    <div aria-hidden className="pointer-events-none">
      <span className={cn(corner, "-left-0.5 -top-0.5")} />
      <span className={cn(corner, "-right-0.5 -top-0.5")} />
      <span className={cn(corner, "-left-0.5 -bottom-0.5")} />
      <span className={cn(corner, "-right-0.5 -bottom-0.5")} />
      {[...outer, ...inner].map(([x, y, w, h]) => (
        <span key={`${x},${y}`} className="absolute bg-mark" style={{ left: x, top: y, width: w, height: h }} />
      ))}
    </div>
  )
}

export function FixedBento({ layout, className }: {
  layout: { w: number; h: number; cards: Placed[]; outer: Mark[]; inner: Mark[] }
  className?: string
}) {
  return (
    <div className={cn("bento shrink-0", className)} style={{ width: layout.w, height: layout.h }}>
      {layout.cards.map(({ id, x, y, w, h, size, display }) => (
        <Card key={id} id={id} size={size} display={display} className="absolute" style={{ left: x, top: y, width: w, height: h }} />
      ))}
      <Marks outer={layout.outer} inner={layout.inner} />
    </div>
  )
}

export function StackedBento({ cards: items, className }: { cards: Stacked[]; className?: string }) {
  return (
    <div className={cn("bento bento-phone", className)}>
      {items.map(({ id, span, rows, size }) => (
        <Card key={id} id={id} size={size} style={{ gridColumn: `span ${span}`, gridRow: `span ${rows}` }} />
      ))}
      <Marks />
    </div>
  )
}
