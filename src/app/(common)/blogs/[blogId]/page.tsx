import { TBlog } from "@/types/blog.type";
import { CalendarDays, MessageSquare, Tag } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type TBlogDetailsProps = {
  params: {
    [index: string]: unknown;
  };
};

export const metadata: Metadata = {
  title: "JANARDHAN | BLOG",
  description:
    "Passionate web developer skilled in creating dynamic, user-friendly websites with innovative design and seamless functionality.",
};

const BlogDetails = async ({ params }: TBlogDetailsProps) => {
  const { blogId } = params;
  const res = await fetch(`${process.env.SERVER_URL}/blogs/${blogId}`, {
    next: { revalidate: 30 },
  });
  const { data: blog }: { data: TBlog } = await res.json();
  return (
    <div className="min-h-screen flex flex-col pt-16 md:pt-12 pb-32 relative">
      {/* Hero Image */}
      {blog?.images?.length > 0 && (
        <div className="w-full h-[300px] md:h-[450px] overflow-hidden relative">
          <Image
            src={blog.images[0]}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      )}

      <div className="py-10 px-4 md:px-20 space-y-8 max-w-4xl mx-auto w-full">
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} className="text-violet-400" />
            {new Date(blog.createdAt).toDateString()}
          </span>
          {blog.subTitle && (
            <>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1.5">
                <Tag size={14} className="text-violet-400" />
                {blog.subTitle}
              </span>
            </>
          )}
          <span className="text-zinc-700">•</span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={14} className="text-violet-400" />4 comments
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-white leading-tight">
          {blog.title}
        </h1>

        <div className="h-px bg-zinc-800" />

        {/* Description */}
        {blog.des && (
          <p className="text-base text-zinc-300 leading-relaxed text-justify">
            {blog.des}
          </p>
        )}

        {/* Bullet points */}
        {blog.desBullet && blog.desBullet.length > 0 && (
          <ul className="space-y-3 list-disc pl-6 text-zinc-300 text-sm leading-relaxed">
            {blog.desBullet.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}

        {/* Additional images */}
        {blog.images?.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {blog.images.slice(1).map((img, index) => (
              <div
                key={index}
                className="w-full h-[220px] overflow-hidden rounded-xl border border-zinc-800"
              >
                <Image
                  src={img}
                  alt={`${blog.title} image ${index + 2}`}
                  width={800}
                  height={800}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}

        <div className="h-px bg-zinc-800" />

        {/* Back button */}
        <div className="pt-2">
          <Link href="/blogs">
            <Button
              variant="outline"
              className="rounded-full border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 hover:text-white px-8 py-5 border hover:border-zinc-700 transition-all duration-300"
            >
              ← Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const res = await fetch(`${process.env.SERVER_URL}/blogs`);
  const { data } = await res.json();
  return data.map((blog: TBlog) => ({
    blogId: blog._id,
  }));
}

export default BlogDetails;
