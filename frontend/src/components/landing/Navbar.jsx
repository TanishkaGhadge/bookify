import { Link, useLocation } from "react-router-dom";
import { User, Moon, Sun, Library, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50"
    >
      <div className="h-auto min-h-[5rem] py-3 px-6 md:px-8 flex items-center justify-between bg-[var(--surface)]/80 backdrop-blur-2xl rounded-[2rem] border border-[var(--border-subtle)] shadow-[var(--shadow-soft)]">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-[14px] overflow-hidden shadow-inner border border-[var(--border-subtle)] bg-[var(--background)]">
            <img src="/logo.png" alt="Bookify Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[var(--text-main)] tracking-tight font-heading">
              Bookify
            </h2>
          </div>
        </Link>

        {/* Navigation - Only show if NOT on landing page */}
        {!isLandingPage && (
          <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-[var(--text-muted)]">
            <Link to="/library" className="flex items-center gap-2 transition-colors hover:text-[var(--text-main)]">
              <Library size={18} />
              Library
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 transition-colors hover:text-[var(--text-main)]">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </div>
        )}

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          {!isLandingPage && (
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-[var(--background)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300 shadow-sm"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {isLandingPage ? (
            <Link
              to="/login"
              className="flex items-center justify-center gap-3 bg-[var(--text-main)] text-[var(--surface)] px-12 py-5 rounded-full font-bold text-2xl shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              <User size={36} strokeWidth={2.5} />
              Login
            </Link>
          ) : (
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
              <User size={20} />
            </div>
          )}
        </div>

      </div>
    </motion.nav>
  );
}