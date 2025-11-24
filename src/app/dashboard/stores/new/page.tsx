import { db } from "@/lib/db"
import { CreateStoreForm } from "./store-form"

export default async function NewStorePage() {
    // Load all STORE_ADMIN role users
    const storeAdmins = await db.user.findMany({
        where: { role: "STORE_ADMIN" },
    })

    return (
        <div className="p-8 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Create Store</h1>
            <CreateStoreForm storeAdmins={storeAdmins} />
        </div>
    )
}
