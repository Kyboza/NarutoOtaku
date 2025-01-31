import { connectToDatabase } from '../../lib/mongodb';
import Character from '../../models/Character'; // Correct model for characters
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase(); // Make sure the connection is successful.
  try {
    const characters = await Character.find(); // Use Character model to fetch characters
    if (characters.length === 0) {
        console.log('No characters found in the database.');
    }
    return new NextResponse(JSON.stringify(characters), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch characters:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch characters' }), { status: 500 });
  }
}
