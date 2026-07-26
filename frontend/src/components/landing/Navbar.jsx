import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#E8DED2]">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.jpg"
            alt="Bookify"
            className="h-12 w-auto"
          />
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10 text-[#5C4033] font-medium">

          <Link
            to="/"
            className="hover:text-[#4F6F52] transition-colors"
          >
            Home
          </Link>

          <Link
            to="/library"
            className="hover:text-[#4F6F52] transition-colors"
          >
            Library
          </Link>

          <Link
            to="/upload"
            className="hover:text-[#4F6F52] transition-colors"
          >
            Upload
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-[#4F6F52] transition-colors"
          >
            Dashboard
          </Link>

        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="flex items-center gap-2 text-[#5C4033] hover:text-[#4F6F52] transition"
          >
            <User size={18} />
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-[#4F6F52] hover:bg-[#3F5A42] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-md"
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
}