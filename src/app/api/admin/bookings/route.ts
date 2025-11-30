import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const bookings = await db.booking.findMany({
        include: {
            user: true,
            store: true,
        },
        orderBy: { date: "desc" },
    })

    return NextResponse.json({ bookings })
}
