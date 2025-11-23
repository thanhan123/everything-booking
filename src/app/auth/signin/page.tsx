"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded">
            <h1 className="text-xl font-bold mb-4">Sign In</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    signIn("credentials", { email, password, callbackUrl: "/" })
                }}
                className="space-y-4"
            >
                <input
                    className="w-full border p-2 rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full border p-2 rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Sign In
                </button>
            </form>
        </div>
    )
}
