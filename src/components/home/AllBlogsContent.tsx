"use client";
import { useCallback, useEffect, useState } from "react";
import { TBlog } from "@/types/blog.type";
import InfiniteScrollSentinel from "@/components/ui/InfiniteScrollSentinel";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import config from "@/config";

const LIMIT = 9;

interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const AllBlogsContent = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<TMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const hasMore = meta ? page <= meta.totalPage : true;

  const fetchBlogs = useCallback(async (pageNum: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${config.serverUrl}/blogs?page=${pageNum}&limit=${LIMIT}`,
        { cache: "no-store" }
      );
      const json = await res.json();
      setBlogs((prev) =>
        pageNum === 1 ? json.data : [...prev, ...json.data]
      );
      setMeta(json.meta);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchBlogs(1);
  }, [fetchBlogs]);

  // Sentinel callback — load next page
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore && hasFetched) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBlogs(nextPage);
    }
  }, [isLoading, hasMore, hasFetched, page, fetchBlogs]);

  return (
    <div>
      {/* Blog grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {blogs?.map((blog: TBlog, index: number) => (
          <Link href={`blogs/${blog._id}`} key={blog._id}>
            <div
              data-aos="fade-right"
              data-aos-delay={`${(index % 9).toString()}00`}
              className="group space-y-4 bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-md px-3 pt-3 pb-5 rounded-2xl shadow-xl hover:-translate-y-2 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 flex flex-col justify-between h-full"
            >
              <div>
                {blog.images && (
                  <div className="w-full h-[200px] overflow-hidden rounded-xl bg-zinc-950">
                    <Image
                      src={blog.images[0]}
                      alt="Image"
                      width={800}
                      height={800}
                      className="object-cover w-full h-full group-hover:scale-110 duration-500"
                    />
                  </div>
                )}

                <p className="text-[10px] font-mono tracking-wider text-zinc-500 mt-4 flex items-center gap-2">
                  <span>{new Date(blog.createdAt).toDateString().slice(4)}</span>
                  <span>•</span>
                  <span>{blog.subTitle}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={10} className="inline text-violet-400" /> 4
                  </span>
                </p>

                <h1 className="text-lg font-bold font-heading text-white leading-snug mt-2 line-clamp-2 h-14 group-hover:text-violet-400 transition-colors duration-300">
                  {blog.title}
                </h1>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-4 text-justify mt-2">
                  {blog.des}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Loading skeleton rows */}
      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-2xl bg-zinc-900/40 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Sentinel — triggers next page fetch */}
      {!isLoading && hasMore && hasFetched && (
        <InfiniteScrollSentinel
          onIntersect={handleLoadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      )}

      {/* End-of-list message */}
      {!hasMore && hasFetched && (
        <div className="flex flex-col items-center gap-2 py-12 text-zinc-500">
          <svg
            className="w-8 h-8 text-violet-500/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <p className="text-sm font-mono tracking-widest uppercase">
            You've read all {meta?.total} blogs
          </p>
        </div>
      )}
    </div>
  );
};

export default AllBlogsContent;
