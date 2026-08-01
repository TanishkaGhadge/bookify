import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Bookshelf() {
  const dummyBooks = [
    { title: "Atomic Habits", author: "James Clear", duration: "5h 32m", progress: 65, color: "bg-[#F5EFE8]" },
    { title: "Sapiens", author: "Yuval Noah Harari", duration: "14h 10m", progress: 12, color: "bg-[#E6E8E6]" },
    { title: "Deep Work", author: "Cal Newport", duration: "7h 45m", progress: 0, color: "bg-[#EFE9E5]" }
  ];

  return (
    <section className="py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold text-[var(--text)] tracking-tight">
              Your <span className="font-serif italic text-[var(--walnut)]">Library</span>
            </h2>
            <p className="mt-4 text-lg text-[var(--text)]/60 font-normal">
              Pick up exactly where you left off.
            </p>
          </div>
          <button className="hidden md:block text-sm font-medium text-[var(--walnut)] hover:text-[#5a3f2f] transition-colors">
            View all books &rarr;
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dummyBooks.map((book, i) => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              key={i}
              className="group cursor-pointer"
            >
              <div className={`aspect-[4/5] rounded-[20px] ${book.color} mb-6 relative overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-black/5 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--walnut)] pl-1">
                    <Play size={24} className="fill-current" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text)] truncate">{book.title}</h3>
              <p className="text-[var(--text)]/60 text-sm mt-1">{book.author}</p>
              
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--sage)] rounded-full" style={{ width: `${book.progress}%` }} />
                </div>
                <span className="text-xs font-medium text-[var(--text)]/50">{book.progress > 0 ? `${book.progress}%` : book.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}