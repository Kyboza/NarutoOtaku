import { connectToDatabase } from "@/app/lib/mongodb"
import Item from "@/app/models/Item"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { itemSeparation } = await req.json()
        if (!itemSeparation)
            return NextResponse.json(
                { message: "Did not recieve cart items" },
                { status: 404 },
            )

        if (!Array.isArray(itemSeparation))
            return NextResponse.json(
                { message: "Cart items is not an array" },
                { status: 404 },
            )

        const connection = await connectToDatabase()
        if (!connection.success)
            return NextResponse.json(
                { message: connection.message },
                { status: 500 },
            )

        for (const item of itemSeparation) {
            const dbItem = await Item.findById(item.itemId)
            if (!dbItem)
                return NextResponse.json(
                    {
                        message: `Item with id ${item.itemId} does not exist in database`,
                    },
                    { status: 404 },
                )

            if (item.price !== dbItem.price)
                return NextResponse.json(
                    { message: "Incorrect price of item recieved from client" },
                    { status: 400 },
                )
            if (item.amount > dbItem.storage || item.amount > 8)
                return NextResponse.json(
                    {
                        message:
                            "Cannot order more items than what exists in warehouse",
                    },
                    { status: 400 },
                )
            const expectedTotal = dbItem.price * item.amount
            if (expectedTotal !== item.price * item.amount)
                return NextResponse.json(
                    { message: "Total price manipulation detected" },
                    { status: 400 },
                )
        }
        return NextResponse.json(
            { message: "Comparison succedeed, everything is in order" },
            { status: 200 },
        )
    } catch (error) {
        console.error("Could not compare to database", error)
        return NextResponse.json(
            { message: "Failed to compare cart to database storage" },
            { status: 500 },
        )
    }
}
