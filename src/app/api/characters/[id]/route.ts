import mongoose from 'mongoose';
import { connectToDatabase } from '@/app/lib/mongodb'; // Assuming this is your DB connection helper
import Character from '@/app/models/Character'; // Assuming you have a Character model
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
  }

  // Connect to DB
  await connectToDatabase();

  try {
    const character = await Character.findById(id);  // Query the DB with ObjectId
    if (!character) {
      return NextResponse.json({ message: 'No character found' }, { status: 404 });
    }
    return NextResponse.json((character), { status: 200 });
  } catch (error) {
    console.error('Error fetching character:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

  
