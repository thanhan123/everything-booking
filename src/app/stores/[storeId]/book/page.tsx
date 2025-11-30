import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { createBooking } from "./server-actions"

export default async function BookingPage({ params }: { params: { storeId: string } }) {
    const store = await db.store.findUnique({
        where: { id: params.storeId }
    })

    if (!store) {
        return <p className="p-8 text-red-500">Store not found.</p>
    }

    return (
        <main className="max-w-lg mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Book at {store.name}</h1>

            <form action={createBooking} className="space-y-4">
                <input type="hidden" name="storeId" value={store.id} />

                <div>
                    <label className="block font-semibold mb-1">Select Date</label>
                    <input
                        type="datetime-local"
                        name="date"
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Notes (optional)</label>
                    <textarea
                        name="notes"
                        className="w-full border p-2 rounded"
                        placeholder="Any instructions..."
                    />
                </div>

                <Button type="submit" className="w-full">Confirm Booking</Button>
            </form>
        </main>
    )
}
