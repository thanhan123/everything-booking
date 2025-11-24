"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserDTO } from "@/models/user"

export default function SearchStoreAdmin({ onSelect }: { onSelect: (user: UserDTO) => void }) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<UserDTO[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (query.length < 2) {
                setResults([])
                return
            }

            setLoading(true)
            const res = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
            const data = await res.json()
            setResults(data)
            setLoading(false)
        }, 300)

        return () => clearTimeout(delay)
    }, [query])

    return (
        <div className="space-y-3">
            <Input
                placeholder="Search store admin by name or email…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {loading && <p className="text-sm text-gray-500">Searching...</p>}

            {results.length > 0 && (
                <div className="space-y-2 border p-3 rounded-md bg-white">
                    {results.map((user: any) => (
                        <div
                            key={user.id}
                            className="flex justify-between items-center p-2 border rounded-md"
                        >
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <Button size="sm" onClick={() => onSelect(user)}>
                                Select
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
