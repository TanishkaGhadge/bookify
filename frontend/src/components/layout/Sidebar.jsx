import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Headphones, 
  Bookmark, 
  Clock, 
  User, 
  LogOut, 
  Crown,
  ChevronRight,
  UploadCloud
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Convert PDF", path: "/upload", icon: UploadCloud },
    { name: "My Library", path: "/library", icon: BookOpen },
    { name: "Audiobooks", path: "/audiobooks", icon: Headphones },
    { name: "Bookmarks", path: "/bookmarks", icon: Bookmark },
    { name: "History", path: "/history", icon: Clock },
    { name: "My Account", path: "/profile", icon: User },
  ];

  return (
    <aside className="w-full h-full flex flex-col bg-[#FBF8F3] py-8 px-5 border-r border-[#EFE8DC] font-sans justify-between relative overflow-hidden">
      <div>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-8 px-2 hover:opacity-85 transition-opacity">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF5EF] border border-[#E6DDD0] shadow-sm">
            <img src="/logo.png" alt="Bookify Logo" className="w-8 h-8 object-contain rounded-lg" onError={(e) => {
              // Fallback open book icon if logo file missing
              e.target.style.display = 'none';
            }} />
          </div>
          <h2 className="text-2xl font-bold text-[#2C1F18] font-serif tracking-tight">
            Bookify
          </h2>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/profile' && location.pathname === '/profile');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive 
                    ? "bg-[#EFE7DC] text-[#2C1F18] font-semibold shadow-xs" 
                    : "text-[#7C6C61] hover:text-[#2C1F18] hover:bg-[#FAF5EF]"
                }`}
              >
                <Icon size={19} className={isActive ? "text-[#594336]" : "text-[#8C7B70]"} strokeWidth={isActive ? 2.3 : 1.8} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Upgrade Card & Sign Out */}
      <div className="mt-8 space-y-6">
        {/* Upgrade Card */}
        <div className="bg-[#382A21] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-[#D9B88F]/20 text-[#D9B88F] flex items-center justify-center mb-3 border border-[#D9B88F]/30">
            <Crown size={18} />
          </div>
          <h3 className="font-serif font-bold text-base text-[#FAF5EF] leading-snug mb-1">
            Enhance Your Reading Experience
          </h3>
          <p className="text-xs text-[#D1C4B8] mb-4 leading-relaxed">
            Unlock powerful features and make the most of Bookify.
          </p>
          <button 
            onClick={() => navigate('/profile')}
            className="w-full py-2.5 px-4 bg-[#D9B88F] hover:bg-[#C8A77E] text-[#382A21] font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Upgrade to Premium</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Sign Out & Footer */}
        <div className="space-y-3 pt-2 border-t border-[#EFE8DC]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#8C7B70] hover:text-[#2C1F18] transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
          
          <div className="px-3 pt-1 flex items-center justify-between text-[11px] text-[#A09082]">
            <p>© 2026 Bookify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

