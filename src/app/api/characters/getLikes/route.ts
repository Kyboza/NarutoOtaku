import { connectToDatabase } from '@/app/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import Character from '@/app/models/Character'

export async function POST(req: NextRequest) {
  try {
    const { characterName } = await req.json()
    if (!characterName)
      return NextResponse.json(
        { message: 'Did not recieve a character name to get likes and likers' },
        { status: 500 }
      )

    const connection = await connectToDatabase()
    if (!connection.success)
      return NextResponse.json({ message: connection.message }, { status: 500 })

    const character = await Character.findOne({ name: characterName }).select(
      'likes likers'
    )
    if (!character)
      return NextResponse.json(
        { message: 'Could not find character with that name' },
        { status: 404 }
      )

    const likes = character.likes
    const userWhoLike = character.userWhoLike
    const data = { likes, userWhoLike }

    return NextResponse.json(
      { message: 'Succesfully got likes and likers', data },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: 'Something went wrong getting likes and likers for character',
      },
      { status: 500 }
    )
  }
}
