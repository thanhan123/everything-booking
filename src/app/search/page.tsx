"use client"
import { useState } from "react"

export default function SearchPage() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])

    async function handleSearch() {
        const res = await fetch(`/api/services/search?q=${query}`)
        setResults(await res.json())
    }

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Search Services</h1>
            <div className="flex gap-2 mb-4">
                <input
                    className="border p-2 flex-1"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a service..."
                />
                <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Search
                </button>
            </div>
            <ul>
                {results.map((s) => (
                    <li key={s.id} className="border p-2 mb-2">{s.name} - ${s.price}</li>
                ))}
            </ul>
        </main>
    )
}
