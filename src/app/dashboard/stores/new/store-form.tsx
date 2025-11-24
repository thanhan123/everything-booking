"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { createStore } from "./store-actions"

export function CreateStoreForm({ storeAdmins }: { storeAdmins: { id: string; email: string }[] }) {
    const [name, setName] = useState("")
    const [adminId, setAdminId] = useState("")

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        await createStore({ name, adminId })
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Store name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <select
                className="w-full border px-3 py-2 rounded"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
            >
                <option value="">Select a Store Admin</option>
                {storeAdmins.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.email}
                    </option>
                ))}
            </select>

            <Button type="submit">Create Store</Button>
        </form>
    )
}
