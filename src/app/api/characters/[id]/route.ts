import mongoose from 'mongoose';
import { connectToDatabase } from '@/app/lib/mongodb'; // Assuming this is your DB connection helper
import Character from '@/app/models/Character'; // Assuming you have a Character model
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  let { id } = await params;

  // Log ID to verify it's a string
  console.log('Received ID:', id);

  // Ensure the ID is a single string, not an array
  if (Array.isArray(id)) {
    id = id[0]; // If it's an array, get the first element
  }

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ message: 'Invalid ID format' }), { status: 400 });
  }

  // Convert to ObjectId
  const objectId = new mongoose.Types.ObjectId(id);

  // Connect to DB
  await connectToDatabase();

  try {
    const character = await Character.findById(objectId);  // Query the DB with ObjectId
    if (!character) {
      console.log('Character not found with ID:', id);  // Log to debug
      return new NextResponse(JSON.stringify({ message: 'No character found' }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(character), { status: 200 });
  } catch (error) {
    console.error('Error fetching character:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

  
