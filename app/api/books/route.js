import { NextResponse } from "next/server";
import { getBooks, addBook } from "@/lib/books";

/**
 * GET /api/books
 * Returns the full list of books as JSON.
 */
export async function GET() {
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