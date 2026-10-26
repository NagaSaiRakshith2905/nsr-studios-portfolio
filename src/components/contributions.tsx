import { getContributions } from "@/lib/github"

// Placeholder shape while there is no data: a year of empty days
const blank = Array.from({ length: 53 }, () => Array.from({ length: 7 }, () => ({ date: "", count: 0, level: 0 as const })))

// A year of squares, right-aligned so narrow cards clip the oldest weeks first
export async function Contributions() {
  const cal = await getContributions()
  const weeks = cal?.weeks ?? blank
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-baseline justify-between gap-2">
        {/* Same treatment as the other cards' labels */}
        <p className="font-hero text-[12px] leading-[1.3] tracking-[0.125em] uppercase text-faint">GitHub</p>
        {cal && <p className="text-[12px] leading-[1.3] text-muted-foreground">{cal.total.toLocaleString("en-US")} this year</p>}
      </div>
      <div className="flex justify-end gap-[2px] overflow-hidden" role="img"
        aria-label={cal ? `${cal.total} GitHub contributions in the last year` : "GitHub contributions"}>
        {weeks.map((week, i) => (
          <div key={i} className="flex shrink-0 flex-col gap-[2px]">
            {week.map((d, j) => (
              <span key={j} className="contrib size-[7px] rounded-[1px]" data-level={d.level}
                title={d.date ? `${d.count} on ${d.date}` : undefined} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
