export default async function DashboardServices() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services?orgId=123`)
    const services = await res.json()

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
