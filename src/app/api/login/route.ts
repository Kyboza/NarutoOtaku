import { connectToDatabase } from "@/app/lib/mongodb"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import User from "@/app/models/User"
import { ratelimit } from "@/app/utils/ratelimiter"

const REFRESH_SECRET = process.env.REFRESH_SECRET!.trim()
const ACCESS_SECRET = process.env.ACCESS_SECRET!.trim()

if (!REFRESH_SECRET || !ACCESS_SECRET)
    throw new Error("One SECRET is not set in environment variables")

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
                { message: "No body provided" },
                { status: 500 },
            )
        const { username, password } = body

        const connection = await connectToDatabase()
        if (!connection.success)
            return NextResponse.json(
                { message: connection.message },
                { status: 500 },
            )

        if (!REFRESH_SECRET || !ACCESS_SECRET) {
            console.error("Internal error could not get validation tokens")
            return NextResponse.json(
                { message: "Internal error, not validation tokens" },
                { status: 500 },
            )
        }

        const existingUser = await User.findOne({ username: username }).select(
            "+password",
        )
        if (!existingUser)
            return NextResponse.json(
                { message: "User does not exist" },
                { status: 400 },
            )

        const comparedPassword = await bcrypt.compare(
            password,
            existingUser.password,
        )
        if (!comparedPassword)
            return NextResponse.json(
                { message: "Passwords do not match" },
                { status: 400 },
            )

        const payload = {
            userId: existingUser._id,
        }

        const accessToken = jwt.sign(payload, ACCESS_SECRET, {
            expiresIn: "15m",
        })

        const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
            expiresIn: "7d",
        })

        existingUser.refreshToken = refreshToken
        existingUser.isActive = true
        existingUser.lastLogin = new Date()
        await existingUser.save()

        const response = NextResponse.json(
            {
                message: "User Authenticated",
                data: {
                    isActive: true,
                    username: existingUser.username,
                },
            },
            { status: 200 },
        )

        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 15,
        })

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        })

        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Internal error" }, { status: 500 })
    }
}
