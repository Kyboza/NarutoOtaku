import { connectToDatabase } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";

export async function POST(req: NextRequest){
    try {
        const {userProp} = await req.json();
        if(!userProp) return NextResponse.json({message: 'No user provided in param'}, {status: 400});

        const connection = await connectToDatabase()
        if(!connection.success) return NextResponse.json({message: connection.message}, {status: 500});

        const user = await User.findOne({username: userProp}).select('followers following');
        if(!user) return NextResponse.json({message: 'Could not find followers array for user'}, {status: 404});
        const data = { following: user.following, followers: user.followers };
        return NextResponse.json({message: 'Successfully got followers array', data}, {status: 200})
    } catch(error){
        console.error(error)
        return NextResponse.json({message: 'Failed to get followers to redux'}, {status: 500})
    }
}
