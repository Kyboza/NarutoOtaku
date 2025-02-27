import { connectToDatabase } from "@/app/lib/mongodb";
import jwt from 'jsonwebtoken'
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dotenv from 'dotenv'

dotenv.config()

interface JwtPayload {
    userId: string;
}

const REFRESH_SECRET = process.env.REFRESH_SECRET ?? '';
if(!REFRESH_SECRET) throw new Error("REFRESH_SECRET is not set in environment variables");

export async function POST() {
    const storedCookie = cookies()
    if(!storedCookie) return NextResponse.json({message: 'Could not find stored cookie'}, {status: 400})

    const refreshToken = (await storedCookie).get('refreshToken')?.value;
    if(!refreshToken) return NextResponse.json({message: 'No refreshtoken found or it has expired'}, {status: 400});

    const connection = await connectToDatabase()
    if(!connection.success) return NextResponse.json({message: connection.message}, {status: 500});

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as JwtPayload;
        if(!decoded || !decoded.userId) return NextResponse.json({ message: "Invalid refresh token" }, { status: 403 });

        const user = await User.findById(decoded.userId).select('+refreshToken')
        if(!user) return NextResponse.json({message: 'User is not logged in or does not exist'}, {status: 400});

        if(user.refreshToken !== refreshToken) return NextResponse.json({ message: "Refresh token mismatch" }, { status: 403 });

        user.refreshToken = '';
        user.isActive = false;
        await user.save()

        const response = NextResponse.json({message: 'User logged out successfully'}, {status: 204})

        response.cookies.set('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0)
        })

        return response
    }
    catch(error) {
        console.error('Could not logout user', error)
        return NextResponse.json({message: 'Could not logout user'}, {status: 500});
    }
}

