import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { blogPosts } from "@/lib/blog-posts";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    return {
      title: "Post Not Found | Garage Boost",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: `${post.title} | Garage Boost`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PublicLayout>
      <div className="bg-white">
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="text-sm text-blue-100 mb-3">{post.date} • {post.readTime}</div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">{post.title}</h1>
            <p className="text-xl text-blue-100 leading-relaxed">{post.excerpt}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16 space-y-6">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-lg text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
