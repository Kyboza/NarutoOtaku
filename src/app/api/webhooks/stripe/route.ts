import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import axiosAPI from "@/app/lib/axios"

export async function POST(req: NextRequest) {
    const STRIPE_SECRET = process.env.STRIPE_SECRET?.trim()
    const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET?.trim()

    if (!STRIPE_SECRET || !STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json(
            { error: "Missing Stripe secrets" },
            { status: 500 },
        )
    }

    const stripe = new Stripe(STRIPE_SECRET)
    const webhookSecret = STRIPE_WEBHOOK_SECRET

    const sig = req.headers.get("stripe-signature")
    if (!sig) {
        return NextResponse.json(
            { error: "Missing stripe-signature" },
            { status: 400 },
        )
    }

    let event

    try {
        const rawBody = await req.text()
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
    } catch (error) {
        console.error("Webhook signature verification failed:", error)
        return NextResponse.json({ error: "Webhook error" }, { status: 400 })
    }

    try {
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object
                const orderId = session.metadata?.orderId

                if (!orderId) {
                    console.error("Order ID missing in session metadata")
                    return NextResponse.json(
                        { error: "Missing order ID" },
                        { status: 400 },
                    )
                }

                try {
                    await axiosAPI.put(`/api/orders/${orderId}`, {
                        status: "paid",
                    })
                } catch (error) {
                    console.error("Error updating order:", error)
                    return NextResponse.json(
                        { error: "Failed to update order" },
                        { status: 500 },
                    )
                }
                break

            case "payment_intent.created":
                console.log("Payment Intent Created", event.data.object)
                break

            case "payment_intent.succeeded":
                const paymentIntent = event.data.object
                console.log("Payment Intent Succeeded", paymentIntent)
                break

            case "charge.succeeded":
                const charge = event.data.object
                console.log("Charge Succeeded", charge)
                break

            case "charge.updated":
                const updatedCharge = event.data.object
                console.log("Charge Updated", updatedCharge)
                break

            case "checkout.session.async_payment_succeeded":
                console.log("Async payment succeeded")
                break

            case "checkout.session.async_payment_failed":
                console.error("Payment failed")
                break

            case "checkout.session.expired":
                console.log("Session expired")
                break

            case "payment_intent.canceled":
                console.log("Payment Intent Canceled")
                break

            default:
                console.error("Unhandled event type", event.type)
        }

        return NextResponse.json({ received: true }, { status: 200 })
    } catch (error) {
        console.error("Unexpected error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        )
    }
}
