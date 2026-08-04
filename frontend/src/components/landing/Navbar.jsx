import { Link, useLocation } from "react-router-dom";
import { User, Moon, Sun, Library, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

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

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[var(--text-muted)]">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${location.pathname === '/dashboard' ? 'bg-[var(--accent-primary)] text-[var(--surface)] shadow-sm font-bold' : 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20'}`}
              >
                <Sparkles size={18} />
                <span>Create your Audiobook</span>
              </Link>

              <Link 
                to="/library" 
                className={`flex items-center gap-2 transition-colors ${location.pathname === '/library' ? 'text-[var(--accent-primary)] font-bold' : 'hover:text-[var(--text-main)]'}`}
              >
                <Library size={18} />
                <span>Library</span>
              </Link>

              <Link 
                to="/profile" 
                className={`flex items-center gap-2 transition-colors ${location.pathname === '/profile' ? 'text-[var(--accent-primary)] font-bold' : 'hover:text-[var(--text-main)]'}`}
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
            </>
          ) : (
            <div className="text-[var(--text-muted)]/50 italic font-serif">Welcome to Bookify</div>
          )}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-[var(--background)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-300 shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <button
              onClick={() => logout()}
              className="flex items-center justify-center gap-2 bg-[var(--surface)] border border-[var(--border-subtle)] text-[var(--text-main)] px-6 py-2.5 rounded-full font-bold shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center gap-3 bg-[var(--text-main)] text-[var(--surface)] px-8 py-3 rounded-full font-bold shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              <User size={20} strokeWidth={2.5} />
              Login
            </Link>
          )}
        </div>

      </div>
    </motion.nav>
  );
}