"use client"

import { useEffect, useRef } from "react"
import { cells, cover, FIELD } from "@/lib/dissolve"

// Paints page-colour patches over the dashed grid, redrawn as the water waves move.
// Reduced motion: one still frame.
export function DissolveCanvas({ w, h }: { w: number; h: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const list = cells(w, h)
    const W = w + 2 * FIELD.x
    const H = h + 2 * FIELD.y
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const draw = (s: number) => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = getComputedStyle(canvas).color // currentColor = --background, so theme switches just work
      for (const c of list) {
        const a = cover(c, s)
        if (a < 0.01) continue
        ctx.globalAlpha = a
        ctx.fillRect(c.x + FIELD.x, c.y + FIELD.y, 40, 40)
      }
    }

    const still = window.matchMedia("(prefers-reduced-motion: reduce)")
    let raf = 0
    const loop = (ms: number) => {
      raf = requestAnimationFrame(loop)
      if (!canvas.offsetParent) return // skip the layout that's hidden at this width
      draw(ms / 1000)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      draw(still.matches ? 0 : performance.now() / 1000) // paint now, so the full grid never flashes before the first frame
      if (!still.matches) raf = requestAnimationFrame(loop)
    }
    start()
    still.addEventListener("change", start)
    // repaint the still frame when the theme flips
    const themed = new MutationObserver(() => still.matches && draw(0))
    themed.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => {
      cancelAnimationFrame(raf)
      still.removeEventListener("change", start)
      themed.disconnect()
    }
  }, [w, h])

  return <canvas ref={ref} className="absolute inset-0 size-full text-background" />
}
