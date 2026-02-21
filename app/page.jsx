"use client";

import { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchBooks() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/books");
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
      setFiltered(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Book Recommendations
        </h1>

        {/* Add Book Form */}
        <section className="mb-8 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            Add a Book
          </h2>
          <BookForm onSuccess={fetchBooks} />
        </section>

        {/* Search */}
        <section className="mb-6">
          <SearchBar books={books} onFilter={setFiltered} />
        </section>

        {/* Book List */}
        <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="py-4 text-center text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : (
            <BookList books={filtered} />
          )}
        </section>
      </main>
    </div>
  );
}
