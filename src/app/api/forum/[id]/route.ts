import { connectToDatabase } from "@/app/lib/mongodb";
import SpecificForum from "@/app/models/SpecificForum";  // Just SpecificForum behövs nu, inte Category
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;  // Vi får id från URL:en

    // Kolla om id är ett giltigt ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(`${id} är inte ett giltigt ObjectId`);
        return NextResponse.json({ message: "Inte ett giltigt ObjectId" }, { status: 400 });
    }

    // Konvertera id till ObjectId
    const categoryId = new mongoose.Types.ObjectId(id);
    console.log("categoryId:", categoryId);

    // Anslut till databasen
    const connection = await connectToDatabase();
    if (!connection.success) {
        console.error("Kunde inte ansluta till databasen");
        return NextResponse.json({ message: connection.message }, { status: 500 });
    }

    try {
        // Hämta forumposter baserat på categoryId
        const responseForumPosts = await SpecificForum.find({ categoryId: categoryId });
        
        // Kontrollera om några poster hittades
        if (responseForumPosts.length === 0) {
            console.log(`Ingen post hittades för categoryId: ${categoryId}`);
            return NextResponse.json({ message: "Ingen post hittades" }, { status: 400 });
        }

        // Returnera resultatet om det finns poster
        return NextResponse.json((responseForumPosts), { status: 200 });

    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
        return NextResponse.json({ message: "Ett fel inträffade vid hämtning av data" }, { status: 500 });
    }
}
