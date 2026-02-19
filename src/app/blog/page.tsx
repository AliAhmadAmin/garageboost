import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Garage Boost",
  description: "Insights on MOT reminders, garage CRM, and growing garage revenue.",
};

export default function BlogPage() {
  return (
    <PublicLayout>
      <div className="bg-white">
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-black mb-6">Garage Boost Blog</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Practical guidance for UK garages that want more bookings.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-sm text-slate-500 mb-3">
                  {post.date} • {post.readTime}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{post.title}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
