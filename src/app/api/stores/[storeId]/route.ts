import { NextResponse } from "next/server"
import { db } from "@/lib/db"

interface Params {
    storeId: string
}

export async function GET(req: Request, { params }: { params: Params }) {
    const { storeId } = params

    const store = await db.store.findUnique({
        where: { id: storeId },
    })

    if (!store) {
        return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    return NextResponse.json(store)
}
