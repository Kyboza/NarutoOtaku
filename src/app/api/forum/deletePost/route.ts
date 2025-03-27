import mongoose from 'mongoose'
import { connectToDatabase } from '@/app/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/app/models/User'
import SpecificForum from '@/app/models/SpecificForum'
import Post from '@/app/models/Post'
import Comment from '@/app/models/Comment'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { ratelimit } from '@/app/utils/ratelimiter'

export async function DELETE(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    if (!success)
      return NextResponse.json(
        { message: 'To many requests to logout, please try again later' },
        { status: 429 }
      )

    const postId = req.nextUrl.searchParams.get('postId')
    if (!postId)
      return NextResponse.json(
        { message: 'No PostId provided' },
        { status: 400 }
      )
    if (!mongoose.Types.ObjectId.isValid(postId))
      return NextResponse.json(
        { message: 'postId is not a valid ObjectId' },
        { status: 400 }
      )

    const ACCESS_SECRET = process.env.ACCESS_SECRET!.trim()
    if (!ACCESS_SECRET)
      return NextResponse.json(
        { message: 'Can not validate Access Token' },
        { status: 500 }
      )

    const storedCookies = cookies()
    const accessToken = (await storedCookies).get('accessToken')?.value
    if (!accessToken)
      return NextResponse.json(
        { message: 'User does not have an accessToken' },
        { status: 401 }
      )

    const decoded = jwt.verify(accessToken, ACCESS_SECRET)
    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded))
      return NextResponse.json(
        { message: 'Token is exists but is invalid' },
        { status: 401 }
      )

    const connection = await connectToDatabase()
    if (!connection.success)
      return NextResponse.json({ message: connection.message }, { status: 500 })

    const userIdFromToken = decoded.userId

    const postInPost = await Post.findOneAndDelete({
      postId: postId,
      userId: userIdFromToken,
    })
    if (!postInPost)
      return NextResponse.json(
        { message: 'Could not find Post in Post Collection' },
        { status: 404 }
      )

    const postInUser = await User.updateOne(
      { 'posts.postId': postId },
      { $pull: { posts: { postId: postId } } }
    )

    if (postInUser.modifiedCount === 0) {
      return NextResponse.json(
        {
          message:
            'Could not find Post in Users Collection or post removal failed',
        },
        { status: 404 }
      )
    }

    const postInSpecific = await SpecificForum.findByIdAndDelete(postId)
    if (!postInSpecific)
      return NextResponse.json(
        { message: 'Could not find Post in SpecificPosts Collection' },
        { status: 404 }
      )

    const commentInComment = await Comment.findOneAndDelete({
      userId: userIdFromToken,
    })
    if (!commentInComment)
      return NextResponse.json(
        { message: 'Could not find comment in comment collection' },
        { status: 404 }
      )

    const commentInUser = await User.findOneAndUpdate(
      { 'comments.commentId': commentInComment._id },
      { $pull: { comments: { commentId: commentInComment._id } } },
      { new: true }
    )
    if (!commentInUser)
      return NextResponse.json(
        { message: 'Could not remove comment from User Collection' },
        { status: 404 }
      )

    return NextResponse.json(
      { message: 'Post Successfully deleted' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Could not delete Post, Something went wrong' },
      { status: 500 }
    )
  }
}
