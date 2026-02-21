"use client";

import { useState, useMemo } from "react";

/**
 * Search input that filters books by title in real time.
 *
 * @param {{ books: Array, onFilter: (filtered: Array) => void }} props
 *   - books: the full unfiltered list
 *   - onFilter: callback that receives the currently filtered list
 */
export default function SearchBar({ books, onFilter }) {
  const [query, setQuery] = useState("");

  // Compute filtered list whenever query or books change
  const filtered = useMemo(() => {
    if (!query.trim()) return books;
    return books.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, books]);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    // Compute inline so we don't depend on the next render cycle
    const result = value.trim()
      ? books.filter((b) =>
          b.title.toLowerCase().includes(value.toLowerCase())
        )
      : books;
    onFilter(result);
  }

  return (
    <input
      type="text"
      placeholder="Search by title…"
      value={query}
      onChange={handleChange}
      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
    />
  );
}