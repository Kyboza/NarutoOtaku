import { connectToDatabase } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/app/models/User";


const ACCESS_SECRET = process.env.ACCESS_SECRET ?? ''
const REFRESH_SECRET = process.env.REFRESH_SECRET ?? '';
if(!REFRESH_SECRET || !ACCESS_SECRET) {
    console.error('Could not get Refresh or Access Token from env');
    throw new Error('Could not get Refresh or Access Token from env')
}


export async function GET(req: NextRequest){
    const refreshToken = req.headers.get('Authorization')?.split(' ')[1];
    if(!refreshToken) return NextResponse.json({message: 'No refresh token found user is not logged in'}, {status: 401});

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

        const accessToken = jwt.sign(payload, ACCESS_SECRET, {expiresIn: '15m'})

        return NextResponse.json({message: 'Successfully updated accessToken', accessToken}, {status: 200});


    } catch(error){
        console.error('Could not update accessToken', error);
        return NextResponse.json({message: 'Failed to generate a new accessToken for user'}, {status: 500});
    }
}