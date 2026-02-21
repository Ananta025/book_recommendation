"use client";

/**
 * Reusable component that renders a list of books.
 * Shows an empty-state message when no books are available.
 *
 * @param {{ books: Array<{ id: number, title: string, author: string }> }} props
 */
export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return (
      <p className="py-8 text-center text-zinc-500 dark:text-zinc-400">
        No books available. Add one using the form above!
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
      {books.map((book) => (
        <li
          key={book.id}
          className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0"
        >
          <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {book.title}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            by {book.author}
          </span>
        </li>
      ))}
    </ul>
  );
}