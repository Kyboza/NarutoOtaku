import { connectToDatabase } from "@/app/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import User from "@/app/models/User"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { ratelimit } from "@/app/utils/ratelimiter"

export async function POST(req: NextRequest) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1"
        const { success } = await ratelimit.limit(ip)
        if (!success)
            return NextResponse.json(
                {
                    message:
                        "Too many requests to logout, please try again later",
                },
                { status: 429 },
            )

        const { username, visitingUsername } = await req.json()
        if (!username || !visitingUsername) {
            return NextResponse.json(
                { message: "Missing parameters" },
                { status: 400 },
            )
        }

        const storedCookies = cookies()
        const accessToken = (await storedCookies).get("accessToken")?.value
        if (!accessToken)
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 },
            )

        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET ?? "")
        if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 403 },
            )
        }

        await connectToDatabase()

        const [follower, target] = await Promise.all([
            User.findById(decoded.userId),
            // Using a case-insensitive query with the "username" field
            User.findOne({ username: { $regex: `^${username}$`, $options: "i" } }),
        ])

        if (!follower || !target) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 },
            )
        }

        const isFollowing = target.following.includes(follower.username)

        if (isFollowing) {
            target.following.pull(follower.username)
            await target.decrementFollow()
            await target.save()
        } else {
            target.following.addToSet(follower.username)
            await target.incrementFollow()
            await target.save()
        }

        return NextResponse.json({
            message: isFollowing ? "Unfollowed" : "Followed",
            following: target.following,
            followers: target.followers,
        })
    } catch (error) {
        console.error("Error in follow/unfollow flow:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        )
    }
}
