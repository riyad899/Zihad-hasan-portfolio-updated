import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// POST - Increment likes for a blog
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('blog');

    // Increment likes by 1
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 } },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Liked successfully', likes: result.likes || 0 },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error liking blog:', error);
    return NextResponse.json(
      { error: 'Failed to like blog' },
      { status: 500 }
    );
  }
}
