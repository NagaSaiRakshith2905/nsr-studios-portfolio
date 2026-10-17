"use client"

import type { SVGProps } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

// Pixel icons from the Penpot frame: each "h0" is a dot, round caps turn the strokes into pixels.
const pixel = { viewBox: "0 0 72 72", fill: "none", stroke: "currentColor", strokeWidth: 7.872, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const
const Sun = (p: SVGProps<SVGSVGElement>) => (
  <svg {...pixel} {...p}><path d="M36 4h0M12 12h0M60 12h0M28 20h0M28 20L36 20M28 20L28 28M28 20L36 28M28 20L20 28M36 20h0M36 20L44 20M36 20L36 28M36 20L44 28M36 20L28 28M44 20h0M44 20L44 28M44 20L52 28M44 20L36 28M20 28h0M20 28L28 28M20 28L20 36M20 28L28 36M28 28h0M28 28L36 28M28 28L28 36M28 28L36 36M28 28L20 36M36 28h0M36 28L44 28M36 28L36 36M36 28L44 36M36 28L28 36M44 28h0M44 28L52 28M44 28L44 36M44 28L52 36M44 28L36 36M52 28h0M52 28L52 36M52 28L44 36M4 36h0M20 36h0M20 36L28 36M20 36L20 44M20 36L28 44M28 36h0M28 36L36 36M28 36L28 44M28 36L36 44M28 36L20 44M36 36h0M36 36L44 36M36 36L36 44M36 36L44 44M36 36L28 44M44 36h0M44 36L52 36M44 36L44 44M44 36L52 44M44 36L36 44M52 36h0M52 36L52 44M52 36L44 44M68 36h0M20 44h0M20 44L28 44M20 44L28 52M28 44h0M28 44L36 44M28 44L28 52M28 44L36 52M36 44h0M36 44L44 44M36 44L36 52M36 44L44 52M36 44L28 52M44 44h0M44 44L52 44M44 44L44 52M44 44L36 52M52 44h0M52 44L44 52M28 52h0M28 52L36 52M36 52h0M36 52L44 52M44 52h0M12 60h0M60 60h0M36 68h0" /></svg>
)
const Moon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...pixel} {...p}><path d="M20 4h0M20 4L28 4M20 4L20 12M20 4L12 12M28 4h0M28 4L36 4M28 4L20 12M36 4h0M12 12h0M12 12L20 12M12 12L12 20M12 12L4 20M20 12h0M20 12L12 20M4 20h0M4 20L12 20M4 20L4 28M4 20L12 28M12 20h0M12 20L12 28M12 20L4 28M4 28h0M4 28L12 28M4 28L4 36M4 28L12 36M12 28h0M12 28L12 36M12 28L4 36M4 36h0M4 36L12 36M4 36L4 44M4 36L12 44M12 36h0M12 36L12 44M12 36L4 44M4 44h0M4 44L12 44M4 44L12 52M12 44h0M12 44L12 52M12 44L20 52M68 44h0M68 44L68 52M68 44L60 52M12 52h0M12 52L20 52M12 52L20 60M20 52h0M20 52L20 60M20 52L28 60M60 52h0M60 52L68 52M60 52L60 60M60 52L52 60M68 52h0M68 52L60 60M20 60h0M20 60L28 60M20 60L28 68M28 60h0M28 60L36 60M28 60L28 68M28 60L36 68M36 60h0M36 60L44 60M36 60L36 68M36 60L44 68M36 60L28 68M44 60h0M44 60L52 60M44 60L44 68M44 60L36 68M52 60h0M52 60L60 60M52 60L44 68M60 60h0M28 68h0M28 68L36 68M36 68h0M36 68L44 68M44 68h0" /></svg>
)

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const toggle = () => flushSync(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
  return (
    <Button
      variant="ghost"
      aria-label="Toggle dark mode"
      className="size-16 text-foreground"
      // Cross-fade instead of a hard white↔black flash; browsers without View Transitions just switch
      onClick={() => (document.startViewTransition ? document.startViewTransition(toggle) : toggle())}
    >
      {/* Both icons render; CSS picks one, so server and client markup match */}
      <Sun className="size-12 dark:hidden" />
      <Moon className="hidden size-12 dark:block" />
    </Button>
  )
}
