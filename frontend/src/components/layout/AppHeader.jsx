import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AppHeader() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="absolute top-0 left-0 w-full p-6 md:px-12 flex items-center justify-between z-50">
      <Link
        to="/dashboard"
        className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-[10px] overflow-hidden shadow-sm border border-[var(--border-subtle)] bg-[var(--surface)]">
          <img src="/logo.png" alt="Bookify Logo" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-main)] tracking-tight font-heading hidden sm:block">
          Bookify
        </h2>
      </Link>

      <div className="flex items-center gap-6">
        <Link 
          to="/profile"
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] font-medium transition-colors"
        >
          <User size={18} />
          <span className="hidden sm:inline">Profile</span>
        </Link>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] font-medium transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
