"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

type TokenRow = {
    id: string
    token?: string
    user: { id: string; email?: string | null; name?: string | null }
    ip?: string | null
    userAgent?: string | null
    createdAt: string
    lastUsedAt?: string | null
    expiresAt?: string | null
    revoked: boolean
    revokedAt?: string | null
}

export default function RefreshTokensTableClient() {
    const [tokens, setTokens] = useState<TokenRow[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function load() {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/admin/refresh-tokens")
            if (!res.ok) throw new Error("Failed to load tokens")
            const data = await res.json()
            setTokens(data.tokens)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    async function onRevoke(id: string) {
        if (!confirm("Revoke this refresh token? This will invalidate the user's session refresh.")) return
        try {
            const res = await fetch("/api/admin/refresh-tokens/revoke", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
            if (!res.ok) {
                const body = await res.json().catch(() => null)
                throw new Error(body?.error || "Failed to revoke")
            }
            // optimistic update
            setTokens((s) => s.map(t => t.id === id ? { ...t, revoked: true, revokedAt: new Date().toISOString() } : t))
        } catch (err: any) {
            alert("Failed to revoke: " + err.message)
        }
    }

    if (loading) return <p>Loading tokens…</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="text-left">
                        <th className="p-2">User</th>
                        <th className="p-2">Issued</th>
                        <th className="p-2">Last used</th>
                        <th className="p-2">IP</th>
                        <th className="p-2">UA</th>
                        <th className="p-2">Expires</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map((t) => (
                        <tr key={t.id} className="border-t">
                            <td className="p-2">
                                <div className="font-medium">{t.user?.name ?? t.user?.email ?? "Unknown"}</div>
                                <div className="text-sm text-gray-600">{t.user?.email}</div>
                            </td>
                            <td className="p-2">{formatDistanceToNow(new Date(t.createdAt), { addSuffix: true })}</td>
                            <td className="p-2">{t.lastUsedAt ? formatDistanceToNow(new Date(t.lastUsedAt), { addSuffix: true }) : "-"}</td>
                            <td className="p-2 text-sm">{t.ip ?? "-"}</td>
                            <td className="p-2 text-sm truncate max-w-xs">{t.userAgent ?? "-"}</td>
                            <td className="p-2">{t.expiresAt ? new Date(t.expiresAt).toLocaleString() : "never"}</td>
                            <td className="p-2">{t.revoked ? `revoked ${t.revokedAt ? formatDistanceToNow(new Date(t.revokedAt), { addSuffix: true }) : ""}` : "active"}</td>
                            <td className="p-2">
                                <Button disabled={t.revoked} onClick={() => onRevoke(t.id)}>Revoke</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
