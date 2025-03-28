import { NextRequest, NextResponse } from "next/server"
import Order from "@/app/models/Order"
import { connectToDatabase } from "@/app/lib/mongodb"

export async function PUT(req: NextRequest) {
    try {
        // Extract the 'id' from the URL path
        const urlSegments = req.nextUrl.pathname.split("/")
        const id = urlSegments[urlSegments.length - 1] // Assuming 'id' is the last segment

        const connection = await connectToDatabase()
        if (!connection.success)
            return NextResponse.json(
                { message: connection.message },
                { status: 500 },
            )

        // Parse the request body
        const body = await req.json()
        const { status } = body

        if (!id || !status) {
            return NextResponse.json(
                { message: "Did not get an orderId or status" },
                { status: 400 },
            )
        }

        // Find and update the order
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true },
        )

        if (!updatedOrder) {
            return NextResponse.json(
                { message: "Order not found" },
                { status: 404 },
            )
        }

        // Return the updated order
        return NextResponse.json(updatedOrder, { status: 200 })
    } catch (error) {
        console.error("Error updating order:", error)
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 },
        )
    }
}
