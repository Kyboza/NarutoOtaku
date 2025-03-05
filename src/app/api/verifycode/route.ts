import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest){
    const {email, username, code} = await req.json()
    if(!email || !username || !code) return NextResponse.json({message: 'No code, email or username is missing'}, {status: 400});

    const connection = await connectToDatabase()
    if(!connection.success) return NextResponse.json({message: connection.message}, {status: 500});

    try {
        const user = await User.findOne({$and: [{email: email}, {username: username}]});
        if(!user) return NextResponse.json({message: 'Could not find a user with that code'}, {status: 400})
        const dbCode = user.resetCode;
        
        const comparison = await bcrypt.compare(code, dbCode)
        if(!comparison) return NextResponse.json({message: 'Code in db and provided code does not match'}, {status: 400});

        user.verifiedCode = true;
        await user.save()

        return NextResponse.json({message: 'Codes matched successfully!'}, {status: 200})

    }
    catch(error){
        console.error('Failed to verify code', error)
        return NextResponse.json({message: 'Could not verify the code'}, {status: 500});
    }
}