# Book Recommendations — Next.js Full-Stack App

## Project Overview

A full-stack book recommendation application built with **Next.js App Router**. Users can browse a list of books, add new books via a form, and search/filter by title in real time. The backend is a lightweight API route that reads from and writes to a local JSON file.

## Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Framework  | Next.js 16 (App Router)          |
| Language   | JavaScript / TypeScript (config) |
| Styling    | Tailwind CSS 4                   |
| Runtime    | Node.js (fs/promises)            |
| Data Store | Local JSON file (`data/books.json`) |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Set the data-source path via env variable
export DATA_SOURCE="$(pwd)/data/books.json"

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── page.tsx              # Main client page (CSR)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global Tailwind styles
│   ├── api/
│   │   └── books/
│   │       └── route.js      # API route (GET / POST)
│   └── components/
│       ├── BookList.jsx      # Renders list of books
│       ├── BookForm.jsx      # Controlled add-book form
│       ├── SearchBar.jsx     # Real-time title search
│       └── Loader.jsx        # Loading spinner
├── lib/
│   └── books.js              # Data-access helpers (read, add, generateId)
├── data/
│   └── books.json            # Seed / persistent data file
└── README.md
```

## Request Flow

```
Client (Browser)
  │
  │  fetch("/api/books")   ← useEffect on mount
  ▼
API Route (app/api/books/route.js)
  │
  │  getBooks() / addBook()   ← lib/books.js helpers
  ▼
Data Source (data/books.json)
  │
  │  JSON response
  ▼
Client (Browser)
  │
  │  setState → re-render
  ▼
UI updated (BookList / SearchBar)
```

1. **Client → API**: The React page fetches `/api/books` (GET) on mount and sends POST requests when the form is submitted.
2. **API → Data Source**: The route handler delegates to helper functions in `lib/books.js`, which use `fs/promises` to read from or write to the JSON file whose path is configured via `process.env.DATA_SOURCE`.
3. **Data Source → API → Client**: The API returns a JSON response; the client updates state and re-renders the relevant components.

## CSR vs SSR — Design Decision

This application uses **Client-Side Rendering (CSR)** for the main page:

| Aspect | CSR (chosen) | SSR |
| --- | --- | --- |
| **Data freshness** | Fetches latest data on every visit via `useEffect` | Renders on the server per request |
| **Interactivity** | Immediate — form submissions, search filtering, and UI updates happen without page reloads | Requires hydration before interactive |
| **Simplicity** | Single client component can manage all state (`books`, `filtered`, `loading`, `error`) | Would need server actions or separate data-fetching patterns |
| **Use case fit** | Ideal for a dynamic dashboard where users add and search books frequently | Better for SEO-critical or content-heavy pages |

Since this app is an interactive tool (not a content/SEO page), CSR keeps the architecture straightforward while delivering a responsive user experience.

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `DATA_SOURCE` | Absolute path to the books JSON file | `<project_root>/data/books.json` |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
