"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
}

interface Skill {
  _id: string;
  name: string;
  category: string;
  iconName: string;
  color: string;
}

interface Certificate {
  _id: string;
  certificateId: string;
  title: string;
  issuedBy: string;
  issueDate: string;
  skills: string[];
  certificateURL: string;
  credentialID: string;
  bg: string;
  image: string;
}

interface GalleryPhoto {
  _id: string;
  imageUrl: string;
  caption?: string;
}

const iconOptions = [
  { value: "SiC", label: "C (Simple Icons)" },
  { value: "SiCplusplus", label: "C++ (Simple Icons)" },
  { value: "FaJava", label: "Java (Font Awesome)" },
  { value: "SiJavascript", label: "JavaScript (Simple Icons)" },
  { value: "SiPhp", label: "PHP (Simple Icons)" },
  { value: "FaDatabase", label: "SQL / Database (Font Awesome)" },
  { value: "SiPython", label: "Python (Simple Icons)" },
  { value: "SiHtml5", label: "HTML5 (Simple Icons)" },
  { value: "SiCss", label: "CSS3 (Simple Icons)" },
  { value: "SiNumpy", label: "NumPy (Simple Icons)" },
  { value: "SiPandas", label: "Pandas (Simple Icons)" },
  { value: "SiScikitlearn", label: "Scikit-Learn (Simple Icons)" },
  { value: "BsBarChartFill", label: "Seaborn / Bar Chart (Bootstrap Icons)" },
  { value: "MdShowChart", label: "Matplotlib / Line Chart (Material Design)" },
  { value: "SiPytorch", label: "PyTorch (Simple Icons)" },
  { value: "SiTensorflow", label: "TensorFlow (Simple Icons)" },
  { value: "MdPhotoLibrary", label: "Photoshop / Photo Library (Material Design)" },
  { value: "MdBrush", label: "Illustrator / Brush (Material Design)" },
  { value: "SiCanva", label: "Canva (Simple Icons)" },
  { value: "MdVideoLibrary", label: "DaVinci Resolve / Video Library (Material Design)" },
  { value: "SiGnubash", label: "Shell / Bash (Simple Icons)" },
  { value: "TbChartHistogram", label: "Power BI / Histogram (Tabler Icons)" },
  { value: "SiAnaconda", label: "Anaconda (Simple Icons)" },
  { value: "SiArduino", label: "Arduino (Simple Icons)" },
  { value: "FaNetworkWired", label: "Cisco Packet Tracer / Network (Font Awesome)" },
];

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("blogs");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Existing Blogs state & form
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Blog",
    date: new Date().toISOString().split('T')[0],
    readTime: "5 min read",
    excerpt: "",
    image: "",
    tags: "",
    content: "",
  });

  // About Me State
  const [aboutData, setAboutData] = useState({
    name: "Zihad Hasan",
    title: "AI Engineer",
    bio: "Hi, I'm a passionate Software Engineering student & AI enthusiast",
    description: "",
    profilePic: "",
    bannerPic: "",
    bannerSubtitle: "AI Engineer and Rechercher",
    location: "Based in Bangladesh",
    stats: [
      { value: "6+", label: "Leadership & Volunteer Roles" },
      { value: "5+", label: "Professional Certifications" },
      { value: "8+", label: "Technologies & Libraries" },
      { value: "5+", label: "Years of Tech Experience" }
    ]
  });

  // Resume State
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeUpdated, setResumeUpdated] = useState("");
  const [uploadingResume, setUploadingResume] = useState(false);

  // Skills State
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "Programming Languages",
    iconName: "SiPython",
    color: "#3776AB"
  });

  // Certificates State
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState({
    certificateId: "",
    title: "",
    issuedBy: "",
    issueDate: new Date().toISOString().split('T')[0],
    skills: "",
    certificateURL: "",
    credentialID: "",
    bg: "#000000",
    image: ""
  });

  // Gallery State
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [galleryForm, setGalleryForm] = useState({
    imageUrl: "",
    caption: ""
  });
  const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (auth !== "true") {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, [router]);

  const fetchAllData = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    try {
      // 1. Fetch Blogs
      const blogsRes = await fetch(`${apiUrl}/api/blogs`);
      const blogsData = await blogsRes.json();
      setBlogs(blogsData.blogs || []);

      // 2. Fetch About
      const aboutRes = await fetch(`${apiUrl}/api/about`);
      const aboutJson = await aboutRes.json();
      if (aboutJson.about) {
        setAboutData(aboutJson.about);
      }

      // 3. Fetch Skills
      const skillsRes = await fetch(`${apiUrl}/api/skills`);
      const skillsJson = await skillsRes.json();
      setSkills(skillsJson.skills || []);

      // 4. Fetch Certificates
      const certsRes = await fetch(`${apiUrl}/api/certificates`);
      const certsJson = await certsRes.json();
      setCertificates(certsJson.certificates || []);

      // 5. Fetch Gallery
      const galleryRes = await fetch(`${apiUrl}/api/gallery`);
      const galleryJson = await galleryRes.json();
      setGallery(galleryJson.photos || []);

      // 6. Fetch Resume URL / Info (we can check the API endpoint redirect or a metadata fetch)
      // Since it's a redirect, we can check DB directly or just let the download show.
      // We will check database metadata if available or just hit GET (it directs to Cloudinary).
      // We can also find it if we create a direct query, but since about pages show it, we will just display a status.
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/");
  };

  // Reusable Image Upload using ImgBB
  const uploadImageToImgbb = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    }
    throw new Error(data.error?.message || 'Failed to upload image');
  };

  // Handler for uploading files (Profile/Banner/Certificates/Gallery)
  const handleGenericImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "blog" | "profile" | "banner" | "certificate" | "gallery"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);
    setError('');
    setSuccess('');

    try {
      const url = await uploadImageToImgbb(file);

      if (type === "blog") {
        setFormData(prev => ({ ...prev, image: url }));
      } else if (type === "profile") {
        setAboutData(prev => ({ ...prev, profilePic: url }));
      } else if (type === "banner") {
        setAboutData(prev => ({ ...prev, bannerPic: url }));
      } else if (type === "certificate") {
        setCertForm(prev => ({ ...prev, image: url }));
      } else if (type === "gallery") {
        setGalleryForm(prev => ({ ...prev, imageUrl: url }));
      }

      setSuccess('Image uploaded to ImgBB successfully!');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Blog creation submit
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tags: tagsArray }),
      });

      if (response.ok) {
        setSuccess("Blog post created successfully!");
        setFormData({
          title: "",
          category: "Blog",
          date: new Date().toISOString().split('T')[0],
          readTime: "5 min read",
          excerpt: "",
          image: "",
          tags: "",
          content: "",
        });
        fetchAllData();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create blog post");
      }
    } catch (err) {
      setError("An error occurred while creating the blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleBlogDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/blogs?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        setSuccess("Blog deleted successfully!");
        fetchAllData();
      } else {
        setError("Failed to delete blog");
      }
    } catch (err) {
      setError("An error occurred while deleting the blog");
    }
  };

  // About update submit
  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/about`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutData),
      });

      if (response.ok) {
        setSuccess("About section updated successfully!");
        fetchAllData();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update About details");
      }
    } catch (err) {
      setError("An error occurred while updating About details");
    } finally {
      setLoading(false);
    }
  };

  const handleAboutStatChange = (index: number, field: "value" | "label", val: string) => {
    const updatedStats = [...aboutData.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: val };
    setAboutData(prev => ({ ...prev, stats: updatedStats }));
  };

  // Resume Upload to Cloudinary & DB
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return;
    }

    setUploadingResume(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/resume`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResumeUrl(data.url);
        setSuccess('Resume uploaded to Cloudinary successfully!');
        setResumeUpdated(new Date().toLocaleDateString());
      } else {
        setError(data.error || 'Failed to upload resume');
      }
    } catch (err: any) {
      console.error('Error uploading resume:', err);
      setError('Error uploading resume');
    } finally {
      setUploadingResume(false);
    }
  };

  // Skill Submit
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const method = editingSkillId ? "PUT" : "POST";
      const url = editingSkillId ? `${apiUrl}/api/skills?id=${editingSkillId}` : `${apiUrl}/api/skills`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillForm),
      });

      if (response.ok) {
        setSuccess(editingSkillId ? "Skill updated successfully!" : "Skill created successfully!");
        setSkillForm({
          name: "",
          category: "Programming Languages",
          iconName: "SiPython",
          color: "#3776AB"
        });
        setEditingSkillId(null);
        fetchAllData();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save skill");
      }
    } catch (err) {
      setError("An error occurred while saving the skill");
    } finally {
      setLoading(false);
    }
  };

  const handleSkillEditClick = (skill: Skill) => {
    setSkillForm({
      name: skill.name,
      category: skill.category,
      iconName: skill.iconName,
      color: skill.color
    });
    setEditingSkillId(skill._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSkillDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/skills?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        setSuccess("Skill deleted successfully!");
        fetchAllData();
      } else {
        setError("Failed to delete skill");
      }
    } catch (err) {
      setError("An error occurred while deleting the skill");
    }
  };

  // Certificate Submit
  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const tagsArray = certForm.skills.split(",").map(tag => tag.trim()).filter(tag => tag);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const method = editingCertId ? "PUT" : "POST";
      const url = editingCertId ? `${apiUrl}/api/certificates?id=${editingCertId}` : `${apiUrl}/api/certificates`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...certForm, skills: tagsArray }),
      });

      if (response.ok) {
        setSuccess(editingCertId ? "Certificate updated successfully!" : "Certificate created successfully!");
        setCertForm({
          certificateId: "",
          title: "",
          issuedBy: "",
          issueDate: new Date().toISOString().split('T')[0],
          skills: "",
          certificateURL: "",
          credentialID: "",
          bg: "#000000",
          image: ""
        });
        setEditingCertId(null);
        fetchAllData();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save certificate");
      }
    } catch (err) {
      setError("An error occurred while saving the certificate");
    } finally {
      setLoading(false);
    }
  };

  const handleCertEditClick = (cert: Certificate) => {
    setCertForm({
      certificateId: cert.certificateId,
      title: cert.title,
      issuedBy: cert.issuedBy,
      issueDate: cert.issueDate,
      skills: cert.skills.join(", "),
      certificateURL: cert.certificateURL,
      credentialID: cert.credentialID,
      bg: cert.bg,
      image: cert.image
    });
    setEditingCertId(cert._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCertDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/certificates?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        setSuccess("Certificate deleted successfully!");
        fetchAllData();
      } else {
        setError("Failed to delete certificate");
      }
    } catch (err) {
      setError("An error occurred while deleting the certificate");
    }
  };

  // Gallery Submit
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.imageUrl) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm),
      });

      if (response.ok) {
        setSuccess("Photo added to gallery successfully!");
        setGalleryForm({ imageUrl: "", caption: "" });
        fetchAllData();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add photo");
      }
    } catch (err) {
      setError("An error occurred while adding the photo");
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/gallery?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        setSuccess("Photo deleted successfully!");
        fetchAllData();
      } else {
        setError("Failed to delete photo");
      }
    } catch (err) {
      setError("An error occurred while deleting the photo");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030203' }}>
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: "blogs", label: "Blogs" },
    { id: "about", label: "About & Profile" },
    { id: "resume", label: "Resume / CV" },
    { id: "skills", label: "Skills" },
    { id: "certificates", label: "Certificates" },
    { id: "gallery", label: "Photo Gallery" }
  ];

  return (
    <div className="min-h-screen text-gray-200 pb-20" style={{ background: '#030203', paddingTop: '100px' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Admin Panel
            </h1>
            <p className="text-sm text-gray-400 mt-1">Manage your website content dynamically in MongoDB</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/')}
              className="px-5 py-2 bg-gray-900 border border-gray-700 hover:border-gray-500 rounded-lg text-sm text-white transition-colors"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-600/90 hover:bg-red-700 rounded-lg text-sm text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Success/Error Alerts */}
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-6 text-sm flex justify-between items-center animate-pulse">
            <span>{success}</span>
            <button onClick={() => setSuccess("")} className="font-bold text-green-400 hover:text-white">×</button>
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError("")} className="font-bold text-red-400 hover:text-white">×</button>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-gray-800 mb-8 pb-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setError("");
                setSuccess("");
                setEditingSkillId(null);
                setEditingCertId(null);
              }}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all"
              style={{
                background: activeTab === tab.id ? 'linear-gradient(90deg, #ff6b6b, #ffd93d)' : 'transparent',
                color: activeTab === tab.id ? '#000000' : '#9ca3af',
                border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.08)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* TAB 1: BLOGS */}
          {activeTab === "blogs" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                <h2 className="text-2xl font-bold text-white mb-6">Create New Blog Post</h2>
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="Blog">Blog</option>
                        <option value="Research">Research</option>
                        <option value="Tutorial">Tutorial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Read Time</label>
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                        placeholder="Node.js, React, Python"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Blog Image *</label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleGenericImageUpload(e, "blog")}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                        disabled={uploadingImage}
                      />
                      {uploadingImage && <p className="text-xs text-gray-400">Uploading...</p>}
                      {formData.image && (
                        <div className="mt-2">
                          <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-gray-800" />
                          <p className="text-xs text-gray-500 mt-1 break-all">{formData.image}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt *</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      placeholder="Full markdown/html or text content..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg font-semibold text-black transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}
                  >
                    {loading ? "Creating..." : "Create Blog Post"}
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Existing Blog Posts</h2>
                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                  {blogs.length === 0 ? (
                    <p className="text-gray-400">No blog posts yet.</p>
                  ) : (
                    blogs.map((blog) => (
                      <div key={blog._id} className="bg-gray-950/80 border border-gray-800 rounded-xl p-4 flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{blog.title}</h3>
                          <p className="text-gray-400 text-xs line-clamp-2 mb-2">{blog.excerpt}</p>
                          <div className="flex gap-4 text-xs text-gray-500 font-mono">
                            <span>{blog.category}</span>
                            <span>{blog.date}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleBlogDelete(blog._id)}
                          className="px-3 py-1.5 bg-red-950/40 border border-red-900/40 text-red-400 rounded-lg text-xs hover:bg-red-800 hover:text-white transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT & PROFILE */}
          {activeTab === "about" && (
            <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto w-full">
              <h2 className="text-2xl font-bold text-white mb-6">Manage Profile & About Details</h2>
              <form onSubmit={handleAboutSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Display Name *</label>
                    <input
                      type="text"
                      value={aboutData.name}
                      onChange={(e) => setAboutData({ ...aboutData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Job Title *</label>
                    <input
                      type="text"
                      value={aboutData.title}
                      onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Banner Title/Subtitle (Line breaks separated) *</label>
                    <textarea
                      value={aboutData.bannerSubtitle}
                      onChange={(e) => setAboutData({ ...aboutData, bannerSubtitle: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                    <input
                      type="text"
                      value={aboutData.location}
                      onChange={(e) => setAboutData({ ...aboutData, location: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">About Heading (Short Bio) *</label>
                  <input
                    type="text"
                    value={aboutData.bio}
                    onChange={(e) => setAboutData({ ...aboutData, bio: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Detailed Description *</label>
                  <textarea
                    value={aboutData.description}
                    onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                    required
                  />
                </div>

                {/* Profile Pic & Banner Pic Uploads */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGenericImageUpload(e, "profile")}
                      className="w-full mb-2 text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                    />
                    {aboutData.profilePic && (
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-800 bg-gray-950">
                        <img src={aboutData.profilePic} alt="Profile preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Banner Background Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGenericImageUpload(e, "banner")}
                      className="w-full mb-2 text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                    />
                    {aboutData.bannerPic && (
                      <div className="relative w-full h-24 rounded-xl overflow-hidden border border-gray-800 bg-gray-950">
                        <img src={aboutData.bannerPic} alt="Banner preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Statistics editing */}
                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-md font-semibold text-white mb-4">Counter Statistics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {aboutData.stats.map((stat, idx) => (
                      <div key={idx} className="bg-gray-950 border border-gray-800 rounded-xl p-4 flex gap-3">
                        <div className="w-24">
                          <label className="block text-xs text-gray-500 mb-1">Value (e.g. 6+)</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => handleAboutStatChange(idx, "value", e.target.value)}
                            className="w-full px-2 py-1 bg-gray-900 border border-gray-800 rounded text-xs text-white"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1">Label (Description)</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleAboutStatChange(idx, "label", e.target.value)}
                            className="w-full px-2 py-1 bg-gray-900 border border-gray-800 rounded text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-semibold text-black transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}
                >
                  {loading ? "Saving Details..." : "Update About Section"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: RESUME / CV */}
          {activeTab === "resume" && (
            <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8 max-w-xl mx-auto w-full text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Resume / CV Upload</h2>
              <p className="text-sm text-gray-400 mb-6">
                Upload your Resume PDF file. It will be uploaded securely to Cloudinary, and the URL will be saved in MongoDB. 
                Any dynamic CV download links on the page will automatically download the latest uploaded PDF.
              </p>

              <div className="bg-gray-950 border border-dashed border-gray-800 rounded-xl p-8 mb-6 flex flex-col items-center justify-center">
                <span className="text-4xl mb-4">📄</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                  id="resume-file-input"
                  disabled={uploadingResume}
                />
                <label
                  htmlFor="resume-file-input"
                  className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg text-sm text-white cursor-pointer font-semibold transition-colors disabled:opacity-50"
                >
                  {uploadingResume ? "Uploading PDF..." : "Select Resume PDF File"}
                </label>
              </div>

              {resumeUrl && (
                <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 text-left">
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Current Active Link</p>
                  <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline break-all text-sm font-semibold">
                    {resumeUrl}
                  </a>
                  {resumeUpdated && (
                    <p className="text-xs text-gray-500 mt-2">Last Updated: {resumeUpdated}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === "skills" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingSkillId ? "Edit Skill" : "Add New Skill"}
                </h2>
                <form onSubmit={handleSkillSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name *</label>
                    <input
                      type="text"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      required
                      placeholder="e.g. Next.js"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                    >
                      <option value="Programming Languages">Programming Languages</option>
                      <option value="Web Technologies">Web Technologies</option>
                      <option value="Data Science & ML">Data Science & ML</option>
                      <option value="Design & Multimedia">Design & Multimedia</option>
                      <option value="Tools & Platforms">Tools & Platforms</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Icon Name (React Icons) *</label>
                      <select
                        value={iconOptions.some(opt => opt.value === skillForm.iconName) ? skillForm.iconName : "custom"}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val !== "custom") {
                            const iconColors: { [key: string]: string } = {
                              SiC: "#A8B9CC",
                              SiCplusplus: "#00599C",
                              FaJava: "#ED8B00",
                              SiJavascript: "#F7DF1E",
                              SiPhp: "#777BB4",
                              FaDatabase: "#336791",
                              SiPython: "#3776AB",
                              SiHtml5: "#E34F26",
                              SiCss: "#1572B6",
                              SiNumpy: "#013243",
                              SiPandas: "#150458",
                              SiScikitlearn: "#F7931E",
                              BsBarChartFill: "#4C72B0",
                              MdShowChart: "#11557C",
                              SiPytorch: "#EE4C2C",
                              SiTensorflow: "#FF6F00",
                              MdPhotoLibrary: "#31A8FF",
                              MdBrush: "#FF9A00",
                              SiCanva: "#00C4CC",
                              MdVideoLibrary: "#FF5722",
                              SiGnubash: "#4EAA25",
                              TbChartHistogram: "#F2C811",
                              SiAnaconda: "#44A833",
                              SiArduino: "#00979D",
                              FaNetworkWired: "#1BA0D7",
                            };
                            setSkillForm({
                              ...skillForm,
                              iconName: val,
                              color: iconColors[val] || skillForm.color
                            });
                          }
                        }}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none mb-2"
                      >
                        <option value="custom">-- Custom (Type below) --</option>
                        {iconOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={skillForm.iconName}
                        onChange={(e) => setSkillForm({ ...skillForm, iconName: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none font-mono"
                        required
                        placeholder="SiPython, FaJava, MdBrush"
                      />
                      <p className="text-[10px] text-gray-500 mt-1">Select from dropdown or type any React Icon name</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Icon Brand Color *</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={skillForm.color}
                          onChange={(e) => setSkillForm({ ...skillForm, color: e.target.value })}
                          className="h-10 w-12 border-0 bg-transparent rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={skillForm.color}
                          onChange={(e) => setSkillForm({ ...skillForm, color: e.target.value })}
                          className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 rounded-lg font-semibold text-black transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}
                    >
                      {loading ? "Saving..." : (editingSkillId ? "Update Skill" : "Add Skill")}
                    </button>
                    {editingSkillId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSkillId(null);
                          setSkillForm({ name: "", category: "Programming Languages", iconName: "SiPython", color: "#3776AB" });
                        }}
                        className="px-5 py-3 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white hover:border-gray-700"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Existing Skills</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {skills.length === 0 ? (
                    <p className="text-gray-400">No skills added yet.</p>
                  ) : (
                    skills.map((skill) => (
                      <div key={skill._id} className="bg-gray-950/80 border border-gray-800 rounded-xl p-3 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                          <span style={{ color: skill.color }} className="text-xl font-semibold font-mono">
                            {skill.iconName.substring(0, 2)}
                          </span>
                          <div>
                            <h3 className="text-white font-semibold text-sm">{skill.name}</h3>
                            <p className="text-gray-500 text-[10px]">{skill.category}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSkillEditClick(skill)}
                            className="px-2.5 py-1.2 border border-gray-800 hover:border-gray-600 rounded text-xs text-white transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleSkillDelete(skill._id)}
                            className="px-2.5 py-1.2 bg-red-950/30 border border-red-900/30 text-red-400 rounded text-xs hover:bg-red-800 hover:text-white transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingCertId ? "Edit Certificate" : "Add New Certificate"}
                </h2>
                <form onSubmit={handleCertSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Certificate Code/Id</label>
                      <input
                        type="text"
                        value={certForm.certificateId}
                        onChange={(e) => setCertForm({ ...certForm, certificateId: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                        placeholder="CERT-001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Certificate Title *</label>
                      <input
                        type="text"
                        value={certForm.title}
                        onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                        required
                        placeholder="Prompt Engineering"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Issued By *</label>
                      <input
                        type="text"
                        value={certForm.issuedBy}
                        onChange={(e) => setCertForm({ ...certForm, issuedBy: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                        required
                        placeholder="Coursera, IEB"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Issue Date *</label>
                      <input
                        type="date"
                        value={certForm.issueDate}
                        onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Skills Learnt (comma separated)</label>
                    <input
                      type="text"
                      value={certForm.skills}
                      onChange={(e) => setCertForm({ ...certForm, skills: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      placeholder="Prompt engineering, AI Agents"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Verification URL</label>
                      <input
                        type="text"
                        value={certForm.certificateURL}
                        onChange={(e) => setCertForm({ ...certForm, certificateURL: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                        placeholder="https://verify.cert.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Credential ID</label>
                      <input
                        type="text"
                        value={certForm.credentialID}
                        onChange={(e) => setCertForm({ ...certForm, credentialID: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                        placeholder="Credential ID"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Card BG Color</label>
                      <input
                        type="text"
                        value={certForm.bg}
                        onChange={(e) => setCertForm({ ...certForm, bg: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none font-mono"
                        placeholder="#000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Certificate Image File</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleGenericImageUpload(e, "certificate")}
                        className="w-full mb-2 text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:bg-gray-800 file:text-white"
                      />
                      {certForm.image && (
                        <div className="mt-2">
                          <img src={certForm.image} alt="Cert Preview" className="w-full h-20 object-cover rounded-lg border border-gray-800" />
                          <p className="text-[10px] text-gray-500 mt-1 truncate">{certForm.image}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 rounded-lg font-semibold text-black transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}
                    >
                      {loading ? "Saving..." : (editingCertId ? "Update Certificate" : "Add Certificate")}
                    </button>
                    {editingCertId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCertId(null);
                          setCertForm({
                            certificateId: "",
                            title: "",
                            issuedBy: "",
                            issueDate: new Date().toISOString().split('T')[0],
                            skills: "",
                            certificateURL: "",
                            credentialID: "",
                            bg: "#000000",
                            image: ""
                          });
                        }}
                        className="px-5 py-3 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white hover:border-gray-700"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Existing Certificates</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {certificates.length === 0 ? (
                    <p className="text-gray-400">No certificates added yet.</p>
                  ) : (
                    certificates.map((cert) => (
                      <div key={cert._id} className="bg-gray-950/80 border border-gray-800 rounded-xl p-4 flex gap-4">
                        {cert.image && (
                          <img src={cert.image} alt="cert thumbnail" className="w-16 h-16 object-cover rounded-lg border border-gray-800" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm truncate">{cert.title}</h3>
                          <p className="text-gray-400 text-xs truncate">{cert.issuedBy}</p>
                          <p className="text-gray-500 text-[10px]">{cert.issueDate}</p>
                        </div>
                        <div className="flex flex-col gap-2 justify-center">
                          <button
                            onClick={() => handleCertEditClick(cert)}
                            className="px-2.5 py-1 border border-gray-800 hover:border-gray-600 rounded text-xs text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleCertDelete(cert._id)}
                            className="px-2.5 py-1 bg-red-950/30 border border-red-900/30 text-red-400 rounded text-xs hover:bg-red-800 hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PHOTO GALLERY */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Upload Photo to Gallery</h2>
                <p className="text-xs text-gray-400 mb-4">
                  Note: The website layout (`Skiper30`) looks best with at least 12 photos. If you upload fewer, 
                  the system will safely pad the slots with default portfolio images automatically.
                </p>
                <form onSubmit={handleGallerySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Upload Photo File</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGenericImageUpload(e, "gallery")}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none file:mr-2 file:bg-gray-800 file:text-white"
                      disabled={uploadingGallery || uploadingImage}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Optional Caption</label>
                    <input
                      type="text"
                      value={galleryForm.caption}
                      onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none"
                      placeholder="e.g. IEB Poster Presentation"
                    />
                  </div>

                  {galleryForm.imageUrl && (
                    <div className="bg-gray-950 p-2 rounded-xl border border-gray-800">
                      <img src={galleryForm.imageUrl} alt="Uploaded thumbnail" className="w-full h-48 object-cover rounded-lg" />
                      <p className="text-[10px] text-gray-500 mt-1 break-all">{galleryForm.imageUrl}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !galleryForm.imageUrl}
                    className="w-full py-3 rounded-lg font-semibold text-black transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}
                  >
                    {loading ? "Adding..." : "Add to Gallery"}
                  </button>
                </form>
              </div>

              {/* Grid List */}
              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Existing Gallery Images</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
                  {gallery.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-12">No images uploaded yet.</div>
                  ) : (
                    gallery.map((photo) => (
                      <div key={photo._id} className="relative group bg-gray-950 border border-gray-800 rounded-xl overflow-hidden aspect-square">
                        <img src={photo.imageUrl} alt={photo.caption || "gallery photo"} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                          <p className="text-xs text-white mb-3 font-semibold line-clamp-3">{photo.caption || "No caption"}</p>
                          <button
                            onClick={() => handleGalleryDelete(photo._id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
