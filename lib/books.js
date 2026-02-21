import { promises as fs } from "fs";
import path from "path";

/**
 * Resolve the data-source path from the environment variable.
 * Converts relative paths to absolute based on the project root.
 * @returns {string} Absolute path to the JSON data file.
 * @throws {Error} If DATA_SOURCE is not set.
 */
export function resolveDataSource() {
  const raw = process.env.DATA_SOURCE;
  if (!raw) {
    throw new Error("DATA_SOURCE environment variable is not configured");
  }
  return path.isAbsolute(raw) ? raw : path.join(process.cwd(), raw);
}

/**
 * Read all books from the JSON data file.
 * @returns {Promise<Array>} Array of book objects.
 */
export async function getBooks() {
  const filePath = resolveDataSource();
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
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
  const filePath = resolveDataSource();
  const books = await getBooks();
  const newBook = { id: generateId(books), title, author };
  books.push(newBook);
  await fs.writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");
  return newBook;
}