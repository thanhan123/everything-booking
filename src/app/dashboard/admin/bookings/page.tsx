import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth"

export default async function AdminBookingsPage() {
    const user = await requireAdmin()

    const bookings = await db.booking.findMany({
        include: { user: true, store: true },
        orderBy: { date: "desc" },
    })

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

            {bookings.map((b) => (
                <div key={b.id} className="border p-4 rounded-lg mb-3">
                    <div className="font-semibold">{b.user.name} — {b.user.email}</div>
                    <div>{b.store.name}</div>
                    <div>{new Date(b.date).toLocaleString()}</div>
                    <div>Status: {b.status}</div>
                </div>
            ))}
        </div>
    )
}
