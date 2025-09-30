import { Navbar } from "@/components/Navbar"
import { Providers } from "@/components/Providers"
import "./globals.css"

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
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
            © {new Date().getFullYear()} BookingApp. All rights reserved.
          </footer>
        </Providers>
      </body>
    </html>
  )
}
