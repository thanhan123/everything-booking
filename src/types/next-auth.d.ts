import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        role: "ADMIN" | "STORE_ADMIN" | "USER"
    }

    interface Session {
        user: {
            id: string
            role: "ADMIN" | "STORE_ADMIN" | "USER"
            name?: string | null
            email?: string | null
            image?: string | null
        }
    }
}
