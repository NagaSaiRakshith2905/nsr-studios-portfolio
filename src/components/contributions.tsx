import { getContributions } from "@/lib/github"

// Placeholder shape while there is no data: a year of empty days
const blank = Array.from({ length: 53 }, () => Array.from({ length: 7 }, (_, i) => ({ date: "", count: 0, level: 0 as const, row: i })))

// The whole calendar year like the GitHub profile: one column per week, squares sized to fit the card
export async function Contributions() {
  const cal = await getContributions()
  // The first week of the year starts mid-week, so place each day on its weekday row
  const weeks = cal?.weeks.map((w) => w.map((d) => ({ ...d, row: new Date(d.date).getUTCDay() }))) ?? blank
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-baseline justify-between gap-2">
        {/* Same treatment as the other cards' labels */}
        <p className="font-hero text-[12px] leading-[1.3] tracking-[0.125em] uppercase text-faint">GitHub</p>
        {cal && <p className="text-[12px] leading-[1.3] text-muted-foreground">{cal.total.toLocaleString("en-US")} in {cal.year}</p>}
      </div>
      <div className="grid gap-px" role="img"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`, gridTemplateRows: "repeat(7, auto)" }}
        aria-label={cal ? `${cal.total} GitHub contributions in ${cal.year}` : "GitHub contributions"}>
        {weeks.flatMap((week, i) => week.map((d) => (
          <span key={`${i}-${d.row}`} className="contrib aspect-square rounded-[1px]" data-level={d.level}
            style={{ gridColumn: i + 1, gridRow: d.row + 1 }}
            title={d.date ? `${d.count} on ${d.date}` : undefined} />
        )))}
      </div>
    </div>
  )
}
