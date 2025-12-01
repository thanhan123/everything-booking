import { db } from "@/lib/db"

/**
 * List refresh tokens (admin view)
 */
export async function listRefreshTokens({ limit = 100, offset = 0 } = {}) {
    return db.refreshToken.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        include: { user: { select: { id: true, email: true, name: true } } },
    })
}

/**
 * Revoke a token by id
 */
export async function revokeRefreshToken(id: string, revokedByUserId?: string) {
    const now = new Date()
    // mark revoked
    const t = await db.refreshToken.update({
        where: { id },
        data: {
            revoked: true,
            revokedAt: now,
        },
    })

    // Optional: create an audit log (simple example table or external logging)
    // await db.auditLog?.create?.({
    //     data: {
    //         action: "REFRESH_TOKEN_REVOKED",
    //         resourceId: id,
    //         performedBy: revokedByUserId ?? null,
    //         createdAt: now,
    //         metadata: JSON.stringify({ tokenId: id }),
    //     },
    // }).catch(() => { }) // ignore if you don't have auditLog model

    return t
}

/**
 * Optionally call provider revoke endpoint if external provider issued the token
 * This is a stub — implement if you use OAuth providers with revoke endpoints.
 */
export async function revokeAtProvider(refreshToken: string, providerRevokeUrl?: string) {
    if (!providerRevokeUrl) return null
    try {
        await fetch(providerRevokeUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ token: refreshToken }),
        })
    } catch (err) {
        console.error("Provider revoke failed", err)
    }
}
