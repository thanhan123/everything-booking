import { LoadingProvider } from "@/context/LoadingContext"
import { LoadingOverlay } from "@/components/LoadingOverlay"
import { Navbar } from "@/components/Navbar"
import { useLoading } from "@/context/LoadingContext"
import { Providers } from "@/components/Providers"
import "./globals.css"
import { ClientShell } from "@/components/ClientShell"

export const metadata = {
  title: "Booking App",
  description: "A simple service booking platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <LoadingProvider>
            <ClientShell>{children}</ClientShell>
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  )
}