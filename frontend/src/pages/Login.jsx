import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--surface)]/50 rounded-full blur-[100px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="flex items-center justify-center gap-3 mb-10 transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl overflow-hidden shadow-inner border border-[var(--border-subtle)] bg-[var(--background)]">
            <img src="/logo.png" alt="Bookify Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight font-heading">
            Bookify
          </h2>
        </Link>

        <div className="bg-[var(--surface)] p-10 rounded-[24px] shadow-[var(--shadow-soft)] border border-[var(--border-subtle)] backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-[var(--text-main)] mb-2 text-center font-heading">Welcome back</h1>
          <p className="text-[var(--text-muted)] text-sm text-center mb-8 font-medium">
            Enter your details to access your library.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Email</label>
              <input 
                type="email" 
                required
                placeholder="you@example.com"
                className="w-full px-5 py-4 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)] text-[var(--text-main)] focus:border-[var(--accent-primary)]/50 focus:ring-2 focus:ring-[var(--accent-primary)]/20 outline-none transition-all placeholder:text-[var(--text-muted)]/50 font-medium"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-[var(--text-main)]">Password</label>
                <a href="#" className="text-xs font-semibold text-[var(--accent-primary)] hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)] text-[var(--text-main)] focus:border-[var(--accent-primary)]/50 focus:ring-2 focus:ring-[var(--accent-primary)]/20 outline-none transition-all placeholder:text-[var(--text-muted)]/50 font-medium"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[var(--accent-primary)] text-[var(--surface)] py-4 rounded-xl font-medium mt-4 shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--text-muted)] font-medium">
            Don't have an account? <Link to="/" className="text-[var(--accent-primary)] font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}