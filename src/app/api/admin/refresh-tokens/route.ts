import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { listRefreshTokens } from "@/lib/tokens"

export async function GET(req: Request) {
    // only admins can access
    const admin = await requireAdmin()

    const url = new URL(req.url)
    const limit = Number(url.searchParams.get("limit") ?? 100)
    const offset = Number(url.searchParams.get("offset") ?? 0)

    const tokens = await listRefreshTokens({ limit, offset })
    return NextResponse.json({ tokens })
}
