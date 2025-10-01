"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdownMenu"
import { useLoading } from "@/context/LoadingContext"

export function UserMenu() {
    const { data: session } = useSession()
    const { setLoading } = useLoading()

    if (!session) {
        return (
            <Button onClick={() => {
                setLoading(true);
                signIn();
            }} variant="default">
                Login
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    {session.user?.name || "User"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                    onClick={async () => {
                        setLoading(true)
                        await signOut({ callbackUrl: "/" })
                    }}
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}