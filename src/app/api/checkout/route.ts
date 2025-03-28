import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { baseURL } from '@/app/lib/axios'

export async function POST(req: NextRequest) {
  try {
    const { itemSeparation, orderId } = await req.json()
    if (!itemSeparation || !orderId)
      return NextResponse.json(
        { message: 'Missing data from client to complete purchase' },
        { status: 400 }
      )

    const STRIPE_SECRET = process.env.STRIPE_SECRET!.trim()
    if (!STRIPE_SECRET)
      throw new Error('Could not find validate with stripe key')


    const stripe = new Stripe(STRIPE_SECRET, {
      apiVersion: '2025-02-24.acacia',
    })

    if (!Array.isArray(itemSeparation))
      return NextResponse.json(
        { message: 'Items is not a valid array' },
        { status: 404 }
      )

    const lineItems = itemSeparation.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.amount,
    }))

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card', 'paypal'],
      success_url: `${baseURL}/order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseURL}/`,
      metadata: { orderId },
    })
    if (session.url) {
      return NextResponse.json({ url: session.url })
    } else throw new Error('Could not redirect user to checkout')
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to checkout' }, { status: 500 })
  }
}
