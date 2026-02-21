"use client";

import { useState } from "react";

/**
 * Controlled form component for adding a new book.
 *
 * @param {{ onSuccess: () => void }} props
 */
export default function BookForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !author.trim()) {
      setError("Both title and author are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), author: author.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add book");
      }

      setTitle("");
      setAuthor("");
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </p>
      )}

      <input
        type="text"
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {loading ? "Adding…" : "Add Book"}
      </button>
    </form>
  );
}