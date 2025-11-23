import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Seeding users and accounts...")

    const users = [
        {
            name: "Admin User",
            email: "admin+2@example.com",
            role: "ADMIN",
        },
        {
            name: "Store Admin",
            email: "storeadmin+2@example.com",
            role: "STORE_ADMIN",
        },
        {
            name: "Regular User",
            email: "user+2@example.com",
            role: "USER",
        },
    ]

    const password = await bcrypt.hash("password123", 10)

    for (const userData of users) {
        // Upsert User
        const user = await prisma.user.upsert({
            where: { email: userData.email },
            update: {},
            create: {
                name: userData.name,
                email: userData.email,
                role: userData.role,
                passwordHash: password,
            },
        })

        // Create associated Account if not exists
        const existingAccount = await prisma.account.findFirst({
            where: {
                userId: user.id,
                provider: "credentials",
            },
        })

        if (!existingAccount) {
            await prisma.account.create({
                data: {
                    userId: user.id,
                    type: "credentials",
                    provider: "credentials",
                    providerAccountId: user.email, // must be unique
                },
            })
        }
    }

    console.log("✅ Seeding completed.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
