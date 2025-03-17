import { NextResponse } from "next/server";
import Order from "@/app/models/Order"; // Ensure you import your Order model
import { connectToDatabase } from "@/app/lib/mongodb"; // Ensure you connect to DB

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Ensure database connection
        const connection = await connectToDatabase();
        if(!connection.success) return NextResponse.json({message: connection.message}, {status: 500})

        const { id } = params; // Get order ID from URL params
        const body = await req.json(); // Read body ONCE
        console.log("Received request body:", body);

        const { status } = body;

        if (!id || !status) {
            return NextResponse.json({ message: "Did not get an orderId or status" }, { status: 400 });
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: "Server error", error}, { status: 500 });
    }
}
