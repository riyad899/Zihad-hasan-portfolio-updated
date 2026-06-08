import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('resume');
    
    const resumeData = await collection.findOne({ _id: 'resume_file' as any });
    
    if (resumeData && resumeData.url) {
      return NextResponse.redirect(resumeData.url);
    }
    
    // Fallback to local public file
    const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/';
    return NextResponse.redirect(new URL('/Zihad_hasan_Resume.pdf', siteUrl).toString());
  } catch (error) {
    console.error('Error fetching resume:', error);
    const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/';
    return NextResponse.redirect(new URL('/Zihad_hasan_Resume.pdf', siteUrl).toString());
  }
}

export async function POST(request: NextRequest) {
  try {
    let secureUrl = '';
    let filename = 'Zihad_Hasan_CV.pdf';
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      
      if (!file) {
        return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
      }
      
      filename = file.name;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Upload using stream to handle raw file buffer
      const uploadPromise = new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'portfolio',
            public_id: 'Zihad_Hasan_CV',
            overwrite: true,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
      
      const uploadResult = await uploadPromise;
      secureUrl = uploadResult.secure_url;
    } else {
      // JSON body (base64 string)
      const body = await request.json();
      const { pdfBase64, name } = body;
      
      if (!pdfBase64) {
        return NextResponse.json({ error: 'No pdfBase64 data provided' }, { status: 400 });
      }
      
      if (name) {
        filename = name;
      }
      
      const uploadResult = await cloudinary.uploader.upload(pdfBase64, {
        resource_type: 'raw',
        folder: 'portfolio',
        public_id: 'Zihad_Hasan_CV',
        overwrite: true,
      });
      
      secureUrl = uploadResult.secure_url;
    }
    
    const client = await clientPromise;
    const db = client.db('blogDb');
    const collection = db.collection('resume');
    
    const updatedResume = {
      url: secureUrl,
      filename,
      updatedAt: new Date(),
    };
    
    await collection.updateOne(
      { _id: 'resume_file' as any },
      { $set: updatedResume },
      { upsert: true }
    );
    
    return NextResponse.json({
      message: 'Resume uploaded successfully to Cloudinary and saved to database',
      url: secureUrl
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error uploading resume:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload resume' }, { status: 500 });
  }
}
