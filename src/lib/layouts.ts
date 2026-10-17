import type { CardId } from "./content"

// Geometry copied from the Penpot frames on Page 4, in px relative to the bento's top-left.
export type TitleSize = "sm" | "base" | "md" | "lg"
export type Placed = { id: CardId; x: number; y: number; w: number; h: number; size?: TitleSize; display?: 80 | 120 }
export type Mark = [x: number, y: number, w: number, h: number]

export const desktop = {
  w: 960,
  h: 520,
  cards: [
    { id: "hero", x: 0, y: 0, w: 280, h: 280, display: 80 },
    { id: "now", x: 280, y: 0, w: 240, h: 160 },
    { id: "focus", x: 520, y: 0, w: 200, h: 160 },
    { id: "persona", x: 720, y: 0, w: 240, h: 240 },
    { id: "language", x: 280, y: 160, w: 160, h: 120 },
    { id: "path", x: 440, y: 160, w: 280, h: 120, size: "sm" },
    { id: "springBoot", x: 720, y: 240, w: 240, h: 280 },
    { id: "nav", x: 0, y: 280, w: 160, h: 240 },
    { id: "toolkit", x: 160, y: 280, w: 280, h: 120 },
    { id: "contact", x: 160, y: 400, w: 280, h: 120, size: "sm" },
    { id: "python", x: 440, y: 280, w: 160, h: 240 },
    { id: "elsewhere", x: 600, y: 280, w: 120, h: 240 },
  ] satisfies Placed[] as Placed[],
  outer: [[-2, 276, 4, 8], [516, -2, 8, 4], [716, 518, 8, 4], [596, 518, 8, 4], [716, -2, 8, 4], [276, -2, 8, 4], [436, 518, 8, 4]] as Mark[],
  inner: [[719, 156, 2, 8], [159, 396, 2, 8], [719, 276, 2, 8], [439, 276, 2, 8], [276, 279, 8, 2]] as Mark[],
}

export const portrait = {
  w: 840,
  h: 1280,
  cards: [
    { id: "hero", x: 0, y: 0, w: 480, h: 320, display: 120 },
    { id: "now", x: 480, y: 0, w: 360, h: 160 },
    { id: "focusLong", x: 480, y: 160, w: 360, h: 160 },
    { id: "nav", x: 0, y: 320, w: 280, h: 280 },
    { id: "path", x: 280, y: 320, w: 560, h: 160, size: "md" },
    { id: "framework", x: 280, y: 480, w: 280, h: 120 },
    { id: "language", x: 560, y: 480, w: 280, h: 120 },
    { id: "persona", x: 0, y: 600, w: 360, h: 360, size: "lg" },
    { id: "toolkit", x: 360, y: 600, w: 480, h: 160 },
    { id: "springBoot", x: 360, y: 760, w: 240, h: 200 },
    { id: "python", x: 600, y: 760, w: 240, h: 200 },
    { id: "notes", x: 0, y: 960, w: 240, h: 320 },
    { id: "contact", x: 240, y: 960, w: 360, h: 160, size: "sm" },
    { id: "elsewhereInline", x: 240, y: 1120, w: 360, h: 160 },
    { id: "colophon", x: 600, y: 960, w: 240, h: 320 },
  ] satisfies Placed[] as Placed[],
  outer: [[236, 1278, 8, 4], [-2, 316, 4, 8], [476, -2, 8, 4], [-2, 956, 4, 8], [596, 1278, 8, 4], [838, 156, 4, 8], [838, 596, 4, 8]] as Mark[],
  inner: [[359, 756, 2, 8], [596, 759, 8, 2], [276, 599, 8, 2], [599, 1116, 2, 8], [239, 1116, 2, 8], [279, 476, 2, 8], [556, 599, 8, 2], [596, 959, 8, 2]] as Mark[],
}

// Phones: not in Penpot. Derived from the portrait frame as a 2-column grid of 40px rows.
export type Stacked = { id: CardId; span: 1 | 2; rows: number; size?: TitleSize }
export const phone: Stacked[] = [
  { id: "hero", span: 2, rows: 7 },
  { id: "now", span: 2, rows: 4 },
  { id: "focusLong", span: 2, rows: 4 },
  { id: "nav", span: 1, rows: 6 },
  { id: "framework", span: 1, rows: 3 },
  { id: "language", span: 1, rows: 3 },
  { id: "path", span: 2, rows: 4, size: "md" },
  { id: "persona", span: 2, rows: 7, size: "lg" },
  { id: "springBoot", span: 1, rows: 6 },
  { id: "python", span: 1, rows: 6 },
  { id: "toolkit", span: 2, rows: 3 },
  { id: "notes", span: 2, rows: 4 },
  { id: "contact", span: 2, rows: 3, size: "sm" },
  { id: "elsewhereInline", span: 1, rows: 5 },
  { id: "colophon", span: 1, rows: 5 },
]
