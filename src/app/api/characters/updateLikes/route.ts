import { connectToDatabase } from "@/app/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import Character from "@/app/models/Character"
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
                        "To many requests to logout, please try again later",
                },
                { status: 429 },
            )

        const {
            data: { visitingUser, characterName },
        } = await req.json()
        if (!visitingUser || !characterName)
            return NextResponse.json(
                { message: "Liking user or character was not provided" },
                { status: 400 },
            )

        const ACCESS_SECRET = process.env.ACCESS_SECRET ?? ""
        if (!ACCESS_SECRET)
            return NextResponse.json(
                { message: "Did not find accesstoken from env" },
                { status: 500 },
            )

        const storedCookies = await cookies()
        const accessToken = (await storedCookies).get("accessToken")?.value
        if (!accessToken)
            return NextResponse.json(
                { message: "Cannot like character without accessToken" },
                { status: 401 },
            )

        const decoded = jwt.verify(accessToken, ACCESS_SECRET)
        if (!decoded || typeof decoded !== "object" || !("userId" in decoded))
            return NextResponse.json(
                { message: "Possibly manipulated accessToken" },
                { status: 403 },
            )

        const connection = await connectToDatabase()
        if (!connection.success)
            return NextResponse.json(
                { message: connection.message },
                { status: 500 },
            )

        const [user, character] = await Promise.all([
            User.findById(decoded.userId).select("username"),
            Character.findOne({ name: characterName }).select(
                "likes userWhoLike name",
            ),
        ])

        if (!user || !character) {
            return NextResponse.json(
                { message: "User or Character not found" },
                { status: 404 },
            )
        }

        if (visitingUser !== user?.username)
            return NextResponse.json(
                { message: "accessToken may have been manipulated" },
                { status: 401 },
            )

        const isLiking = character.userWhoLike.includes(user.username)

        if (isLiking) {
            await character.userWhoLike.pull(user.username)
            await character.decrementLikes()
        } else {
            await character.userWhoLike.addToSet(user.username)
            await character.incrementLikes()
        }

        await character.save()

        const data = {
            likes: character.likes,
            userWhoLike: character.userWhoLike,
        }

        return NextResponse.json(
            { message: "Successfully updated Likes", data },
            { status: 200 },
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: "Problem updating likes for character" },
            { status: 500 },
        )
    }
}

//SPARAR ANTALET FÖRFRÅGNINGAR KANSKE KAN ANVÄNDA I FRAMTIDEN
// const updatedCharacter = await Character.findOneAndUpdate(
//     { name: characterName },
//     update,
//     { new: true } // Returnera det uppdaterade dokumentet
// );

// if (!updatedCharacter) {
//     return NextResponse.json({ message: 'Character not found' }, { status: 404 });
// }

// return NextResponse.json({
//     message: 'Successfully updated Likes',
//     likes: updatedCharacter.likes,
//     userWhoLike: updatedCharacter.userWhoLike
// }, { status: 200 });
