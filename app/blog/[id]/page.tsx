"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface Comment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  tags: string[];
  content: string;
  likes: number;
  comments: Comment[];
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchBlog();
    // Check if user already liked this blog
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
    setLiked(likedBlogs.includes(id));
  }, [id]);

  const fetchBlog = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/blogs/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data.blog);
        setLikeCount(data.blog.likes || 0);
      } else {
        console.error('Failed to fetch blog');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (liked) return; // Prevent multiple likes

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/blogs/${id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likes);
        setLiked(true);

        // Store in localStorage
        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
        likedBlogs.push(id);
        localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
      }
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentName.trim() || !commentText.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setSubmittingComment(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/blogs/${id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: commentName,
          comment: commentText,
        }),
      });

      if (response.ok) {
        setCommentName('');
        setCommentText('');
        fetchBlog(); // Refresh to show new comment
      } else {
        alert('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-4">
        <div className="text-2xl">Blog not found</div>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/#blogs')}
            className="text-white hover:text-gray-300 transition"
          >
            ← Back to Blogs
          </button>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative w-full h-[60vh] mt-16">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
            <span className="px-3 py-1 bg-white/10 rounded-full">{blog.category}</span>
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{blog.title}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">{blog.excerpt}</p>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          {/* Like Button */}
          <div className="mb-12 pb-12 border-b border-white/10">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg transition ${
                liked
                  ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <svg
                className={`w-6 h-6 ${liked ? 'fill-red-400' : 'fill-none'}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="font-semibold">
                {liked ? 'Liked' : 'Like'} ({likeCount})
              </span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">
              Comments ({blog.comments?.length || 0})
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-white/5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition"
                  required
                />
                <textarea
                  placeholder="Your Comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {submittingComment ? 'Submitting...' : 'Submit Comment'}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="p-6 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-lg">{comment.name}</h4>
                      <span className="text-sm text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
