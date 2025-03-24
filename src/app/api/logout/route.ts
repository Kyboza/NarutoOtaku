import { connectToDatabase } from "@/app/lib/mongodb";
import jwt from 'jsonwebtoken';
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ratelimit } from "@/app/utils/ratelimiter";


export async function POST(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
    const {success} = await ratelimit.limit(ip)
    if(!success) return NextResponse.json({message: 'To many requests to logout, please try again later'}, {status: 429});

    const REFRESH_SECRET = process.env.REFRESH_SECRET ?? '';
    if (!REFRESH_SECRET) {
        console.error('REFRESH_SECRET is not set in environment variables');
        throw new Error("REFRESH_SECRET is not set in environment variables");
    }
    const storedCookie = cookies();
    const connection = await connectToDatabase();

    if (!connection.success) {
        return NextResponse.json({ message: connection.message }, { status: 500 });
    }

    const refreshToken = (await storedCookie).get('refreshToken')?.value;

    if (!refreshToken) {
        const expirationTime = new Date(Date.now() - 60 * 60 * 24 * 7 * 1000);

        const expiredUsers = await User.find({
            lastLogin: { $lte: expirationTime },
            isActive: true,
            refreshToken: { $ne: '' },
        });

        if (expiredUsers.length > 0) {
            console.log(`Found ${expiredUsers.length} expired users. Resetting status...`);

            // Reset the status of all expired users
            await User.updateMany(
                {
                    lastLogin: { $lte: expirationTime },
                    isActive: true,
                    refreshToken: { $ne: '' },
                },
                { $set: { isActive: false, refreshToken: '' } }
            );

            return NextResponse.json({ message: 'Expired users have been logged out.' }, { status: 200 });
        }

        // If no refresh token and no expired users, return a specific message
        return NextResponse.json({ message: 'No refresh token found or it has expired.' }, { status: 400 });
    }

    // Case 2: refreshToken exists
    try {
        // Verify the refreshToken
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

        if (typeof decoded !== 'object' || decoded === null || !('userId' in decoded)) {
            return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 });
        }

        const user = await User.findById(decoded.userId).select('+refreshToken');
        if (!user) {
            return NextResponse.json({ message: 'User is not logged in or does not exist' }, { status: 400 });
        }

        // If the stored refresh token doesn't match the incoming one
        if (user.refreshToken !== refreshToken) {
            return NextResponse.json({ message: "Refresh token mismatch" }, { status: 403 });
        }

        // Reset user's session
        user.refreshToken = '';
        user.isActive = false;
        await user.save();

        // Set up the response and cookies
        const response = NextResponse.json({ message: 'User logged out successfully' }, { status: 200 });

        response.cookies.set('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0),
        });

        response.cookies.set('accessToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0),
        });

        return response;

    } catch (error) {
        console.error('Could not logout user', error);
        return NextResponse.json({ message: 'Could not logout user' }, { status: 500 });
    }
}
