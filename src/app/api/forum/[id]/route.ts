import { connectToDatabase } from '@/app/lib/mongodb'
import SpecificForum from '@/app/models/SpecificForum'
import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET(req: NextRequest) {
  try {
    // Extract the 'id' from the URL path
    const urlSegments = req.nextUrl.pathname.split('/');
    const id = urlSegments[urlSegments.length - 1]; // Assuming the 'id' is the last segment

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`${id} is not a valid ObjectId`)
      return NextResponse.json(
        { message: 'Not a valid ObjectId' },
        { status: 400 }
      )
    }

    const CategoryId = new mongoose.Types.ObjectId(id);

    const connection = await connectToDatabase();
    if (!connection.success) {
      return NextResponse.json({ message: connection.message }, { status: 500 });
    }

    const responseForumPosts = await SpecificForum.find({
      categoryId: CategoryId,
    });

    if (responseForumPosts.length === 0) {
      console.log(`No posts found for: ${CategoryId}`);
      return NextResponse.json({ message: 'No posts found' }, { status: 400 });
    }

    return NextResponse.json(responseForumPosts, { status: 200 });
  } catch (error) {
    console.error('Error receiving the data:', error);
    return NextResponse.json(
      { message: 'An error occurred while getting the data' },
      { status: 500 }
    );
  }
}
