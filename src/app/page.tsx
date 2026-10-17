import { FixedBento, StackedBento } from "@/components/bento"
import { desktop, phone, portrait } from "@/lib/layouts"

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center overflow-clip px-4 py-20">
      <FixedBento layout={desktop} className="hidden min-[1040px]:block" />
      <FixedBento layout={portrait} className="hidden min-[880px]:max-[1039px]:block" />
      <StackedBento cards={phone} className="min-[880px]:hidden" />
    </main>
  )
}
