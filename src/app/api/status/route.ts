import { connectToDatabase } from '@/app/lib/mongodb'
import jwt from 'jsonwebtoken'
import User from '@/app/models/User'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const REFRESH_SECRET = process.env.REFRESH_SECRET!.trim()
    if (!REFRESH_SECRET) {
      throw new Error('REFRESH_SECRET is not set in environment variables')
    }
    const storedCookies = cookies()
    const refreshToken = (await storedCookies).get('refreshToken')?.value

    if (!refreshToken) {
      console.log('No refreshToken found. User is considered logged out.')
      return NextResponse.json(
        { message: 'User is logged out', isActive: false, username: 'Guest' },
        { status: 200 }
      )
    }

    const connection = await connectToDatabase()
    if (!connection.success)
      return NextResponse.json({ message: connection.message }, { status: 500 })

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET)
    if (
      typeof decoded !== 'object' ||
      decoded === null ||
      !('userId' in decoded)
    ) {
      return NextResponse.json(
        { message: 'Invalid refreshToken or no ID connected to it' },
        { status: 401 }
      )
    }

    const userStatus = await User.findById(decoded.userId).select(
      'isActive username'
    )
    if (!userStatus) {
      console.error(`User with ID ${decoded.userId} not found.`)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: 'User is logged in',
        data: { isActive: userStatus.isActive, username: userStatus.username },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Could not check status of user', error)
    return NextResponse.json(
      { message: 'Failed to check status of potentially logged-in user' },
      { status: 500 }
    )
  }
}
