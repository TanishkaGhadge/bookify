import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import BentoFeatures from "../components/landing/BentoFeatures";
import { AnimatePresence } from "framer-motion";

export default function Landing() {
  const location = useLocation();
  const isAuthRoute = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <main className="min-h-screen bg-[var(--background)] selection:bg-[var(--accent-primary)] selection:text-black relative">
      <div className={`transition-all duration-700 ease-in-out ${isAuthRoute ? 'blur-sm scale-[0.98] brightness-75 pointer-events-none' : ''}`}>
        <Navbar />
        <Hero />
        <BentoFeatures />
      </div>
      
      {/* Auth Book Overlay Rendered via Router */}
      <AnimatePresence>
        {isAuthRoute && <Outlet />}
      </AnimatePresence>
    </main>
  );
}