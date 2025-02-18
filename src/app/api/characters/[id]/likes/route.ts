import mongoose from "mongoose";
import { connectToDatabase } from "@/app/lib/mongodb";
import Character from "@/app/models/Character";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {

    const {id} = params;
    
    const body = await req.json()
    const {action} = body

    if(!action || (action !== "increment" && action !== "decrement")) return NextResponse.json({ message: "Invalid action" }, { status: 400 });

    if(!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({message: "id is not a valid objectid"}, {status: 400})

    const connection = await connectToDatabase()
    if(!connection.success) {
        return NextResponse.json({message: connection.message}, {status: 500})
    }


    try{
        const character = await Character.findById(id);
        if(!character) return NextResponse.json({message: "Could not find character in db"}, {status: 400})
        if(action === 'increment') {
            await character.incrementLikes()
            return NextResponse.json({message: "Successfully incremented likes", likes: character.likes}, {status: 200})
        } else if(action === 'decrement'){
            await character.decrementLikes()
            return NextResponse.json({message: "Successfully decremented likes", likes: character.likes}, {status: 200})
        }

    } catch(error){
        console.error("Could not update likes in db")
        return NextResponse.json({message: error}, {status: 500})
    }
}
