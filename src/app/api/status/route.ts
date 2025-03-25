import { connectToDatabase } from "@/app/lib/mongodb";
import jwt from 'jsonwebtoken';
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dotenv from 'dotenv';

dotenv.config();

const REFRESH_SECRET = process.env.REFRESH_SECRET ?? '';
if (!REFRESH_SECRET) {
    console.error('REFRESH_SECRET is not set in environment variables');
    throw new Error("REFRESH_SECRET is not set in environment variables");
}

export async function GET() {
    const storedCookies = cookies();
    const refreshToken = (await storedCookies).get('refreshToken')?.value;

    // 🚨 Om refreshToken saknas, returnera direkt att användaren är utloggad
    if (!refreshToken) {
        console.log("No refreshToken found. User is considered logged out.");
        return NextResponse.json({ message: 'User is logged out', isActive: false, username: '' }, { status: 200 });
    }

    const connection = await connectToDatabase();
    if (!connection.success) return NextResponse.json({ message: connection.message }, { status: 500 });

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        if (typeof decoded !== 'object' || decoded === null || !('userId' in decoded)) {
            return NextResponse.json({ message: 'Invalid refreshToken or no ID connected to it' }, { status: 401 });
        }

        const userStatus = await User.findById(decoded.userId).select('isActive username');
        if (!userStatus) {
            console.error(`User with ID ${decoded.userId} not found.`);
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const data = {isActive: userStatus.isActive, username: userStatus.username}

        return NextResponse.json({
            message: 'User is logged in',
            data,
        }, { status: 200 });

    } catch (error) {
        console.error('Could not check status of user', error);
        return NextResponse.json({ message: 'Failed to check status of potentially logged-in user' }, { status: 500 });
    }
}
