"use client"

import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

// Pixel icons on an 8px lattice; round caps draw the zero-length segments as dots.
const SUN = "M36 4h0M12 12h0M60 12h0M28 20h0M28 20L36 20M28 20L28 28M28 20L36 28M28 20L20 28M36 20h0M36 20L44 20M36 20L36 28M36 20L44 28M36 20L28 28M44 20h0M44 20L44 28M44 20L52 28M44 20L36 28M20 28h0M20 28L28 28M20 28L20 36M20 28L28 36M28 28h0M28 28L36 28M28 28L28 36M28 28L36 36M28 28L20 36M36 28h0M36 28L44 28M36 28L36 36M36 28L44 36M36 28L28 36M44 28h0M44 28L52 28M44 28L44 36M44 28L52 36M44 28L36 36M52 28h0M52 28L52 36M52 28L44 36M4 36h0M20 36h0M20 36L28 36M20 36L20 44M20 36L28 44M28 36h0M28 36L36 36M28 36L28 44M28 36L36 44M28 36L20 44M36 36h0M36 36L44 36M36 36L36 44M36 36L44 44M36 36L28 44M44 36h0M44 36L52 36M44 36L44 44M44 36L52 44M44 36L36 44M52 36h0M52 36L52 44M52 36L44 44M68 36h0M20 44h0M20 44L28 44M20 44L28 52M28 44h0M28 44L36 44M28 44L28 52M28 44L36 52M36 44h0M36 44L44 44M36 44L36 52M36 44L44 52M36 44L28 52M44 44h0M44 44L52 44M44 44L44 52M44 44L36 52M52 44h0M52 44L44 52M28 52h0M28 52L36 52M36 52h0M36 52L44 52M44 52h0M12 60h0M60 60h0M36 68h0"
const MOON = "M28 4H44M12 12H28M12 20H28M4 28H28M4 36H28M4 44H28M12 52H36M68 52H68M12 60H60M28 68H44M4 28V44M12 12V60M20 12V60M28 4V68M36 52V68M44 60V68M28 4L20 12M36 4L28 12M12 20L4 28M4 44L12 52M28 44L36 52M36 52L44 60M68 52L60 60M20 60L28 68M52 60L44 68"

function PixelIcon() {
  const props = { fill: "none", stroke: "currentColor", strokeWidth: 7.872, strokeLinecap: "round", strokeLinejoin: "round" } as const
  return (
    <svg viewBox="0 0 72 72" className="theme-icon size-16" aria-hidden>
      <path d={SUN} data-icon="sun" {...props} />
      <path d={MOON} data-icon="moon" {...props} />
    </svg>
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const toggle = () => flushSync(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
  const click = () => {
    // Kenney "click-soft" (CC0), same sound and volume as chanhdai.com
    const audio = new Audio("/sounds/click-soft.mp3")
    audio.volume = 0.3
    audio.play().catch(() => {})
  }
  return (
    <Button
      variant="ghost"
      aria-label="Toggle dark mode"
      className="size-full rounded-none text-foreground hover:bg-transparent dark:hover:bg-transparent"
      // Cross-fade instead of a hard white↔black flash; browsers without View Transitions just switch
      onClick={() => {
        click()
        if (document.startViewTransition) document.startViewTransition(toggle)
        else toggle()
      }}
    >
      {/* Both icons render; CSS picks one, so server and client markup match */}
      <PixelIcon />
    </Button>
  )
}
