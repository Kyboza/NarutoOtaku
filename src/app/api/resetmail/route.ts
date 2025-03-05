import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

dotenv.config()

const EMAIL_USER = process.env.EMAIL_USER ?? '';
const EMAIL_PASS = process.env.EMAIL_PASS ?? '';

if(!EMAIL_USER || !EMAIL_PASS) throw new Error('Could not get email user or pass variable from env file')

export async function POST(req: NextRequest){
    const {email, username} = await req.json()
    if(!email || !username) return NextResponse.json({message: 'Did not recieve any username or email from frontend'}, {status: 400})

    const connection = await connectToDatabase()
    if(!connection.success) return NextResponse.json({message: connection.message}, {status: 500});


    try {
        const veriCode = crypto.randomBytes(2).toString('hex');
        const hashedCode = await bcrypt.hash(veriCode, 10);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        const user = await User.findOne({$and: [{email: email}, {username: username}]});
        if(!user) return NextResponse.json({message: 'No user found in database with that email or username'}, {status: 400});

        user.resetCode = hashedCode;
        user.resetCodeExpires = expiresAt;
        await user.save()



        const sendEmail = async(email: string, veriCode: string) => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASS
                }
            })

            const mailOptions = {
                from: EMAIL_USER,
                to: email,
                subject: 'Reset Password NarutoOtaku',
                text: `Verification Code: ${veriCode}. It resets in 5 minutes`
            }

            await transporter.sendMail(mailOptions)
        };

        try{
            await sendEmail(email, veriCode)
        } catch(error){
            console.error('Email failed to send', error)
            return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({message:'Mail Successfully sent'}, {status: 200})
    }
    catch(error){
        console.error('Could not send reset code to user', error)
        return NextResponse.json({message: 'Could not send reset code to user'}, {status: 500})
    }
}