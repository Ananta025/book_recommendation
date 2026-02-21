import { promises as fs } from "fs";
import path from "path";

// Use environment variable to demonstrate config usage; defaults to local JSON file
const DATA_SOURCE =
  process.env.DATA_SOURCE || path.join(process.cwd(), "data", "books.json");

/**
 * Read all books from the JSON data file.
 * @returns {Promise<Array>} Array of book objects.
 */
export async function getBooks() {
  try {
    const raw = await fs.readFile(DATA_SOURCE, "utf-8");
    const books = JSON.parse(raw);
    return books;
  } catch (err) {
    // If the file doesn't exist yet, return an empty array
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

/**
 * Generate the next unique incremental id based on existing books.
 * @param {Array} books - Current array of book objects.
 * @returns {number} Next unique id.
 */
export function generateId(books) {
  if (books.length === 0) return 1;
  const maxId = Math.max(...books.map((b) => b.id));
  return maxId + 1;
}

/**
 * Add a new book to the JSON data file.
 * @param {{ title: string, author: string }} bookData - The book to add.
 * @returns {Promise<Object>} The newly created book object (with id).
 */
export async function addBook({ title, author }) {
  const books = await getBooks();
  const newBook = { id: generateId(books), title, author };
  books.push(newBook);
  await fs.writeFile(DATA_SOURCE, JSON.stringify(books, null, 2), "utf-8");
  return newBook;
}