// "Random dissolve" from the Penpot C2 frames: 40px cells around the bento that hide the dashed grid,
// more often the further they sit from the bento. Animated as water: slow interfering waves push each
// cell over or under its own random threshold, so patches of grid drift in and out.
export const FIELD = { x: 480, y: 280 } // how far the grid reaches past the bento (the 1920x1080 frame's margins)

// x, y: cell's top-left relative to the bento; p: chance of being hidden (0 at the bento, 1 at the edge); r: its threshold
export type Cell = { x: number; y: number; p: number; r: number }

export function cells(w: number, h: number, seed = 7): Cell[] {
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const out: Cell[] = []
  // column-major, like the Penpot script, so the random sequence lines up
  for (let x = -FIELD.x; x < w + FIELD.x; x += 40) {
    for (let y = -FIELD.y; y < h + FIELD.y; y += 40) {
      const dx = Math.max(0, -(x + 40), x - w)
      const dy = Math.max(0, -(y + 40), y - h)
      const t = Math.min(1, Math.max(0, (Math.max(dx / (FIELD.x - 40), dy / (FIELD.y - 40)) - 0.05) / 0.95))
      if (t === 0) continue
      out.push({ x, y, p: t ** 0.9, r: rand() })
    }
  }
  return out
}

// Water seen from above: four slow plane waves at odd angles and speeds; they never quite repeat.
const WAVES = [
  { kx: 0.0105, ky: 0.0042, w: 0.48 },
  { kx: -0.0048, ky: 0.0093, w: 0.39 },
  { kx: 0.0071, ky: -0.0079, w: 0.3 },
  { kx: -0.0089, ky: -0.0031, w: 0.24 },
]
const SPEED = 3 // one knob for how fast the water moves
export function wave(x: number, y: number, s: number) {
  let v = 0
  for (const k of WAVES) v += Math.sin(k.kx * x + k.ky * y + k.w * SPEED * s)
  return v / WAVES.length // -1..1
}

// How much of the cell's grid is hidden (0..1) at time s seconds; without the wave term it's the static Penpot look.
export function cover(c: Cell, s: number) {
  // waves dominate the cell's own randomness so they read as rolling bands. They reach right up to the bento,
  // a little softer there, because on laptop screens that edge is most of the field you can see.
  const strength = 0.6 + 0.4 * Math.min(1, c.p / 0.3)
  const v = c.p - c.r + 0.9 * strength * wave(c.x, c.y, s)
  const k = Math.min(1, Math.max(0, (v + 0.3) / 0.6)) // wide band: cells swell in and out instead of popping
  return k * k * (3 - 2 * k)
}
