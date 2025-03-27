import { connectToDatabase } from "@/app/lib/mongodb";
import SpecificForum from "@/app/models/SpecificForum";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET({params}: {params: {postId: string}}) {
    try {
    const {postId} = await params; 


    const connection = await connectToDatabase();
    if (!connection.success) {
        return NextResponse.json({ message: connection.message }, { status: 500 });
    }


    const isValidObjectId = mongoose.Types.ObjectId.isValid(postId);
    if (!isValidObjectId) {
        return NextResponse.json({ message: "Not a valid ObjectId" }, { status: 400 });
    }

        const actualPost = await SpecificForum.findById(postId);

        if (!actualPost) {
            return NextResponse.json({ message: "No post with the specific id was found" }, { status: 404 });
        }

        return NextResponse.json(actualPost, { status: 200 });

    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ message: "Could not get post"}, { status: 500 });
    }
}
