import { ObjectId } from 'mongodb';

export interface AboutDoc {
  _id?: string | ObjectId;
  name: string;
  title: string;
  bio: string;
  description: string;
  profilePic: string;
  bannerPic: string;
  bannerSubtitle: string;
  location: string;
  stats: { value: string; label: string }[];
  updatedAt: Date;
}

export interface ResumeDoc {
  _id?: string | ObjectId;
  url: string;
  filename: string;
  updatedAt: Date;
}

export interface SkillDoc {
  _id?: string | ObjectId;
  name: string;
  category: string;
  iconName: string;
  color: string;
  createdAt: Date;
}

export interface CertificateDoc {
  _id?: string | ObjectId;
  certificateId: string;
  title: string;
  issuedBy: string;
  issueDate: string;
  skills: string[];
  certificateURL: string;
  credentialID: string;
  bg: string;
  image: string;
  createdAt: Date;
}

export interface GalleryDoc {
  _id?: string | ObjectId;
  imageUrl: string;
  caption?: string;
  createdAt: Date;
}
