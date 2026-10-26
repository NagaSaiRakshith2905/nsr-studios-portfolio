"use client"

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react"
import { createPortal } from "react-dom"

const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })

type Tip = { text: string; x: number; y: number }

// Opens on the latest week; a vertical mouse wheel scrolls back through the year
export function HeatmapScroller({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollLeft = el.scrollWidth
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const max = el.scrollWidth - el.clientWidth
      // At either end, let the page scroll instead
      if ((e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft >= max)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    const hide = () => setTip(null)
    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("scroll", hide, { passive: true })
    window.addEventListener("scroll", hide, { passive: true })
    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("scroll", hide)
      window.removeEventListener("scroll", hide)
    }
  }, [])

  // One delegated handler for every square: show its count and date above it
  const onPointerOver = (e: PointerEvent) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>(".contrib[data-date]")
    if (!cell) return setTip(null)
    const count = Number(cell.dataset.count)
    const r = cell.getBoundingClientRect()
    setTip({
      text: `${count} contribution${count === 1 ? "" : "s"} on ${day.format(new Date(cell.dataset.date!))}`,
      x: r.left + r.width / 2,
      y: r.top,
    })
  }

  return (
    <div ref={ref} role="img" aria-label={label} tabIndex={0}
      onPointerOver={onPointerOver} onPointerLeave={() => setTip(null)}
      className="heatmap min-h-0 flex-1 overflow-x-auto overflow-y-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
      {children}
      {/* Portalled: the scroller clips overflow and its size containment would anchor a fixed child */}
      {tip && createPortal(
        <div role="tooltip" style={{ left: tip.x, top: tip.y }}
          className="heatmap-tip pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[12px] leading-[1.3] text-background shadow-md">
          {tip.text}
        </div>,
        document.body,
      )}
    </div>
  )
}
