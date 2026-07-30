"use client";
import { useCallback, useEffect, useState } from "react";
import ProjectContent from "@/components/ui/ProjectContent";
import InfiniteScrollSentinel from "@/components/ui/InfiniteScrollSentinel";
import { TProject } from "@/types/project.type";
import config from "@/config";

const LIMIT = 9;

interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const AllProjectsContent = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<TMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const hasMore = meta ? page <= meta.totalPage : true;

  const fetchProjects = useCallback(async (pageNum: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${config.serverUrl}/projects?page=${pageNum}&limit=${LIMIT}`,
        { cache: "no-store" }
      );
      const json = await res.json();
      setProjects((prev) =>
        pageNum === 1 ? json.data : [...prev, ...json.data]
      );
      setMeta(json.meta);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProjects(1);
  }, [fetchProjects]);

  // Sentinel callback — load next page
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore && hasFetched) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProjects(nextPage);
    }
  }, [isLoading, hasMore, hasFetched, page, fetchProjects]);

  return (
    <div>
      <ProjectContent projects={projects} />

      {/* Loading skeleton rows */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mt-16 pb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-lg bg-zinc-900/40 animate-pulse"
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
            You've seen all {meta?.total} projects
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProjectsContent;
