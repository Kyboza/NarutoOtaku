import { connectToDatabase } from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import { ratelimit } from "@/app/utils/ratelimiter";

export async function POST(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
    const {success} = await ratelimit.limit(ip)
    if(!success) return NextResponse.json({message: 'To many requests to logout, please try again later'}, {status: 429});
    const { email, username, newPassword } = await req.json();

    if (!email || !username || !newPassword) {
        return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
    }

    const connection = await connectToDatabase();
    if (!connection.success) {
        return NextResponse.json({ message: connection.message }, { status: 500 });
    }

    try {
        const user = await User.findOne({$and: [{email: email}, {username: username}]});
        if (!user) {
            return NextResponse.json({ message: "No user found with that email" }, { status: 400 });
        }

        if (!user.resetCode || !user.verifiedCode || user.resetCodeExpires < new Date()) {
            return NextResponse.json(
                { message: "No active reset code or user has not verified their identity" },
                { status: 400 }
            );
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetCode = "";
        user.verifiedCode = false;
        user.resetCodeExpires = new Date(0)
        await user.save();

        return NextResponse.json({ message: "Successfully updated password" }, { status: 200 });

    } catch (error) {
        console.error("Failed to update password for user", error);
        return NextResponse.json({ message: "Failed to update password" }, { status: 500 });
    }
}
