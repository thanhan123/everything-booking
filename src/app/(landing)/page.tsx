import ServiceCard from "@/components/ServiceCard"
import Link from "next/link"
import { db } from "@/lib/db"

export default async function LandingPage() {
    const stores = await db.store.findMany({
        include: { admin: true },
        orderBy: { createdAt: "desc" }
    })

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">Available Stores</h1>

            {stores.length === 0 && (
                <p className="text-gray-600">No stores available yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stores.map((store) => (
                    <Link key={store.id} href={`/stores/${store.id}`}>
                        <ServiceCard
                            name={store.name}
                            description={'aaaaa'}//{store.description ?? "No description provided"}
                            price={30}//{store.priceRange ?? undefined}
                        />
                    </Link>
                ))}
            </div>
        </main>
    )
}
