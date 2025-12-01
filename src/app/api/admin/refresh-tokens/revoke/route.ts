import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { revokeRefreshToken } from "@/lib/tokens"
import { db } from "@/lib/db"

export async function POST(req: Request) {
    const admin = await requireAdmin()
    const body = await req.json()
    const { id } = body

    if (!id) return NextResponse.json({ error: "Missing token id" }, { status: 400 })

    // read token (to optionally revoke at provider or notify user)
    const token = await db.refreshToken.findUnique({ where: { id }, select: { token: true, userId: true, revoked: true } })
    if (!token) return NextResponse.json({ error: "Token not found" }, { status: 404 })
    if (token.revoked) return NextResponse.json({ ok: true, message: "Already revoked" })

    // revoke in DB
    await revokeRefreshToken(id, admin.id)

    // optional: revoke at provider (if you have provider endpoint)
    // await revokeAtProvider(token.token, process.env.PROVIDER_REVOKE_URL)

    // optional: notify token owner (email) using your existing email util
    // await sendNotificationToUser(token.userId, `${admin.email} revoked one of your refresh tokens`)

    return NextResponse.json({ ok: true })
}
