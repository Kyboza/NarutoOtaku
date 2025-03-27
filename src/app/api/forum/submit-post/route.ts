import mongoose from 'mongoose'
import { connectToDatabase } from '@/app/lib/mongodb'
import Forum from '@/app/models/Forum'
import SpecificForum from '@/app/models/SpecificForum'
import User from '@/app/models/User'
import Post from '@/app/models/Post'
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { ratelimit } from '@/app/utils/ratelimiter'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    if (!success)
      return NextResponse.json(
        { message: 'Ratelimit Reached' },
        { status: 429 }
      )

    const ACCESS_SECRET = process.env.ACCESS_SECRET!.trim()
    if (!ACCESS_SECRET) throw new Error('Could not find access value in env')

    const body = await req.json()
    const { categoryId, postTitle, postContent } = body

    const storedCookie = cookies()
    const accessToken = (await storedCookie).get('accessToken')?.value
    if (!accessToken)
      return NextResponse.json(
        { message: 'Missing accessToken to create post' },
        { status: 403 }
      )

    const decoded = jwt.verify(accessToken, ACCESS_SECRET)
    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded))
      return NextResponse.json(
        { message: 'Could not verify accessToken' },
        { status: 401 }
      )

    const connection = await connectToDatabase()
    if (!connection.success)
      return NextResponse.json({ message: connection.message }, { status: 500 })

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error('Id is not a valid object id')
      return NextResponse.json(
        { message: 'Provided Id is not a valid ObjectId' },
        { status: 400 }
      )
    }

    const foundCategory = await Forum.findOne({ _id: categoryId })
    if (!foundCategory) {
      console.error('Given id does not exist in the specific forum DB')
      return NextResponse.json(
        { message: 'Provided Id does not exist in database' },
        { status: 400 }
      )
    }

    const user = await User.findById(decoded.userId).select('username')
    if (!user)
      return NextResponse.json(
        { message: 'Could not find user in database' },
        { status: 400 }
      )

    const newPostActual = new SpecificForum({
      title: postTitle,
      content: postContent,
      by: user.username,
      userId: user._id,
      categoryId: categoryId,
    })
    await newPostActual.save()

    const newPost = new Post({
      postContent: postContent,
      userId: user._id,
      postId: newPostActual._id,
    })

    await newPost.save()

    await Forum.findByIdAndUpdate(categoryId, {
      $push: { posts: newPostActual._id },
    })

    await User.findByIdAndUpdate(user._id, {
      $push: {
        posts: {
          postId: newPostActual._id,
          content: postContent,
        },
      },
    })
    return NextResponse.json(
      { message: 'Succesfully posted post' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Could not send post to the specific category', error)
    return NextResponse.json(
      { message: 'An error occurred while creating the post' },
      { status: 500 }
    )
  }
}
