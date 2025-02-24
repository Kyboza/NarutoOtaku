import mongoose from "mongoose";
import { connectToDatabase } from "@/app/lib/mongodb";
import Forum from "@/app/models/Forum";
import SpecificForum from "@/app/models/SpecificForum";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {categoryId, postTitle, postContent} = body;

    const connection = await connectToDatabase()
    if(!connection.success) return NextResponse.json({message: connection.message}, {status: 500});

   if(!mongoose.Types.ObjectId.isValid(categoryId)){
    console.error("Id is not a valid object id")
    return NextResponse.json({message: "Provided Id is not a valid ObjectId"}, {status: 400})
   }

    try {
        const foundCategory = await Forum.findOne({_id: categoryId})
        if(!foundCategory){
            console.error('Given id does not exist in the specific forum DB')
            return NextResponse.json({message: "Provided Id does not exist in database"}, {status: 400})
        }
        const newPost = new SpecificForum({
            title: postTitle,
            content: postContent,
            by: "Kyboz",
            posted: "01/21 - 16:51",
            replies: 8,
            latest: "01/21 - 16:51",
            categoryId: categoryId
        })

        await newPost.save()
        return NextResponse.json({message: "Succesfully posted post"}, {status: 200})
        
    } catch(error) {
        console.error("Could not send post to the specific category", error)
    }

}