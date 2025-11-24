"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SearchStoreAdmin from "./SearchStoreAdmin"
import { UserDTO } from "@/models/user"
import { createStore } from "./store-actions"

export default function NewStorePage() {
    const [admin, setAdmin] = useState<UserDTO | null>(null)
    const [storeName, setStoreName] = useState("")

    async function handleSubmit() {
        if (!admin) {
            alert("Please select a store admin")
            return
        }

        await createStore({
            name: storeName,
            adminId: admin.id,
        })
    }

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold">Create Store</h1>

            <div>
                <label className="text-sm font-medium">Store Name</label>
                <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>

            <div>
                <label className="text-sm font-medium">Store Admin</label>
                <SearchStoreAdmin onSelect={setAdmin} />

                {admin && (
                    <p className="mt-2 text-sm text-green-700">
                        Selected: {admin.name} ({admin.email})
                    </p>
                )}
            </div>

            <Button onClick={handleSubmit}>Create Store</Button>
        </div>
    )
}
