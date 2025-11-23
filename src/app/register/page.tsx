"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(form),
            });

            if (res.ok) {
                router.push("/verify-email-sent");
            } else {
                console.error("Register failed");
            }
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-xl border rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Create an account
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-xl"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm mt-4 text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="underline text-blue-600 hover:text-blue-800"
                        >
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
