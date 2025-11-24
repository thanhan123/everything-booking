"use server"

import { db } from "@/lib/db";
import { redirect } from "next/navigation"

export async function createStore(data: { name: string; adminId?: string }) {
    await db.store.create({
        data: {
            name: data.name,
            adminId: data.adminId || null,
        },
    })

    redirect("/dashboard/stores")
}
