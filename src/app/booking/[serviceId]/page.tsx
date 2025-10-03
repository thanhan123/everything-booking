"use client"
import { useState } from "react"

export default function BookingPage({ params }: { params: { serviceId: string } }) {
    const [date, setDate] = useState("")

    async function handleSubmit() {
        await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ serviceId: params.serviceId, date }),
        })
        alert("Booking created!")
    }

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">Book Service</h1>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 mb-4" />
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
                Book Now
            </button>
        </main>
    )
}
