import { db } from "@/lib/db"
import { requireUser } from "@/lib/auth"

export default async function MyBookingsPage() {
    const user = await requireUser()

    const bookings = await db.booking.findMany({
        where: { userId: user.id },
        include: { store: true },
        orderBy: { date: "desc" }
    })

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

            <div className="space-y-4">
                {bookings.map((b) => (
                    <div key={b.id} className="border p-4 rounded-lg">
                        <div className="font-semibold">{b.store.name}</div>
                        <div>{new Date(b.date).toLocaleString()}</div>
                        <div>Status: {b.status}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
