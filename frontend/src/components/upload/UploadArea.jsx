import { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { parsePDF, parseEPUB } from "../../services/fileParser";
import { useBook } from "../../context/BookContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function UploadArea() {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentBook } = useBook();
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = async (file) => {
    if (!file) return;
    
    setIsLoading(true);
    setError("");

    try {
      let bookData = null;
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        bookData = await parsePDF(file);
      } else if (file.type === "application/epub+zip" || file.name.endsWith(".epub")) {
        bookData = await parseEPUB(file);
      } else {
        throw new Error("Unsupported file format. Please upload a PDF or EPUB.");
      }

      setCurrentBook(bookData);
      
      const bookId = encodeURIComponent(bookData.title.toLowerCase().replace(/\s+/g, '-'));
      navigate(`/player/${bookId}`);
      
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to process the book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    await processFile(file);
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    await processFile(file);
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-[32px] p-16 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[360px]
          ${isDragging 
            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 scale-[1.02] shadow-[var(--shadow-soft)]' 
            : 'border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[var(--accent-primary)]/40 hover:shadow-[var(--shadow-soft)]'
          }
        `}
      >
        
        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center text-[var(--text-main)]"
          >
            <Loader2 className="w-12 h-12 animate-spin text-[var(--accent-primary)] mb-6" />
            <h3 className="text-2xl font-bold tracking-tight">Extracting Text</h3>
            <p className="mt-3 text-[var(--text-muted)] text-sm font-medium">Preparing your AI audiobook...</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-3xl bg-[var(--background)] border border-[var(--border-subtle)] flex items-center justify-center mb-8 transition-colors ${isDragging ? 'border-[var(--accent-primary)]/50' : ''}`}>
              <UploadCloud className={`w-10 h-10 ${isDragging ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`} />
            </div>
            
            <h3 className="text-3xl font-bold text-[var(--text-main)] mb-3 tracking-tight">
              Upload a document
            </h3>
            <p className="text-[var(--text-muted)] mb-10 font-medium">
              Drag and drop a PDF or EPUB file here
            </p>

            <label className="cursor-pointer bg-[var(--accent-primary)] text-[var(--surface)] px-10 py-3.5 rounded-full font-medium shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glowing)] transition-all duration-300">
              Browse Files
              <input 
                type="file" 
                accept=".pdf,.epub,application/pdf,application/epub+zip" 
                className="hidden" 
                onChange={handleFileInput}
              />
            </label>
          </motion.div>
        )}

        {error && (
          <div className="absolute -bottom-16 w-full max-w-md mx-auto left-0 right-0 text-center text-red-500 bg-red-500/10 py-3 rounded-xl border border-red-500/20 text-sm font-bold shadow-sm">
            {error}
          </div>
        )}

      </div>
    </motion.div>
  );
}
