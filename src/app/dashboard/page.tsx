import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="space-y-4 flex flex-col">
                <Link href="/dashboard/stores">
                    <Button>Manage Stores</Button>
                </Link>
                <Link href="/dashboard/store-admins"><Button>Manage Store Admins</Button></Link>
            </div>
        </div>
    )
}
