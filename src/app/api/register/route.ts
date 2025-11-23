import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, password } = body

        // Basic validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Check if email exists
        const existing = await prisma.user.findUnique({
            where: { email },
        })
        if (existing) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 409 }
            )
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: "USER",
            },
        })

        return NextResponse.json(
            { message: "User registered", userId: user.id },
            { status: 201 }
        )
    } catch (e) {
        console.error("Register error:", e)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
