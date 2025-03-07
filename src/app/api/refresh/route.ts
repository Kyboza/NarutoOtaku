import { connectToDatabase } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import User from "@/app/models/User";
import dotenv from 'dotenv'

dotenv.config()

const ACCESS_SECRET = process.env.ACCESS_SECRET ?? ''
const REFRESH_SECRET = process.env.REFRESH_SECRET ?? '';
if(!REFRESH_SECRET || !ACCESS_SECRET) {
    console.error('Could not get Refresh or Access Token from env');
    throw new Error('Could not get Refresh or Access Token from env')
}

export async function GET(){
    const storedCookies = cookies()
    const refreshToken = (await storedCookies).get('refreshToken')?.value;
    if(!refreshToken) return NextResponse.json({message: 'No refresh token found user is not logged in'});

    const connection = await connectToDatabase();
    if(!connection.success) return NextResponse.json({message: connection.message}, {status: 500});

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        if(decoded === null || typeof decoded !== 'object' || !('userId' in decoded)) return NextResponse.json({message: 'Refresh token is invalid or it is missing content'}, {status: 401});

        const user = await User.findById(decoded.userId);
        if(!user) return NextResponse.json({message: 'User does not exist in database'}, {status: 400});

        const payload = {
            userId: user._id
        }

        const accessToken = jwt.sign(payload, ACCESS_SECRET, {expiresIn: '5h'})

        const response = NextResponse.json({message: 'Successfully updated accessToken'}, {status: 200});

        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 5 * 60 * 60
        })

        return response


    } catch(error){
        console.error('Could not update accessToken', error);
        return NextResponse.json({message: 'Failed to generate a new accessToken for user'}, {status: 500});
    }
}