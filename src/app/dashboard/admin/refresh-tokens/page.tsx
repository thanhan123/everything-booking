import { requireAdmin } from "@/lib/auth"
import RefreshTokensTableClient from "./RefreshTokensTableClient"

export default async function AdminRefreshTokensPage() {
    await requireAdmin() // block non-admins at server level
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Issued Refresh Tokens</h1>
            <div>
                <RefreshTokensTableClient />
            </div>
        </div>
    )
}
