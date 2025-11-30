import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser()
        if (!user || user.role !== "USER") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { storeId, date, totalPrice, notes } = body

        if (!storeId || !date) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        const booking = await db.booking.create({
            data: {
                userId: user.id,
                storeId,
                date: new Date(date),
                totalPrice: totalPrice ?? null,
                notes: notes ?? null,
            },
        })

        return NextResponse.json({ booking })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}
