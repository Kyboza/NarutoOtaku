"use server";

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { cookies } from "next/headers";

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET ?? '';
const REFRESH_SECRET = process.env.REFRESH_SECRET ?? ''

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("ACCESS_SECRET or REFRESH_SECRET is not set in environment variables");
}

export async function getUserFromToken() {

    const storedCookies = cookies();
    
    const accessToken = (await storedCookies).get('accessToken')?.value;
    if (!accessToken) throw new Error('No accessToken active');
    
    let decoded;
    try {
        decoded = jwt.verify(accessToken, ACCESS_SECRET);
    } catch (error) {
        handleError(error)
    }

    if (typeof decoded !== 'object' || decoded === null || !('userId' in decoded)) {
        throw new Error('Invalid accessToken or no id connected to it');
    }

    const connection = await connectToDatabase();
    if (!connection.success) throw new Error(connection.message);

    try {
        const user = await User.findById(decoded.userId);
        if (!user) throw new Error('Could not find user in database');
        return user;  // Return the user data if found
    } catch (error) {
        handleError(error)
    }
}





export async function updateUserInfo(updatedData: {gender: string; fighting: string; age: string; weight: string; about: string}) {
    if(!updatedData) throw new Error('Did not recieve all information needed to update')
    const {gender, fighting, age, weight, about} = updatedData

    const storedCookies = cookies()

    const accessToken = (await storedCookies).get('accessToken')?.value;
    if(!accessToken) throw new Error('No accessToken active');

    let decoded;
    try{
        decoded = jwt.verify(accessToken, ACCESS_SECRET)
    } catch(error){
        handleError(error)
    }

    if(typeof decoded !== 'object' || decoded === null || !('userId' in decoded)){
        throw new Error('Invalid accessToken or no id connected to it');
    }

    const connection = await connectToDatabase()
    if(!connection.success) throw new Error(connection.message);

    try {
        const user = await User.findById(decoded.userId)
        if(!user) throw new Error('Could not find user in database');
        user.gender = gender;
        user.style = fighting;
        user.weight = weight;
        user.age = age
        user.about = about;
        await user.save()
        const data = user.username
        return data
    } catch (error) {
        handleError(error)
    }
}
