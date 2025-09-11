'use client';

import Button from "@/components/Button"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 space-y-4">
      <h1 className="text-3xl font-bold">Hello Next.js + TS + Tailwind 🚀</h1>
      <Button variant="primary" onClick={() => alert("Clicked Primary!")}>
        Primary Button
      </Button>
      <Button variant="secondary" onClick={() => alert("Clicked Secondary!")}>
        Secondary Button
      </Button>
    </main>
  )
}
