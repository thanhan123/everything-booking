"use client"

export default function DashboardError({ error }: { error: Error }) {
    return (
        <div className="p-6 text-red-500 font-semibold">
            {error.message === "UNAUTHORIZED" && (
                <p>You must be logged in to access this page.</p>
            )}
            {error.message === "FORBIDDEN" && (
                <p>You do not have permission to view this page.</p>
            )}
        </div>
    )
}
