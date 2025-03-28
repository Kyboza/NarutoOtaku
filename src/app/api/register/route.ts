import { connectToDatabase } from "@/app/lib/mongodb"
import User from "@/app/models/User"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
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
                        "To many requests to logout, please try again later",
                },
                { status: 429 },
            )

        const body = await req.json()
        if (!body)
            return NextResponse.json(
                { message: "No register information recieved in body" },
                { status: 400 },
            )
        const { email, username, password } = body

        const connection = await connectToDatabase()
        if (!connection.success)
            return NextResponse.json(
                { message: connection.message },
                { status: 500 },
            )

        const userExists = await User.findOne({
            $or: [{ email: email }, { username: username }],
        })
        if (userExists) {
            console.error("User with that username or email already exists")
            return NextResponse.json(
                { message: "User with that username or email already exists" },
                { status: 500 },
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword,
        })

        await newUser.save()
        return NextResponse.json(
            { message: "Successfully posted user" },
            { status: 200 },
        )
    } catch (error) {
        console.error("Could not register user", error)
        return NextResponse.json(
            { message: "Could not register user" },
            { status: 500 },
        )
    }
}
