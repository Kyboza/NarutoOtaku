import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/app/lib/mongodb";
import Forum from "@/app/models/Forum";
import SpecificForum from "@/app/models/SpecificForum";
import User from "@/app/models/User";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { postId, replyContent } = await req.json();

    if (!postId || !mongoose.Types.ObjectId.isValid(postId) || !replyContent) {
      return NextResponse.json({ error: "Missing ID, reply, or invalid ID" }, { status: 400 });
    }

    const storedCookies = cookies();
    const accessToken = (await storedCookies).get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "No accessToken active" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(accessToken, ACCESS_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token", error }, { status: 403 });
    }

    if (typeof decoded !== "object" || decoded === null || !("userId" in decoded)) {
      return NextResponse.json({ error: "Invalid accessToken or no ID connected to it" }, { status: 403 });
    }

    const connection = await connectToDatabase();
    if (!connection.success) {
      return NextResponse.json({ error: connection.message }, { status: 500 });
    }

    const postItself = await SpecificForum.findById(postId);
    if (!postItself) {
      return NextResponse.json({ error: "Could not find post with that ID" }, { status: 404 });
    }

    const forumForPost = await Forum.findById(postItself.categoryId);
    if (!forumForPost) {
      return NextResponse.json({ error: "Could not find forum section for that post" }, { status: 404 });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "Could not find user with that ID" }, { status: 404 });
    }

    // Lägg till svaret i postens kommentarer

    if (!Array.isArray(postItself.comments)) {
        postItself.comments = [];
    }

    console.log(user._id)

    postItself.comments.push({
      commentUsername: user.username,
      commentContent: replyContent,
      commentId: user._id,
      commentImg: user.imgPath
    });

    postItself.repliesAmount += 1;

    // Lägg till kommentaren i användarens kommentarer
    user.comments.push({
    commentId: new mongoose.Types.ObjectId(),
      userId: user._id,
      content: replyContent,
    });

    const commentInfo = postItself.comments

    await postItself.save();
    await user.save();

    return NextResponse.json({ message: "Reply submitted successfully", commentInfo}, {status: 200});
  } catch (error) {
    console.error("Error submitting reply:", error);
    return NextResponse.json({ error: "Could not submit reply" }, { status: 500 });
  }
}
