import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardServices() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/auth/signin")
    }

    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services?orgId=123`)
    // const services = await res.json()

    const services = [
        { id: 1, name: 'service A', price: 300 },
        { id: 2, name: 'service B', price: 400 }
    ]

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">My Services</h1>
            <ul>
                {services.map((s: any) => (
                    <li key={s.id} className="border p-2 mb-2">{s.name} - ${s.price}</li>
                ))}
            </ul>
        </main>
    )
}
