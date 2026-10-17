import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google";
import { GeistPixelCircle } from "geist/font/pixel";
import { ThemeProvider } from "next-themes"
import "./globals.css"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
const geistPixelCircle = GeistPixelCircle

export const metadata: Metadata = {
  title: "NSR",
  description: "Developer learning to build with AI, one project at a time.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistMono.variable} ${geistPixelCircle.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
