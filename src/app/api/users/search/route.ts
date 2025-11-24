import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q") || ""

    if (!q || q.trim().length < 2) {
        return NextResponse.json([])
    }

    const users = await db.user.findMany({
        where: {
            role: "STORE_ADMIN",
            OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
            ],
        },
        take: 10,
    })

    return NextResponse.json(users)
}
