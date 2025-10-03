import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Define which routes require which roles
const roleProtectedRoutes: Record<string, string[]> = {
    "/admin": ["ADMIN"],
    "/store-admin": ["ADMIN", "STORE_ADMIN"],
    "/dashboard": ["ADMIN", "STORE_ADMIN"],
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Check if the route matches any protected prefix
    const matched = Object.entries(roleProtectedRoutes).find(([route]) =>
        pathname.startsWith(route)
    )

    if (!matched) {
        return NextResponse.next()
    }

    const allowedRoles = matched[1];

    // Get the session token from cookies
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
        // Not logged in
        const signInUrl = new URL("/api/auth/signin", req.url)
        signInUrl.searchParams.set("callbackUrl", req.url)
        return NextResponse.redirect(signInUrl)
    }

    // Check role
    const userRole = token.role as string | undefined
    if (!userRole || !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    return NextResponse.next()
}

// Run middleware on these routes only
export const config = {
    matcher: [
        "/admin/:path*",
        "/store-admin/:path*",
        "/dashboard/:path*",
    ],
}
