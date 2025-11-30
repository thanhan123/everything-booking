"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState, use } from "react"

interface Store {
    id: string
    name: string
}

interface BookStorePageProps {
    storeId: string
}

export default function BookStorePage({ params }: { params: Promise<BookStorePageProps> }) {
    const router = useRouter()
    const [date, setDate] = useState("")
    const [notes, setNotes] = useState("")
    const { storeId } = use(params);
    const [store, setStore] = useState<Store | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchStore() {
            try {
                const res = await fetch(`/api/stores/${storeId}`)
                if (!res.ok) throw new Error("Store not found")
                const data = await res.json()
                setStore(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchStore()
    }, [storeId])

    if (loading) return <p>Loading store...</p>
    if (error || !store) return <p>{error || "Store not found"}</p>

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch("/api/bookings", {
            method: "POST",
            body: JSON.stringify({
                storeId,
                date,
                notes
            })
        })

        if (res.ok) {
            router.push("/bookings")
        } else {
            alert("Error creating booking")
        }
        setLoading(false)
    }

    return (
        <Card className="max-w-xl mx-auto mt-10 p-6">
            <CardHeader>
                <CardTitle className="text-3xl font-bold mb-6 text-blue-600">
                    Book an appointment at {store.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Booking"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
