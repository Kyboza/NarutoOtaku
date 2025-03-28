import { connectToDatabase } from '@/app/lib/mongodb'
import Order from '@/app/models/Order'
import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const ACCESS_SECRET = process.env.ACCESS_SECRET!.trim()
    if (!ACCESS_SECRET) {
      return NextResponse.json(
        { message: 'Server configuration error: Missing access secret' },
        { status: 500 }
      )
    }

    const { items, shipping } = await req.json()
    if (!items || !shipping) {
      return NextResponse.json(
        { message: 'Missing order details' },
        { status: 400 }
      )
    }
    if (!Array.isArray(items)) {
      return NextResponse.json(
        { message: 'Invalid format: Items must be an array' },
        { status: 400 }
      )
    }

    const connection = await connectToDatabase()
    if (!connection.success) {
      return NextResponse.json({ message: connection.message }, { status: 500 })
    }

    const storedCookie = await cookies()
    const accessToken = (await storedCookie).get('accessToken')?.value

    let userId = null
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, ACCESS_SECRET)
        if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
          userId = decoded.userId
        } else {
          return NextResponse.json(
            { message: 'Invalid access token' },
            { status: 401 }
          )
        }
      } catch (error) {
        console.error('JWT verification failed:', error)
        return NextResponse.json(
          { message: 'Invalid or expired token' },
          { status: 401 }
        )
      }
    }

    try {
      const formattedShipping = {
        firstname: shipping.shippingFirstName,
        lastname: shipping.shippingLastName,
        email: shipping.shippingEmail,
        street: shipping.shippingAddressOne,
        additional: shipping.shippingAddressAdditional || null, // Optional field
        city: shipping.shippingCity,
        state: shipping.shippingState,
        zip: shipping.shippingZIP,
      }

      const newOrder = new Order({
        items: items,
        shipping: formattedShipping,
        userId: userId ?? null, // If no user, store as null
        status: 'pending',
      })

      await newOrder.save()

      return NextResponse.json(
        { id: newOrder._id.toString(), message: 'Order created and pending' },
        { status: 200 }
      )
    } catch (error) {
      console.error('Database save error:', error)
      return NextResponse.json(
        { message: 'Could not save order to database' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
