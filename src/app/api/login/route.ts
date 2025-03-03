import { connectToDatabase } from "@/app/lib/mongodb";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import dotenv from 'dotenv'

dotenv.config()

const REFRESH_SECRET = process.env.REFRESH_SECRET ?? '';
const ACCESS_SECRET = process.env.ACCESS_SECRET ?? '';

if(!REFRESH_SECRET || !ACCESS_SECRET ) throw new Error("One SECRET is not set in environment variables");

export async function POST(req: NextRequest){
    const body = await req.json()
    if(!body) return NextResponse.json({message: "No body provided"}, {status: 500});
    const {username, password} = body;

    const connection = await connectToDatabase();
    if(!connection.success) return NextResponse.json({message: connection.message}, {status: 500});

    if(!REFRESH_SECRET || !ACCESS_SECRET){
        console.error('Internal error could not get validation tokens')
        return NextResponse.json({message: 'Internal error, not validation tokens'}, {status: 500})
    }
    
    try{
        const existingUser = await User.findOne({username: username}).select('+password');
        if(!existingUser) return NextResponse.json({message: "User does not exist"}, {status: 400});

        const comparedPassword = await bcrypt.compare(password, existingUser.password);
        if(!comparedPassword) return NextResponse.json({message: 'Passwords do not match'}, {status: 400});

        const payload = {
            userId: existingUser._id
        }

        const accessToken = jwt.sign(payload, ACCESS_SECRET, {expiresIn: '5m'});

        const refreshToken = jwt.sign(payload, REFRESH_SECRET, {expiresIn: '7d'});

        existingUser.refreshToken = refreshToken;
        existingUser.isActive = true;
        await existingUser.save()

        const response = NextResponse.json({message: 'User Authenticated'}, {status: 200})

        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production',
            maxAge: 5 * 60
        });

        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60
        });

        return response;


    } catch(error){
        console.error('Internal error', error)
        return NextResponse.json({message: "Internal error"}, {status: 500});
    }
}