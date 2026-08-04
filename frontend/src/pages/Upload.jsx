import { motion } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import UploadArea from "../components/upload/UploadArea";

export default function Upload() {
  return (
    <div className="min-h-screen bg-[var(--background)] relative w-full overflow-hidden">
      <Navbar />

      {/* Decorative Lights */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-[-15%] md:top-[-25%] left-[-15%] md:left-[-10%] w-[70%] md:w-[45%] z-0 mix-blend-multiply pointer-events-none"
      >
        <img src="/images/real_cafe_lights.png" alt="Cafe lights left" className="w-full object-cover object-top opacity-60" />
      </motion.div>

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute top-[-15%] md:top-[-25%] right-[-15%] md:right-[-10%] w-[70%] md:w-[45%] z-0 mix-blend-multiply pointer-events-none"
      >
        <img src="/images/real_cafe_lights.png" alt="Cafe lights right" className="w-full object-cover object-top opacity-60" style={{ transform: "scaleX(-1)" }} />
      </motion.div>

      <div className="pt-36 px-6 pb-16 flex flex-col items-center justify-center min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto text-center w-full">
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-serif italic text-sm font-semibold mb-4 border border-[var(--accent-primary)]/20">
              PDF & EPUB Converter
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] mb-4 font-heading tracking-tight">
              Convert Your Book to Audiobook
            </h1>
            
            <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto mb-8 font-medium">
              Upload your document and let our smart voice engine generate your personalized audio reading experience.
            </p>
          </motion.div>

          <UploadArea />
        </div>
      </div>
    </div>
  );
}
