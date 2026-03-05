import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { blogPosts } from "@/lib/blog-posts";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

const normalizeSlug = (slug: string) =>
  decodeURIComponent(slug)
    .replace(/\/+$/, "")
    .replace(/\.html?$/i, "")
    .toLowerCase();

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const slug = normalizeSlug(params.slug);
  const post = blogPosts.find((item) => item.slug.toLowerCase() === slug);
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
  const slug = normalizeSlug(params.slug);
  const post = blogPosts.find((item) => item.slug.toLowerCase() === slug);

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

        <div className="max-w-3xl mx-auto px-6 py-16">
          {post.content.map((paragraph, index) => {
            // Handle empty lines (spacing)
            if (paragraph === "") {
              return <div key={index} className="h-4" />;
            }
            
            // Handle h2 headers
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-3xl font-bold text-slate-900 mt-10 mb-6">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            
            // Handle bullet points
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={index} className="list-disc list-inside text-lg text-slate-700 leading-relaxed mb-4 space-y-2">
                  <li>{paragraph.replace("- ", "")}</li>
                </ul>
              );
            }
            
            // Handle numbered lists
            if (paragraph.match(/^\d+\./)) {
              return (
                <ol key={index} className="list-decimal list-inside text-lg text-slate-700 leading-relaxed mb-4">
                  <li>{paragraph.replace(/^\d+\.\s*/, "")}</li>
                </ol>
              );
            }
            
            // Default paragraph
            return (
              <p key={index} className="text-lg text-slate-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </PublicLayout>
  );
}
