import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { cards, site, type CardId, type CardContent, type Item } from "@/lib/content"
import type { Lines, Mark, Placed, Stacked, TitleSize } from "@/lib/layouts"
import { FIELD } from "@/lib/dissolve"
import { DissolveCanvas } from "@/components/dissolve-canvas"
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
  // 12px puts Circle Grid's 0.125em dot pitch on 3 device px at 2x; 0.125em tracking = one empty dot column
  const top = c.label && <p className="font-hero text-[12px] leading-[1.3] tracking-[0.125em] uppercase text-faint">{c.label}</p>
  const titleClass = cn(titleSizes[size ?? (c.project ? "md" : "base")], "font-medium leading-[1.3] tracking-[-0.01em] text-balance whitespace-pre-line")
  const listClass = "flex flex-col gap-1 text-[13px] font-medium leading-[1.3] tracking-[-0.01em]"

  let main
  if (c.kind === "hero") {
    main = (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-hero leading-none tracking-[0.125em]" style={{ fontSize: display }}>{site.name}</h1>
          <p className={cn(titleSizes.base, "font-medium leading-[1.3] tracking-[-0.01em]")}>
            {site.fullName.replace(/\S+$/, "")}
            <span className="underline decoration-wavy decoration-1 underline-offset-4">{site.fullName.split(" ").at(-1)}</span>
          </p>
        </div>
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
                <span className="text-faint">{n.label}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
  } else if (c.kind === "toggle") {
    main = <ThemeToggle />
  } else if (c.kind === "riva") {
    main = c.link && <ItemLink item={c.link} className={titleClass} />
  } else if (c.items) {
    main = (
      <ul className={listClass}>
        {c.items.map((item) => (
          <li key={item.label} className="flex items-baseline justify-between gap-2">
            <span>
              {item.prefix && <span className="mr-2 text-muted-foreground">{item.prefix}</span>}
              {item.href ? <ItemLink item={item} /> : item.label}
            </span>
            {item.meta && <span className="text-[12px] font-normal text-muted-foreground">{item.meta}</span>}
          </li>
        ))}
        {c.more && <li className="mt-2"><ItemLink item={c.more} /></li>}
      </ul>
    )
  } else if (c.kind !== "empty") {
    const Title = c.project ? "h2" : "p"
    main = (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {c.kind === "links" && (
            <ul className={cn(listClass, "gap-0")}>
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

  // The toggle button fills its card edge to edge, so the whole card is the hit area
  const justify = c.kind === "toggle" ? "" : c.kind === "nav" ? "justify-start" : top ? "justify-between" : "justify-end"
  return (
    <article className={cn("card flex flex-col", c.kind !== "toggle" && "p-6", justify, c.kind === "riva" && "card-riva", className)} style={style}>
      {top}
      {main}
    </article>
  )
}

// Same-site links get a long arrow; links that leave the site get a diagonal one.
function ItemLink({ item, className }: { item: Item; className?: string }) {
  const external = !item.href?.startsWith("/")
  return (
    <a href={item.href} className={cn(link, "no-underline", className)} {...(external && { target: "_blank", rel: "noreferrer" })}>
      {item.label} <span aria-hidden>{external ? "↗" : "⟶"}</span>
    </a>
  )
}

function Marks({ outer = [], inner = [] }: { outer?: Mark[]; inner?: Mark[] }) {
  const corner = "absolute size-1 bg-mark"
  return (
    // absolute: otherwise the phone grid gives this wrapper its own empty row
    <div aria-hidden className="pointer-events-none absolute inset-0">
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

// Behind the cards: patches of page colour that dissolve the dashed grid, then the blueprint lines,
// each fading from the bento's edge out to the end of the field.
function Field({ w, h, lines }: { w: number; h: number; lines: Lines }) {
  const fade = (dir: string) => `linear-gradient(to ${dir}, var(--border), transparent)`
  return (
    <div aria-hidden className="pointer-events-none absolute z-[-1]" style={{ inset: `-${FIELD.y}px -${FIELD.x}px` }}>
      <DissolveCanvas w={w} h={h} />
      {[
        ...lines.y.flatMap((y): CSSProperties[] => [
          { left: 0, top: FIELD.y + y - 0.5, width: FIELD.x, height: 1, background: fade("left") },
          { right: 0, top: FIELD.y + y - 0.5, width: FIELD.x, height: 1, background: fade("right") },
        ]),
        ...lines.x.flatMap((x): CSSProperties[] => [
          { left: FIELD.x + x - 0.5, top: 0, width: 1, height: FIELD.y, background: fade("top") },
          { left: FIELD.x + x - 0.5, bottom: 0, width: 1, height: FIELD.y, background: fade("bottom") },
        ]),
      ].map((style, i) => <span key={i} className="absolute" style={style} />)}
    </div>
  )
}

export function FixedBento({ layout, className }: {
  layout: { w: number; h: number; cards: Placed[]; outer: Mark[]; inner: Mark[]; lines: Lines }
  className?: string
}) {
  return (
    <div className={cn("bento bento-field shrink-0", className)} style={{ width: layout.w, height: layout.h }}>
      <Field w={layout.w} h={layout.h} lines={layout.lines} />
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
