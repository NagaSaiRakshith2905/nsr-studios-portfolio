import type { CardId } from "./content"

// Desktop geometry copied from the Penpot frame on Page 5, in px relative to the bento's top-left.
export type TitleSize = "sm" | "base" | "md" | "lg"
export type Placed = { id: CardId; x: number; y: number; w: number; h: number; size?: TitleSize; display?: 80 | 120 }
export type Mark = [x: number, y: number, w: number, h: number]
// Blueprint lines: card edges carried out past the bento into the page
export type Lines = { x: number[]; y: number[] }

export const desktop = {
  w: 960,
  h: 520,
  cards: [
    { id: "hero", x: 0, y: 0, w: 280, h: 280, display: 80 },
    { id: "nav", x: 280, y: 0, w: 120, h: 160 },
    { id: "toggle", x: 280, y: 160, w: 120, h: 120 },
    { id: "now", x: 400, y: 0, w: 320, h: 160 },
    { id: "github", x: 400, y: 160, w: 320, h: 120 },
    { id: "riva", x: 720, y: 0, w: 240, h: 400 },
    { id: "tryRiva", x: 720, y: 400, w: 240, h: 120 },
    { id: "projects", x: 0, y: 280, w: 160, h: 240 },
    { id: "caseStudies", x: 160, y: 280, w: 280, h: 158 },
    { id: "colophon", x: 160, y: 438, w: 280, h: 82 },
    { id: "stack", x: 440, y: 280, w: 140, h: 240 },
    { id: "elsewhere", x: 580, y: 280, w: 140, h: 176 },
    { id: "copyright", x: 580, y: 456, w: 140, h: 64 },
  ] satisfies Placed[] as Placed[],
  outer: [[276, -2, 8, 4], [716, -2, 8, 4], [-2, 276, 4, 8], [156, 518, 8, 4], [576, 518, 8, 4]] as Mark[],
  inner: [[396, 159, 8, 2], [399, 156, 2, 8], [276, 279, 8, 2], [576, 279, 8, 2], [159, 434, 2, 8], [439, 434, 2, 8], [719, 156, 2, 8]] as Mark[],
  lines: { x: [0, 280, 400, 720, 960], y: [0, 160, 280, 520] } as Lines,
}

// Portrait: not in Penpot. The desktop cards regrouped on the 40px grid.
export const portrait = {
  w: 840,
  h: 1000,
  cards: [
    { id: "hero", x: 0, y: 0, w: 480, h: 320, display: 120 },
    { id: "now", x: 480, y: 0, w: 360, h: 160 },
    { id: "nav", x: 480, y: 160, w: 240, h: 160 },
    { id: "toggle", x: 720, y: 160, w: 120, h: 160 },
    { id: "riva", x: 0, y: 320, w: 360, h: 400, size: "lg" },
    { id: "tryRiva", x: 360, y: 320, w: 480, h: 160 },
    { id: "projects", x: 360, y: 480, w: 240, h: 240 },
    { id: "stack", x: 600, y: 480, w: 240, h: 240 },
    { id: "caseStudies", x: 0, y: 720, w: 480, h: 160 },
    { id: "colophon", x: 0, y: 880, w: 480, h: 120 },
    { id: "elsewhere", x: 480, y: 720, w: 360, h: 160 },
    { id: "copyright", x: 480, y: 880, w: 360, h: 120 },
  ] satisfies Placed[] as Placed[],
  outer: [[476, -2, 8, 4], [-2, 316, 4, 8], [838, 156, 4, 8], [-2, 716, 4, 8], [476, 998, 8, 4]] as Mark[],
  inner: [[479, 156, 2, 8], [359, 476, 2, 8], [596, 479, 8, 2], [476, 879, 8, 2]] as Mark[],
  lines: { x: [0, 480, 840], y: [0, 320, 720, 1000] } as Lines,
}

// Phones: not in Penpot. Derived from the portrait frame as a 2-column grid of 40px rows.
export type Stacked = { id: CardId; span: 1 | 2; rows: number; size?: TitleSize }
export const phone: Stacked[] = [
  { id: "hero", span: 2, rows: 7 },
  { id: "now", span: 2, rows: 4 },
  { id: "github", span: 2, rows: 3 },
  { id: "nav", span: 1, rows: 4 },
  { id: "toggle", span: 1, rows: 4 },
  { id: "riva", span: 2, rows: 7, size: "lg" },
  { id: "tryRiva", span: 2, rows: 3 },
  { id: "projects", span: 1, rows: 6 },
  { id: "stack", span: 1, rows: 6 },
  { id: "caseStudies", span: 2, rows: 3 },
  { id: "elsewhere", span: 1, rows: 5 },
  { id: "colophon", span: 1, rows: 5 },
  { id: "copyright", span: 2, rows: 2 },
]
