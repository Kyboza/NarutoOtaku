import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"
import User from "@/app/models/User"
import { inactivelimit } from "@/app/utils/ratelimiter"
export async function GET(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1"
    const ipLimit = await inactivelimit.limit(`checkExpired:ip:${ip}`)
    if (!ipLimit.success) {
        return NextResponse.json(
            {
                message:
                    "Too many requests from this IP, please try again later.",
            },
            { status: 429 },
        )
    }

    const globalLimit = await inactivelimit.limit("checkExpired:global")
    if (!globalLimit.success) {
        return NextResponse.json(
            {
                message:
                    "Inactive users already logged out less than a minute ago",
            },
            { status: 429 },
        )
    }

    try {
        const connection = await connectToDatabase()
        if (!connection.success) {
            return NextResponse.json(
                { message: connection.message },
                { status: 500 },
            )
        }

        const expirationTime = new Date(Date.now() - 60 * 60 * 24 * 7 * 1000) // 7 days ago

        const expiredUsers = await User.find({
            lastLogin: { $lte: expirationTime },
            isActive: true,
            refreshToken: { $ne: "" },
        })

        if (expiredUsers.length > 0) {
            // Reset the status of all expired users
            await User.updateMany(
                {
                    lastLogin: { $lte: expirationTime },
                    isActive: true,
                    refreshToken: { $ne: "" },
                },
                { $set: { isActive: false, refreshToken: "" } },
            )

            return NextResponse.json(
                { message: "Expired users have been logged out." },
                { status: 200 },
            )
        } else {
            return NextResponse.json(
                { message: "No expired users found." },
                { status: 200 },
            )
        }
    } catch (error) {
        console.error("Error checking for expired sessions:", error)
        return NextResponse.json(
            { message: "Error occurred while checking expired sessions." },
            { status: 500 },
        )
    }
}
