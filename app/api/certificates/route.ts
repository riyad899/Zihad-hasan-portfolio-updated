import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('certificates');

    const certificates = await collection
      .find({})
      .sort({ issueDate: -1 })
      .toArray();

    return NextResponse.json({ certificates }, { status: 200 });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json({ certificates: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      certificateId,
      title,
      issuedBy,
      issueDate,
      skills,
      certificateURL,
      credentialID,
      bg,
      image,
    } = body;

    if (!title || !issuedBy || !issueDate) {
      return NextResponse.json(
        { error: 'Title, issuedBy, and issueDate are required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('certificates');

    const certificate = {
      certificateId: certificateId || `CERT-${Date.now()}`,
      title,
      issuedBy,
      issueDate,
      skills: Array.isArray(skills) ? skills : [],
      certificateURL: certificateURL || '#',
      credentialID: credentialID || '',
      bg: bg || '#000000',
      image: image || '',
      createdAt: new Date(),
    };

    const result = await collection.insertOne(certificate);

    return NextResponse.json(
      { message: 'Certificate created successfully', id: result.insertedId, certificate },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json(
      { error: 'Failed to create certificate' },
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
        { error: 'Certificate ID is required for updates' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      certificateId,
      title,
      issuedBy,
      issueDate,
      skills,
      certificateURL,
      credentialID,
      bg,
      image,
    } = body;

    if (!title || !issuedBy || !issueDate) {
      return NextResponse.json(
        { error: 'Title, issuedBy, and issueDate are required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('certificates');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          certificateId: certificateId || `CERT-${id.substring(0, 8)}`,
          title,
          issuedBy,
          issueDate,
          skills: Array.isArray(skills) ? skills : [],
          certificateURL: certificateURL || '#',
          credentialID: credentialID || '',
          bg: bg || '#000000',
          image: image || '',
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Certificate updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating certificate:', error);
    return NextResponse.json(
      { error: 'Failed to update certificate' },
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
        { error: 'Certificate ID is required for deletion' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('certificates');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Certificate deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json(
      { error: 'Failed to delete certificate' },
      { status: 500 }
    );
  }
}
