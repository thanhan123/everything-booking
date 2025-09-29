"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

const navItems = [
    { label: "Search", href: "/search" },
    { label: "Dashboard", href: "/dashboard" },
]

export function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
            {/* Logo / Brand */}
            <div className="text-xl font-bold">
                <Link href="/">BookingApp</Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="hover:underline hover:text-gray-100"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Menu">
                            <Menu className="h-5 w-5 text-white" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-white">
                        <SheetHeader>
                            <SheetTitle className="text-left text-lg font-bold text-gray-900">
                                Menu
                            </SheetTitle>
                        </SheetHeader>
                        <div className="mt-4 flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="text-gray-800 hover:text-blue-600 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
