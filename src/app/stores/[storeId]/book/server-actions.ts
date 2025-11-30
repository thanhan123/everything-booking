"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function createBooking(formData: FormData) {
    const user = await getCurrentUser()
    if (!user) redirect("/login")

    const storeId = formData.get("storeId") as string
    const date = formData.get("date") as string
    const notes = formData.get("notes") as string | null

    await db.booking.create({
        data: {
            userId: user.id,
            storeId,
            date: new Date(date),
            notes: notes ?? undefined
        }
    })

    redirect(`/stores/${storeId}?success=1`)
}
