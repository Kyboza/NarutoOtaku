import { connectToDatabase } from '@/app/lib/mongodb'
import Forum from '@/app/models/Forum'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const connection = await connectToDatabase()
    if (!connection.success) {
      console.error('Could not connect to Database')
      return NextResponse.json({ message: connection.message }, { status: 500 })
    }
    const forum = await Forum.find()
    if (forum.length === 0) {
      console.error('Collection is empty')
      return NextResponse.json(
        { message: 'No forum data found' },
        { status: 404 }
      )
    }
    return NextResponse.json(forum, { status: 200 })
  } catch (error) {
    console.error('Could not get Forum data', error)
    return NextResponse.json(
      { message: 'Could not get data from DB' },
      { status: 500 }
    )
  }
}
