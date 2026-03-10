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

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
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

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (auth !== "true") {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      fetchBlogs();
    }
  }, [router]);

  const fetchBlogs = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/blogs`);
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
        }),
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
        fetchBlogs();
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

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/blogs?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccess("Blog deleted successfully!");
        fetchBlogs();
      } else {
        setError("Failed to delete blog");
      }
    } catch (err) {
      setError("An error occurred while deleting the blog");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          image: data.data.url,
        }));
        setSuccess('Image uploaded successfully!');
      } else {
        setError('Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030203' }}>
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#030203', paddingTop: '100px' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/#blogs')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Blogs
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Blog Form */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Blog Post</h2>

            {success && (
              <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-4">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
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
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Blog Image *</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && (
                    <p className="text-sm text-gray-400">Uploading image...</p>
                  )}
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg border border-gray-700"
                      />
                      <p className="text-xs text-gray-400 mt-1 break-all">{formData.image}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Node.js, React, JavaScript"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Full blog content..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                style={{
                  background: loading ? '#555' : 'linear-gradient(90deg, #ff6b6b, #ffd93d)',
                  color: '#000',
                }}
              >
                {loading ? "Creating..." : "Create Blog Post"}
              </button>
            </form>
          </div>

          {/* Existing Blogs */}
          <div className="bg-black border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Existing Blog Posts</h2>

            <div className="space-y-4 max-h-[800px] overflow-y-auto">
              {blogs.length === 0 ? (
                <p className="text-gray-400">No blog posts yet.</p>
              ) : (
                blogs.map((blog) => (
                  <div key={blog._id} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{blog.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{blog.excerpt.substring(0, 100)}...</p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>{blog.category}</span>
                          <span>{blog.date}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
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
      </div>
    </div>
  );
}
