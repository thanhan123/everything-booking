import Link from "next/link"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"

export default async function StoreAdminsPage() {
    const storeAdmins = await db.user.findMany({
        where: { role: "STORE_ADMIN" },
        include: {
            stores: true
        }
    })

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Store Admins</h1>
                <Link href="/dashboard/store-admins/create">
                    <Button>Add Store Admin</Button>
                </Link>
            </div>

            <div className="space-y-3">
                {storeAdmins.map((admin) => (
                    <div key={admin.id} className="border rounded-lg p-4">
                        <h2 className="font-medium">{admin.name}</h2>
                        <p className="text-sm text-gray-600">{admin.email}</p>

                        <div className="mt-2 text-sm">
                            <strong>Stores:</strong>{" "}
                            {admin.stores.length === 0
                                ? "No stores assigned"
                                : admin.stores.map((s) => s.name).join(", ")}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
