"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export function AuthWatcher({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    useEffect(() => {
        const sessionError = (session as unknown as { error: unknown })?.error
        if (
            sessionError === "RefreshTokenRevoked" ||
            sessionError === "RefreshTokenExpired" ||
            sessionError === "MissingRefreshToken"
        ) {
            console.log("Auto logout due to invalid/expired token");
            signOut({ callbackUrl: "/auth/signin" });
        }
    }, [session]);

    return <>{children}</>;
}
