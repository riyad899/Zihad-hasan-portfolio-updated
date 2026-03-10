"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BlogPost {
  _id?: string;
  id?: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  tags: string[];
  link: string;
}

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback static posts
  const staticPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Building Scalable Microservices with Node.js',
      category: 'Blog',
      date: 'February 15, 2026',
      readTime: '8 min read',
      excerpt: 'Learn how to architect and deploy microservices that can handle millions of requests per day.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      tags: ['Node.js', 'Microservices', 'Architecture'],
      link: '#',
    },
    {
      id: 2,
      title: 'Research: AI-Powered Code Optimization',
      category: 'Research',
      date: 'January 28, 2026',
      readTime: '12 min read',
      excerpt: 'A comprehensive study on using machine learning algorithms to automatically optimize code performance.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      tags: ['AI', 'Machine Learning', 'Research'],
      link: '#',
    },
    {
      id: 3,
      title: 'Modern CSS Techniques for Responsive Design',
      category: 'Blog',
      date: 'January 10, 2026',
      readTime: '6 min read',
      excerpt: 'Explore the latest CSS features and best practices for creating truly responsive web applications.',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
      tags: ['CSS', 'Web Design', 'Frontend'],
      link: '#',
    },
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/blogs`);
      if (response.ok) {
        const data = await response.json();
        if (data.blogs && data.blogs.length > 0) {
          setPosts(data.blogs);
        } else {
          setPosts(staticPosts);
        }
      } else {
        setPosts(staticPosts);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setPosts(staticPosts);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="blogs" className="py-12 sm:py-16 md:py-20" style={{ background: '#000000' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading blogs...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-12 sm:py-16 md:py-20" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-4" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            background: "linear-gradient(90deg, #555 0%, #fff 40%, #aaa 60%, #555 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s linear infinite"
          }}>
            Blogs & Research
          </h2>
          <p className="text-lg sm:text-xl text-gray-300">Thoughts, insights, and research publications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <article
              key={post._id || post.id}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ background: '#1a1a1a', border: '1px solid #333' }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}>
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs text-white"
                      style={{ background: '#2a2a2a' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post._id || post.id}`}
                  className="inline-flex items-center font-semibold"
                  style={{ color: '#ffd93d' }}
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
