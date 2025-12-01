import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"
import { Adapter } from "next-auth/adapters";
import crypto from "crypto"

async function generateRefreshToken(userId: string, userAgent?: string, ip?: string) {
    const token = crypto.randomBytes(48).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    return db.refreshToken.create({
        data: {
            token,
            userId,
            userAgent,
            ip,
            expiresAt,
        },
    });
}

async function rotateRefreshToken(oldToken: string, userId: string, userAgent?: string, ip?: string) {
    await db.refreshToken.updateMany({
        where: { token: oldToken },
        data: {
            revoked: true,
            revokedAt: new Date(),
        },
    });

    return generateRefreshToken(userId, userAgent, ip);
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.passwordHash) return null;

                const valid = await bcrypt.compare(credentials.password, user.passwordHash);
                if (!valid) return null;

                return user;
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 60 * 15,
    },

    jwt: {
        maxAge: 60 * 15,
    },

    secret: process.env.AUTH_SECRET,

    pages: {
        signIn: "/auth/signin",
    },

    callbacks: {
        // ------------------------
        // JWT CALLBACK
        // ------------------------
        async jwt({ token, user, trigger, session }) {
            const userAgent = session?.headers?.get("user-agent") ?? undefined;
            const ip = session?.headers?.get("x-forwarded-for") ?? undefined;

            // ---------------------------------------------------
            // CASE 1: FIRST LOGIN → issue initial refresh token
            // ---------------------------------------------------
            if (user) {
                const rt = await generateRefreshToken(user.id, userAgent, ip);

                return {
                    ...token,
                    userId: user.id,
                    role: user.role,
                    refreshToken: rt.token,
                    refreshTokenId: rt.id,
                };
            }

            // ---------------------------------------------------
            // EVERY REQUEST → Validate refresh token
            // ---------------------------------------------------
            if (token.refreshTokenId) {
                const dbToken = await db.refreshToken.findUnique({
                    where: { id: token.refreshTokenId as string },
                });

                // If not found → revoked or deleted
                if (!dbToken) {
                    return { ...token, error: "RefreshTokenRevoked" };
                }

                if (dbToken.revoked) {
                    return { ...token, error: "RefreshTokenRevoked" };
                }

                if (!dbToken.expiresAt || dbToken.expiresAt < new Date()) {
                    return { ...token, error: "RefreshTokenExpired" };
                }
            } else {
                return { ...token, error: "MissingRefreshToken" };
            }

            // ---------------------------------------------------
            // TRIGGER: UPDATE → ROTATE refresh token
            // (NextAuth calls this when session nears expiration)
            // ---------------------------------------------------
            if (trigger === "update" && token.refreshToken) {
                const dbToken = await db.refreshToken.findUnique({
                    where: { token: token.refreshToken as string },
                });

                if (!dbToken || dbToken.revoked || !dbToken.expiresAt || dbToken.expiresAt < new Date()) {
                    return { ...token, error: "RefreshTokenRevoked" };
                }

                const newRT = await rotateRefreshToken(
                    dbToken.token,
                    token.userId as string,
                    userAgent,
                    ip
                );

                await db.refreshToken.update({
                    where: { id: dbToken.id },
                    data: { lastUsedAt: new Date() },
                });

                return {
                    ...token,
                    refreshToken: newRT.token,
                    refreshTokenId: newRT.id,
                };
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user as unknown as { role: unknown }).role = token.role
                if (token.error) {
                    (session as unknown as { error: unknown }).error = token.error;
                }
            }
            return session
        },
    },
};

/**
 * Returns the full user record from the DB,
 * based on the NextAuth session.
 */
export async function getCurrentUser() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) return null

    const user = await db.user.findUnique({
        where: { email: session.user.email },
    })

    return user
}


export async function requireUser() {
    const user = await getCurrentUser()
    if (!user) throw new Error("UNAUTHORIZED")
    return user
}

export async function requireAdmin() {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
        throw new Error("FORBIDDEN")
    }
    return user
}

export async function requireStoreAdmin() {
    const user = await getCurrentUser()
    if (!user || user.role !== "STORE_ADMIN") {
        throw new Error("FORBIDDEN")
    }
    return user
}