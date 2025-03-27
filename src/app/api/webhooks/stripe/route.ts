import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import axiosAPI from '@/app/lib/axios'
import { AxiosError } from 'axios'

export async function POST(req: NextRequest) {
  const STRIPE_SECRET = process.env.STRIPE_SECRET!.trim()
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!STRIPE_SECRET || !STRIPE_WEBHOOK_SECRET)
    throw new Error('Could not get secret stripe key')

  const stripe = new Stripe(STRIPE_SECRET)
  const webhookSecret = STRIPE_WEBHOOK_SECRET

  const sig = req.headers.get('stripe-signature')
  if (!sig)
    return NextResponse.json(
      { message: 'Sig did not have a value' },
      { status: 400 }
    )

  let event

  try {
    const rawBody = await req.text()
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (error) {
    handleError(error)
    return NextResponse.json({ message: 'Webhook error' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      const orderId = session.metadata?.orderId

      if (!orderId) {
        console.error('Order ID missing in session metadata')
        return NextResponse.json({ error: 'Missing order ID' }, { status: 400 })
      }
      console.log('Updating order:', orderId)
      console.log('Payload:', { status: 'paid' })

      try {
        const status = 'paid'
        const response = await axiosAPI.put(`/api/orders/${orderId}`, {
          status,
        })
        console.log('Order update response:', response.data)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(
            'Error updating order:',
            error.response?.data || error.message
          )
        } else {
          console.error('Unexpected error:', error)
        }
      }

      console.log('Order updated to paid:', orderId)
      break

    case 'checkout.session.async_payment_succeeded':
      console.log('Payment Succeded', event.data.object)
      break
    case 'checkout.session.expired':
      console.log('Payment failed and expired', event.data.object)
      break
    case 'checkout.session.async_payment_failed':
      console.log('Payment Failed', event.data.object)
      break
    default:
      console.log(`unhandled Event Type ${event.type}`)
  }
  return NextResponse.json({ recieved: true })
}
