"use client"

import { useLoading } from "@/context/LoadingContext"
import { Navbar } from "./Navbar"
import { LoadingOverlay } from "./LoadingOverlay"

export function ClientShell({ children }: { children: React.ReactNode }) {
    const { isLoading } = useLoading()

    return (
        <>
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
                © {new Date().getFullYear()} BookingApp. All rights reserved.
            </footer>
            <LoadingOverlay isLoading={isLoading} />
        </>
    )
}
