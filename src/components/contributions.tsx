import { getContributions, type Day } from "@/lib/github"
import { HeatmapScroller } from "@/components/heatmap-scroller"

const month = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" })

// Placeholder shape while there is no data: a year of empty days
const blank: Day[][] = Array.from({ length: 53 }, () => Array.from({ length: 7 }, () => ({ date: "", count: 0, level: 0 })))

// This year's calendar as large squares that fill the card's height. It scrolls sideways and
// opens on the current week; months and the count overlay it on hover.
export async function Contributions() {
  const cal = await getContributions()
  const weeks = cal?.weeks ?? blank

  // Label a week where a new month starts, skipping a partial first month so labels don't collide
  const months: { col: number; label: string }[] = []
  weeks.forEach((w, i) => {
    const d = w.at(-1)?.date
    if (!d) return
    const m = new Date(d).getUTCMonth()
    const prev = weeks[i - 1]?.at(-1)?.date
    if (prev && new Date(prev).getUTCMonth() === m) return
    if (i === 0 && new Date(weeks[2]?.at(-1)?.date ?? d).getUTCMonth() !== m) return
    months.push({ col: i, label: month.format(new Date(d)) })
  })

  const label = cal ? `${cal.total} GitHub contributions in ${cal.year}` : "GitHub contributions"
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between gap-2 px-3 pt-2 pb-1">
        <p className="font-hero text-[12px] leading-[1.3] tracking-[0.125em] uppercase text-faint">GitHub</p>
        {cal && <p className="text-[12px] leading-[1.3]">{cal.total.toLocaleString("en-US")} in {cal.year}</p>}
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-2">
        <HeatmapScroller label={label}>
          <div className="heatmap-grid relative grid h-full w-max gap-[2px]"
            style={{ gridTemplateRows: "14px repeat(7, var(--cell))", gridAutoColumns: "var(--cell)" }}>
            {months.map((m) => (
              <span key={m.col} aria-hidden className="whitespace-nowrap text-[11px] leading-[14px]"
                style={{ gridColumn: m.col + 1, gridRow: 1 }}>{m.label}</span>
            ))}
            {weeks.flatMap((week, i) => week.map((d, j) => {
              // The first week of the year starts mid-week, so place each day on its weekday row
              const row = d.date ? new Date(d.date).getUTCDay() : j
              return (
                <span key={`${i}-${row}`} className="contrib" data-level={d.level}
                  style={{ gridColumn: i + 1, gridRow: row + 2 }}
                  title={d.date ? `${d.count} on ${d.date}` : undefined} />
              )
            }))}
          </div>
        </HeatmapScroller>
      </div>
    </div>
  )
}
