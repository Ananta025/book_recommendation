import { NextResponse } from "next/server";
import { getBooks, addBook, resolveDataSource } from "@/lib/books";

/**
 * Validate that the DATA_SOURCE env var is configured.
 * Returns a 500 response if missing; never leaks the actual value.
 */
function validateConfig() {
  try {
    resolveDataSource();
    return null; // config is valid
  } catch {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/books
 * Returns the full list of books as JSON.
 */
export async function GET() {
  const configError = validateConfig();
  if (configError) return configError;

  try {
    const books = await getBooks();
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("GET /api/books error:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/books
 * Accepts { title, author } in the request body and appends a new book.
 */
export async function POST(request) {
  const configError = validateConfig();
  if (configError) return configError;

  try {
    const body = await request.json();
    const { title, author } = body;

    if (!title || !author) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      );
    }

    const newBook = await addBook({ title, author });
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("POST /api/books error:", error);
    return NextResponse.json(
      { error: "Failed to add book" },
      { status: 500 }
    );
  }
}