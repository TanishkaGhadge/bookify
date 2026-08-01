import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen pt-20 flex items-center justify-center bg-[var(--background)] relative w-full overflow-hidden">
      
      {/* --- Real Image Background Decorations --- */}
      
      {/* Split Cafe Lights (Left & Right) */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-[-15%] md:top-[-25%] left-[-15%] md:left-[-10%] w-[70%] md:w-[45%] z-0 mix-blend-multiply pointer-events-none"
      >
        <img 
          src="/images/real_cafe_lights.png" 
          alt="Cafe lights left" 
          className="w-full object-cover object-top opacity-60"
        />
      </motion.div>

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute top-[-15%] md:top-[-25%] right-[-15%] md:right-[-10%] w-[70%] md:w-[45%] z-0 mix-blend-multiply pointer-events-none"
      >
        <img 
          src="/images/real_cafe_lights.png" 
          alt="Cafe lights right" 
          className="w-full object-cover object-top opacity-60"
          style={{ transform: "scaleX(-1)" }}
        />
      </motion.div>

      {/* Floating Leaves */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[55%] left-[-5%] md:left-[2%] z-0 pointer-events-none mix-blend-multiply"
      >
        <img 
          src="/images/real_green_leaves.png" 
          alt="Leaves" 
          className="w-40 md:w-56 opacity-90 filter contrast-[1.3] brightness-[1.2]"
        />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[50%] right-[-5%] md:right-[2%] z-0 pointer-events-none mix-blend-multiply"
      >
        <img 
          src="/images/real_green_leaves.png" 
          alt="Leaves" 
          className="w-48 md:w-72 opacity-90 filter contrast-[1.3] brightness-[1.2]" 
          style={{ transform: "scaleX(-1) rotate(45deg)" }}
        />
      </motion.div>

      {/* Individual Floating Books */}
      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [-10, 0, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[65%] left-[5%] md:left-[10%] z-0 hidden lg:block pointer-events-none mix-blend-multiply"
      >
        <img 
          src="/images/single_vintage_book.png" 
          alt="Vintage book" 
          className="w-32 opacity-90 filter contrast-125 brightness-110"
        />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [15, 5, 15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute top-[75%] right-[8%] md:right-[12%] z-0 hidden lg:block pointer-events-none mix-blend-multiply"
      >
        <img 
          src="/images/single_vintage_book.png" 
          alt="Vintage book" 
          className="w-40 opacity-90 filter contrast-125 brightness-110"
          style={{ transform: "scaleX(-1)" }}
        />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [5, 12, 5] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
        className="absolute top-[85%] left-[20%] md:left-[25%] z-0 hidden lg:block pointer-events-none mix-blend-multiply"
      >
        <img 
          src="/images/single_vintage_book.png" 
          alt="Vintage book" 
          className="w-24 opacity-70 filter contrast-125 brightness-110"
        />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [-15, -5, -15] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute top-[60%] right-[25%] md:right-[30%] z-0 hidden lg:block pointer-events-none mix-blend-multiply"
      >
        <img 
          src="/images/single_vintage_book.png" 
          alt="Vintage book" 
          className="w-28 opacity-80 filter contrast-125 brightness-110"
          style={{ transform: "scaleX(-1) rotate(10deg)" }}
        />
      </motion.div>
      {/* ---------------------------------------- */}

      <div className="w-full max-w-4xl mx-auto text-center relative z-20 px-6 flex flex-col items-center">
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface)]/80 backdrop-blur-sm text-[var(--accent-primary)] font-medium text-sm mb-10 border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]"
        >
          <Coffee size={18} />
          <span>Your cozy reading corner, reinvented.</span>
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-7xl font-bold text-[var(--text-main)] tracking-tight leading-[1.1] w-full drop-shadow-sm"
        >
          Turn your PDFs into <br />
          <span className="text-[var(--accent-primary)] italic font-serif relative">
            beautiful audiobooks.
            {/* Underline decorative SVG */}
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-[var(--accent-secondary)]/40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00017 6.44299C35.0357 2.23595 101.99 -1.63737 197.971 7.21855" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-xl text-[var(--text-muted)] font-medium max-w-2xl mx-auto leading-relaxed w-full"
        >
          Upload any document and let Bookify's premium AI create a natural sounding audiobook in seconds. Customise audio, language, and speed.
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 w-full flex justify-center"
        >
          <Link to="/login" className="flex items-center justify-center bg-[var(--accent-primary)] text-[var(--surface)] px-20 py-7 rounded-full font-bold shadow-[0_6px_20px_rgba(110,78,58,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(110,78,58,0.5)] transition-all duration-300 text-3xl">
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}