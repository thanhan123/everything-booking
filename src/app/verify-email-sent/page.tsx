import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MailCheck } from "lucide-react"

export default function VerifyEmailSentPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <MailCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">Verify Your Email</CardTitle>
                    <CardDescription>
                        We’ve sent a verification link to your email address.
                    </CardDescription>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                    <p className="text-gray-600">
                        Please check your inbox and click the link to complete your registration.
                        If you don’t see the email, check your spam folder.
                    </p>

                    <Link href="/auth/signin">
                        <Button className="w-full">Back to Login</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
