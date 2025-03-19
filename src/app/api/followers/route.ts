import { connectToDatabase } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

dotenv.config();

export async function POST(req: NextRequest) {
  try {
    const { username, visitingUsername } = await req.json();
    if (!username || !visitingUsername) {
      return NextResponse.json({ message: "Missing parameters" }, { status: 400 });
    }

    // Verify JWT Token
    const storedCookies = cookies();
    const accessToken = (await storedCookies).get("accessToken")?.value;
    if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET ?? "");
    if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    await connectToDatabase();

    const [follower, target] = await Promise.all([
      User.findById(decoded.userId),
      User.findOne({ username: visitingUsername }),
    ]);

    if (!follower || !target) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isFollowing = follower.following.includes(target.username);

    if (isFollowing) {
      // Unfollow logic
      await User.findByIdAndUpdate(follower._id, { $pull: { following: target.username } });
      await User.findByIdAndUpdate(target._id, { $inc: { followers: -1 } });
    } else {
      // Follow logic
      await User.findByIdAndUpdate(follower._id, { $addToSet: { following: target.username } });
      await User.findByIdAndUpdate(target._id, { $inc: { followers: 1 } });
    }

    const updatedFollower = await User.findById(follower._id).select("following");
    const updatedTarget = await User.findById(target._id).select("followers");

    return NextResponse.json({
      message: isFollowing ? "Unfollowed" : "Followed",
      following: updatedFollower.following,
      followers: updatedTarget.followers,
    });

  } catch (error) {
    console.error("Error in follow/unfollow flow:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
