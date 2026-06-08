import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DEFAULT_ABOUT = {
  name: "Zihad Hasan",
  title: "AI Engineer",
  bio: "Hi, I'm a passionate Software Engineering student & AI enthusiast",
  description: "With a strong foundation in programming and data-driven technologies, I am dedicated to building intelligent and impactful solutions. My journey in tech started with curiosity about how systems work and has evolved into a passion for software development, data analysis, and machine learning.",
  profilePic: "/Vipimages/image.png",
  bannerPic: "https://i.ibb.co.com/HTXF1bbB/Whats-App-Image-2026-03-03-at-18-22-30.jpg",
  bannerSubtitle: "AI Engineer and Rechercher",
  location: "Based in Bangladesh",
  stats: [
    { value: "6+", label: "Leadership & Volunteer Roles" },
    { value: "5+", label: "Professional Certifications" },
    { value: "8+", label: "Technologies & Libraries" },
    { value: "5+", label: "Years of Tech Experience" }
  ]
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('about');

    const aboutData = await collection.findOne({ _id: 'about_me' as any });

    if (!aboutData) {
      return NextResponse.json({ about: DEFAULT_ABOUT }, { status: 200 });
    }

    return NextResponse.json({ about: aboutData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json({ about: DEFAULT_ABOUT }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, bio, description, profilePic, bannerPic, bannerSubtitle, location, stats } = body;

    if (!name || !title || !bio) {
      return NextResponse.json(
        { error: 'Name, title, and bio are required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('about');

    const updatedData = {
      name,
      title,
      bio,
      description: description || '',
      profilePic: profilePic || DEFAULT_ABOUT.profilePic,
      bannerPic: bannerPic || DEFAULT_ABOUT.bannerPic,
      bannerSubtitle: bannerSubtitle || DEFAULT_ABOUT.bannerSubtitle,
      location: location || DEFAULT_ABOUT.location,
      stats: stats || DEFAULT_ABOUT.stats,
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { _id: 'about_me' as any },
      { $set: updatedData },
      { upsert: true }
    );

    return NextResponse.json(
      { message: 'About page data updated successfully', about: updatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json(
      { error: 'Failed to update about data' },
      { status: 500 }
    );
  }
}
