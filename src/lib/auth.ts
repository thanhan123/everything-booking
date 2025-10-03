import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                })

                if (!user || !user.passwordHash) return null

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash
                )
                if (!isValid) return null

                return user
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as unknown as { role: unknown }).role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                (session.user as unknown as { role: unknown }).role = token.role
            }
            return session
        },
    },
}
