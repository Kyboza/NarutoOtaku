import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/mongodb'
import Comment from '@/app/models/Comment'
import SpecificForum from '@/app/models/SpecificForum'
import User from '@/app/models/User'
import { cookies } from 'next/headers'
import { ratelimit } from '@/app/utils/ratelimiter'
import { handleError } from '@/app/utils/errorHandler'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    if (!success)
      return NextResponse.json(
        { message: 'Reply limit reached for the moment' },
        { status: 429 }
      )

    const ACCESS_SECRET = process.env.ACCESS_SECRET!.trim()
    if (!ACCESS_SECRET)
      return NextResponse.json(
        { message: 'Failed to get env accessToken' },
        { status: 500 }
      )

    const { postId, replyContent } = await req.json()
    if (!postId || !mongoose.Types.ObjectId.isValid(postId) || !replyContent) {
      return NextResponse.json(
        { message: 'Missing information or id is invalid' },
        { status: 400 }
      )
    }

    const storedCookies = cookies()
    const accessToken = (await storedCookies).get('accessToken')?.value
    if (!accessToken)
      return NextResponse.json(
        { message: 'Could not find accessToken' },
        { status: 400 }
      )

    let decoded
    try {
      decoded = jwt.verify(accessToken, ACCESS_SECRET)
    } catch (error) {
      handleError(error)
      return NextResponse.json(
        { message: 'Invalid or expired accessToken' },
        { status: 401 }
      )
    }

    if (
      typeof decoded !== 'object' ||
      !decoded.userId ||
      !('userId' in decoded)
    ) {
      return NextResponse.json(
        { message: 'Invalid accessToken' },
        { status: 401 }
      )
    }

    const connection = await connectToDatabase()
    if (!connection.success)
      return NextResponse.json({ message: connection.message }, { status: 500 })

    const postItself = await SpecificForum.findById(postId)
    if (!postItself)
      return NextResponse.json(
        { message: 'Could not find post in database' },
        { status: 400 }
      )

    const user = await User.findById(decoded.userId)
    if (!user)
      return NextResponse.json(
        { message: 'Could not find user in database' },
        { status: 400 }
      )

    const newComment = new Comment({
      commentContent: replyContent,
      userId: user._id,
      postId: postItself._id,
    })

    await newComment.save()
    postItself.comments.push(newComment._id)
    postItself.repliesAmount += 1
    await postItself.save()

    user.comments.push({
      commentId: newComment._id,
      content: replyContent,
    })
    await user.save()

    return NextResponse.json(
      { message: 'Successfully posted comment' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to create reply' },
      { status: 500 }
    )
  }
}
