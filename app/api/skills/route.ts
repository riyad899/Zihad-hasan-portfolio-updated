import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('skills');

    const skills = await collection.find({}).toArray();

    return NextResponse.json({ skills }, { status: 200 });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ skills: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, iconName, color } = body;

    if (!name || !category || !iconName || !color) {
      return NextResponse.json(
        { error: 'Name, category, iconName, and color are required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('skills');

    const skill = {
      name,
      category,
      iconName,
      color,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(skill);

    return NextResponse.json(
      { message: 'Skill created successfully', id: result.insertedId, skill },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Skill ID is required for updates' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, category, iconName, color } = body;

    if (!name || !category || !iconName || !color) {
      return NextResponse.json(
        { error: 'Name, category, iconName, and color are required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('skills');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          category,
          iconName,
          color,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Skill updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
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
        { error: 'Skill ID is required for deletion' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('skills');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Skill deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}
