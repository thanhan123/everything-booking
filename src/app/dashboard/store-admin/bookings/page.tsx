import { db } from "@/lib/db"
import { requireStoreAdmin } from "@/lib/auth"

export default async function StoreAdminBookings() {
    const user = await requireStoreAdmin()

    const bookings = await db.booking.findMany({
        where: {
            store: { adminId: user.id },
        },
        include: { user: true, store: true },
        orderBy: { date: "desc" },
    })

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Store Bookings</h1>

            {bookings.map((b) => (
                <div key={b.id} className="border p-4 mb-3 rounded-lg">
                    <div className="font-bold">{b.user.name}</div>
                    <div>{new Date(b.date).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Store: {b.store.name}</div>
                    <div>Status: {b.status}</div>
                </div>
            ))}
        </div>
    )
}
