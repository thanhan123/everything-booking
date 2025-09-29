'use client';

import ServiceCard from "@/components/ServiceCard"

export default function LandingPage() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`)
    // const services = await res.json()
    const services = [
        { id: 1, name: "Haircut", description: "Professional haircut service", price: 30 },
        { id: 2, name: "Massage", description: "Relaxing full body massage", price: 60 },
        { id: 3, name: "Consultation", description: "1-hour consultation session", price: 100 },
    ]

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">Available Services</h1>
            <div className="grid grid-cols-3 gap-6">
                {services.map((service: any) => (
                    <ServiceCard
                        key={service.id}
                        name={service.name}
                        description={service.description}
                        price={service.price}
                        onBook={() => alert(`Booking ${service.name}`)}
                    />
                ))}
            </div>
        </main>
    )
}
