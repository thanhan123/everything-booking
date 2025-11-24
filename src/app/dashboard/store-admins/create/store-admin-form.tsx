"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StoreAdminForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        const form = e.target as HTMLFormElement
        const data = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            password: (form.elements.namedItem("password") as HTMLInputElement).value,
        }

        const res = await fetch("/api/store-admins", {
            method: "POST",
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            setError("Failed to create store admin")
            setLoading(false)
            return
        }

        router.push("/dashboard/store-admins")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-1">
                <Label>Name</Label>
                <Input name="name" required />
            </div>

            <div className="space-y-1">
                <Label>Email</Label>
                <Input name="email" type="email" required />
            </div>

            <div className="space-y-1">
                <Label>Password</Label>
                <Input name="password" type="password" required />
            </div>

            <Button disabled={loading} type="submit">
                {loading ? "Creating..." : "Create Store Admin"}
            </Button>
        </form>
    )
}
