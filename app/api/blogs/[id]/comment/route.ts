import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// POST - Add a comment to a blog
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, comment } = body;

    // Validate required fields
    if (!name || !comment) {
      return NextResponse.json(
        { error: 'Name and comment are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('blog');

    const newComment = {
      _id: new ObjectId().toString(),
      name: name.trim(),
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    // Add comment to the blog's comments array
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $push: { comments: newComment } as any },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Comment added successfully', comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}
