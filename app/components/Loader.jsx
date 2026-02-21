"use client";

/**
 * Simple loading spinner / indicator.
 */
export default function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-800 dark:border-zinc-600 dark:border-t-zinc-200" />
    </div>
  );
}