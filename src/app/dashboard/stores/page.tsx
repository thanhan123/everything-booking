import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"

export default async function StoresPage() {
    const stores = await db.store.findMany({
        include: { admin: true },
    })

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-semibold">Stores</h1>

            <Link href="/dashboard/stores/new">
                <Button>Create New Store</Button>
            </Link>

            <div className="mt-6 space-y-4">
                {stores.map((store) => (
                    <div key={store.id} className="border p-4 rounded-lg">
                        <h2 className="text-lg font-bold">{store.name}</h2>
                        <p className="text-gray-600">
                            Admin: {store.admin?.email ?? "Not assigned"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
