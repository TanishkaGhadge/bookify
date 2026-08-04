import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import AuthPages from "./AuthPages";

export default function AuthBook() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("login");

  useEffect(() => {
    // Map URL to active page
    const path = location.pathname.replace("/", "");
    setActivePage(path || "login");
    
    // Smooth cinematic opening delay
    const timer = setTimeout(() => setIsOpen(true), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const closeBook = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate("/");
    }, 1200); // Wait for the book to physically close before unmounting
  };

  return (
    <div className="absolute inset-0 w-full h-[100dvh] flex items-center justify-center [perspective:2500px] overflow-hidden z-[100]">
      
      {/* Background Dimming & Vignette */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-[4px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)'
        }}
      ></motion.div>

      {/* Floating Dust Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-40">
        {/* We can simulate dust with small absolute divs animated, but for simplicity a background noise or image works */}
        <div className="w-full h-full bg-[url('/images/dust.png')] opacity-20 animate-pulse mix-blend-screen"></div>
      </div>

      {/* The 3D Book */}
      <motion.div 
        initial={{ y: "30vh", scale: 0.7, opacity: 0, rotateX: 30 }}
        animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ y: "30vh", scale: 0.7, opacity: 0, rotateX: 30 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[95vw] max-w-[1400px] aspect-[16/10] max-h-[90vh] [transform-style:preserve-3d] flex justify-center items-center z-10"
      >
        
        {/* Right Half: Back Cover & Right Page (Static Base) */}
        <div className="absolute right-0 w-1/2 h-full bg-[#3D2517] rounded-r-2xl border-[3px] border-[#2A170C] shadow-[30px_30px_60px_rgba(0,0,0,0.6),inset_-10px_0_20px_rgba(0,0,0,0.4)] [transform-style:preserve-3d]">
          {/* Inner Leather / Cover thickness */}
          <div className="absolute inset-0 rounded-r-2xl" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #2A170C 120%)' }}></div>
          
          {/* Paper Stack Edge */}
          <div className="absolute left-0 w-[97%] h-[97%] top-[1.5%] bg-[#D5C5AC] rounded-r-xl shadow-inner border-y border-r border-[#B8A384]" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }}></div>
          
          {/* Top Right Page (Login Form side) */}
          <div className="absolute left-0 w-[95%] h-[95%] top-[2.5%] bg-[#F9F3E8] rounded-r-xl shadow-[-10px_0_20px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
            {/* Inner Spine Shadow */}
            <div className="absolute left-0 w-12 h-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-50"></div>
            
            {/* The actual right page content */}
            <div className="w-full h-full pt-16 pb-12 pl-16 pr-12 overflow-y-auto custom-scrollbar relative z-10" style={{ backgroundImage: 'radial-gradient(circle, transparent 50%, rgba(200, 164, 90, 0.05) 150%)' }}>
              <AuthPages side="right" activePage={activePage} />
            </div>
          </div>
        </div>

        {/* Left Half: Front Cover & Left Page (Animated Hinged) */}
        <motion.div
          animate={{ 
            rotateY: isOpen ? -180 : 0, 
            z: isOpen ? 1 : 15 
          }}
          transition={{ duration: 1.8, ease: [0.25, 1, 0.3, 1], delay: 0.2 }}
          className="absolute right-0 w-1/2 h-full origin-left [transform-style:preserve-3d] z-30 shadow-[10px_10px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Outside of Front Cover */}
          <div 
            className="absolute inset-0 w-full h-full bg-[#4B2E1F] rounded-r-2xl border-[3px] border-[#2A170C] flex flex-col items-center justify-center shadow-[inset_10px_0_30px_rgba(0,0,0,0.6)]"
            style={{ backfaceVisibility: 'hidden', backgroundImage: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.5) 120%)' }}
          >
            {/* Gold Embossed Frame */}
            <div className="w-[85%] h-[92%] border-2 border-[#C8A45A]/70 rounded-xl relative flex items-center justify-center">
              <div className="absolute inset-2 border border-[#C8A45A]/30 rounded-lg"></div>
              
              <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-[#C8A45A] rounded-[24px] p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center border-2 border-[#FFE8B3]">
                  <img src="/logo.png" alt="Bookify" className="w-full h-full object-cover rounded-[18px]" style={{ filter: "brightness(0) sepia(1) hue-rotate(330deg) saturate(3) brightness(0.5) contrast(2)"}} />
                </div>
                <h1 className="text-5xl font-bold font-heading text-[#C8A45A] tracking-[0.2em] uppercase" style={{ textShadow: "1px 2px 4px rgba(0,0,0,0.8)" }}>Bookify</h1>
              </div>
            </div>
          </div>
          
          {/* Inside of Front Cover (Revealed when open) */}
          <div 
            className="absolute inset-0 w-full h-full bg-[#3D2517] rounded-l-2xl border-[3px] border-[#2A170C] flex items-center justify-center shadow-[inset_-10px_0_30px_rgba(0,0,0,0.5)]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', backgroundImage: 'radial-gradient(circle, transparent 20%, #2A170C 120%)' }}
          >
            
            {/* Paper Stack Edge Left */}
            <div className="absolute right-0 w-[97%] h-[97%] top-[1.5%] bg-[#D5C5AC] rounded-l-xl shadow-inner border-y border-l border-[#B8A384]" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }}></div>
            
            {/* Left Page (Art & Welcome side) */}
            <div className="absolute right-0 w-[95%] h-[95%] top-[2.5%] bg-[#F9F3E8] rounded-l-xl shadow-[10px_0_20px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
              {/* Inner Spine Shadow Left */}
              <div className="absolute right-0 w-12 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-50"></div>
              
              <div className="w-full h-full pt-16 pb-12 pl-12 pr-16 relative z-10 opacity-95" style={{ backgroundImage: 'radial-gradient(circle, transparent 50%, rgba(200, 164, 90, 0.05) 150%)' }}>
                <AuthPages side="left" activePage={activePage} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Central Spine Overlay */}
        <div className="absolute left-1/2 -translate-x-1/2 w-8 h-[95%] top-[2.5%] bg-gradient-to-r from-transparent via-black/40 to-transparent z-40 pointer-events-none rounded-full blur-[1px]"></div>

      </motion.div>

      {/* Close Button */}
      <motion.button 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={closeBook}
        className="absolute top-6 right-8 text-white/60 hover:text-white p-3 bg-white/5 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 z-[110] border border-white/10"
      >
        <X size={24} />
      </motion.button>
      
    </div>
  );
}
