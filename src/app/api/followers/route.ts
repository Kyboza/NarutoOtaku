import { connectToDatabase } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

dotenv.config();

export async function POST(req: NextRequest) {
    try {
        const { username } = await req.json();
        if (!username) return NextResponse.json({ message: 'No username provided' }, { status: 400 });

        const ACCESS_SECRET = process.env.ACCESS_SECRET ?? '';
        if (!ACCESS_SECRET) return NextResponse.json({ message: 'Access secret missing' }, { status: 500 });

        const storedCookie = cookies();
        const accessToken = (await storedCookie).get('accessToken')?.value;
        if (!accessToken) return NextResponse.json({ message: 'No access token found' }, { status: 401 });

        // Verifiera JWT-token
        let decoded;
        try {
            decoded = jwt.verify(accessToken, ACCESS_SECRET);
        } catch (error) {
            return NextResponse.json({ message: 'Invalid access token', error}, { status: 403 });
        }

        if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
            return NextResponse.json({ message: 'Invalid access token payload' }, { status: 403 });
        }

        // Anslut till databasen
        const connection = await connectToDatabase();
        if (!connection.success) return NextResponse.json({ message: connection.message }, { status: 500 });

        // Hämta användare
        const [userWhoFollows, userToBeFollowed] = await Promise.all([
            User.findById(decoded.userId),
            User.findOne({ username })
        ]);

        if (!userWhoFollows) return NextResponse.json({ message: 'User not found (follower)' }, { status: 400 });
        if (!userToBeFollowed) return NextResponse.json({ message: 'User not found (to be followed)' }, { status: 400 });

        // Kontrollera om användaren redan följer
        const isFollowing = userWhoFollows.following.includes(userToBeFollowed.username);

        // Uppdatera följare och följande atomärt
        if (isFollowing) {
            await Promise.all([
                User.findByIdAndUpdate(userWhoFollows._id, {
                    $pull: { following: userToBeFollowed.username }
                }),
                User.findByIdAndUpdate(userToBeFollowed._id, {
                    $inc: { followers: -1 }
                })
            ]);
        } else {
            await Promise.all([
                User.findByIdAndUpdate(userWhoFollows._id, {
                    $addToSet: { following: userToBeFollowed.username }
                }),
                User.findByIdAndUpdate(userToBeFollowed._id, {
                    $inc: { followers: 1 }
                })
            ]);
        }

        return NextResponse.json({
            message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully',
            following: !isFollowing
        });

    } catch (error) {
        console.error("Error in follow/unfollow flow:", error);
        return NextResponse.json({ message: 'Failed to update followers' }, { status: 500 });
    }
}
