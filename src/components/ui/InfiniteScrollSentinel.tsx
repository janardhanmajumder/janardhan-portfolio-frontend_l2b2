"use client";
import { useEffect, useRef } from "react";

interface InfiniteScrollSentinelProps {
  onIntersect: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

/**
 * A sentinel div placed at the bottom of a list.
 * Triggers `onIntersect` when it scrolls into view, as long as
 * there are more items to load and we're not already loading.
 */
const InfiniteScrollSentinel = ({
  onIntersect,
  hasMore,
  isLoading,
}: InfiniteScrollSentinelProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoading) {
          onIntersect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isLoading, onIntersect]);

  return <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />;
};

export default InfiniteScrollSentinel;
