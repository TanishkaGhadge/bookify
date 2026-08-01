import { useBook } from "../context/BookContext";
import { Link } from "react-router-dom";

export default function Player() {
  const { currentBook } = useBook();

  if (!currentBook) {
    return (
      <div className="min-h-screen pt-24 px-8 text-center">
        <h1 className="text-3xl font-serif text-[var(--espresso)]">No book loaded</h1>
        <Link to="/dashboard" className="text-[var(--coffee)] underline mt-4 block">Go back and upload a book</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-8 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-[var(--espresso)] mb-2">
          {currentBook.title}
        </h1>
        <p className="text-[var(--walnut)]/80 mb-10 text-lg">
          Format: {currentBook.format} | Chapters: {currentBook.chapters.length}
        </p>

        {/* Temporary preview of extraction */}
        <div className="bg-[var(--surface)] p-6 rounded-2xl shadow-inner border border-[var(--walnut)]/10 max-h-[60vh] overflow-y-auto">
          {currentBook.chapters.map((chapter) => (
            <div key={chapter.id} className="mb-8">
              <h3 className="text-xl font-bold font-serif text-[var(--coffee)] mb-4">{chapter.title}</h3>
              <p className="text-[var(--text)] whitespace-pre-wrap leading-relaxed">{chapter.text.substring(0, 500)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}