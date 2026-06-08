import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { Skiper30 } from '@/components/Gallery';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Blogs from '@/components/Blogs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let aboutData = null;
  let resumeData = null;
  let skillsData: any[] = [];
  let certificatesData: any[] = [];
  let galleryData: any[] = [];

  try {
    const client = await clientPromise;
    const db = client.db('blogDb');

    // Fetch About section data
    aboutData = await db.collection('about').findOne({ _id: 'about_me' as any });

    // Fetch Resume
    resumeData = await db.collection('resume').findOne({ _id: 'resume_file' as any });

    // Fetch Skills
    skillsData = await db.collection('skills').find({}).toArray();

    // Fetch Certificates
    certificatesData = await db.collection('certificates').find({}).sort({ issueDate: -1 }).toArray();

    // Fetch Gallery photos
    galleryData = await db.collection('gallery').find({}).sort({ createdAt: -1 }).toArray();
  } catch (err) {
    console.error("Failed to fetch server-side portfolio data from MongoDB:", err);
  }

  // Serialize Document objects (like ObjectId) to raw JSON to avoid Next.js serialization warnings
  const serialize = (doc: any) => {
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
  };

  const serializedAbout = serialize(aboutData);
  const serializedResume = serialize(resumeData);
  const serializedSkills = serialize(skillsData) || [];
  const serializedCertificates = serialize(certificatesData) || [];
  const serializedGallery = serialize(galleryData) || [];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero about={serializedAbout} />
      <Skiper30 gallery={serializedGallery} />
      <About about={serializedAbout} />
      <Achievements certificates={serializedCertificates} />
      <Skills skills={serializedSkills} />
      <Experience />
      <Blogs />
      <Contact />
      <Footer />
    </div>
  );
}
