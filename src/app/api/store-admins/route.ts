import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const data = await req.json()

    const hashed = await bcrypt.hash(data.password, 10)

    const user = await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            role: "STORE_ADMIN",
            passwordHash: hashed,
        },
    })

    return NextResponse.json({ success: true, user })
}
