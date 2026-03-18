import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, date, readTime, excerpt, image, tags, content } = body;

    // Validate required fields
    if (!title || !category || !excerpt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('blog');

    const blogPost = {
      title,
      category,
      date: date || new Date().toISOString().split('T')[0],
      readTime: readTime || '5 min read',
      excerpt,
      image: image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      tags: tags || [],
      content: content || excerpt,
      link: '#',
      likes: 0,
      comments: [],
      createdAt: new Date(),
    };

    const result = await collection.insertOne(blogPost);

    return NextResponse.json(
      { message: 'Blog post created successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('blog');

    const blogs = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // Return empty array as fallback when MongoDB is not available
    return NextResponse.json({ blogs: [] }, { status: 200 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('blog');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
