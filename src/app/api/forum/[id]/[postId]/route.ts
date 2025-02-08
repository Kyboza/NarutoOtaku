import { connectToDatabase } from "@/app/lib/mongodb";
import SpecificForum from "@/app/models/SpecificForum";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest, {params}: {params: {postId: string}}) {
    const {postId} = await params;  // Destructure directly from params

    // Connect to the database
    const connection = await connectToDatabase();
    if (!connection.success) {
        console.error("Could not connect to database");
        return NextResponse.json({ message: "Could not connect to database" }, { status: 500 });
    }

    // Validate if the postId is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(postId);
    if (!isValidObjectId) {
        console.error("Id is not a valid ObjectId");
        return NextResponse.json({ message: "Not a valid ObjectId" }, { status: 400 });
    }

    try {
        // Find the post by ObjectId
        const actualPost = await SpecificForum.findById(postId); // Use findById instead of find()

        // Check if the post exists
        if (!actualPost) {
            console.error("No post with that id was found");
            return NextResponse.json({ message: "No post with the specific id was found" }, { status: 404 });
        }

        // Return the found post
        return NextResponse.json(actualPost, { status: 200 });

    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ message: "Could not get post"}, { status: 500 });
    }
}
