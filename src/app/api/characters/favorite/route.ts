import { connectToDatabase } from "@/app/lib/mongodb";
import Character from "@/app/models/Character";
import { NextResponse } from "next/server";

export async function GET(){
    const connection = await connectToDatabase();
    if(!connection.success) return NextResponse.json({message: connection.message}, {status: 500});

    try {
        const topCharacters = await Character.find({}, 'name likes image _id').sort({likes: -1}).limit(3);
        if(!topCharacters || topCharacters.length === 0) return NextResponse.json({message: 'No Characters found'}, {status: 404});

        return NextResponse.json({message: 'Successfully got top 3 liked characters', topCharacters}, {status: 200})
        
    } catch(error){
        handleError(error);
        return NextResponse.json({message: 'failed to fetch characters'}, {status: 500})
    }
}
