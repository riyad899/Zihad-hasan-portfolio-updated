import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('gallery');

    const photos = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ photos }, { status: 200 });
  } catch (error) {
    console.error('Error fetching gallery photos:', error);
    return NextResponse.json({ photos: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, caption } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'imageUrl is a required field' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('gallery');

    const photo = {
      imageUrl,
      caption: caption || '',
      createdAt: new Date(),
    };

    const result = await collection.insertOne(photo);

    return NextResponse.json(
      { message: 'Photo added successfully', id: result.insertedId, photo },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding gallery photo:', error);
    return NextResponse.json(
      { error: 'Failed to add gallery photo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID is required for deletion' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('gallery');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Photo deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting gallery photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery photo' },
      { status: 500 }
    );
  }
}
