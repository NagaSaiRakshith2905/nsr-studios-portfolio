"use client"

import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const toggle = () => flushSync(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label="Toggle dark mode"
      // after: pads the 24px button to a 44px touch target without changing its look
      className="relative -ml-1.5 -mt-1.5 text-faint hover:text-foreground after:absolute after:-inset-2.5"
      // Cross-fade instead of a hard white↔black flash; browsers without View Transitions just switch
      onClick={() => (document.startViewTransition ? document.startViewTransition(toggle) : toggle())}
    >
      {/* Both icons render; CSS picks one, so server and client markup match */}
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </Button>
  )
}
