import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, Headphones, Bookmark, Clock, 
  Settings, Bell, Shield, Download, 
  Pencil, Camera, Lock, Trash2, ChevronRight,
  User, Mail, Calendar, ShieldCheck, AudioLines,
  ChevronDown, Menu, X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar";

export default function Profile() {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fullName = user?.user_metadata?.full_name || "Tanishka Ghadge";
  const email = user?.email || "tanishkaghadge94@gmail.com";
  
  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] flex overflow-hidden font-sans text-[#2C1F18]">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#2C1F18]/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className={`fixed lg:static inset-y-0 left-0 w-[270px] z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-6 right-4 p-2 text-[#7C6C61]"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative bg-[#FBF8F3]">
        {/* Mobile Header Bar */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#FBF8F3] sticky top-0 z-30 border-b border-[#EFE8DC]">
          <h2 className="text-xl font-bold text-[#2C1F18] font-serif">Bookify</h2>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-[#2C1F18]">
            <Menu size={24} />
          </button>
        </div>

        <div className="max-w-[1360px] mx-auto px-6 py-8 md:px-10 md:py-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            
            {/* Top Navigation & Profile Badge Bar */}
            <div className="flex justify-end items-center gap-4">
              <button className="relative w-10 h-10 rounded-full bg-white border border-[#EFE8DC] shadow-xs flex items-center justify-center text-[#7C6C61] hover:text-[#2C1F18] transition-colors cursor-pointer">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#594336] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-[#EFE8DC] shadow-xs cursor-pointer hover:bg-[#FAF8F5] transition-colors">
                <div className="w-7 h-7 rounded-full bg-[#594336] text-white text-xs font-bold font-serif flex items-center justify-center">
                  {initials}
                </div>
                <span className="text-xs font-semibold text-[#2C1F18]">{fullName}</span>
                <ChevronDown size={14} className="text-[#8C7B70]" />
              </div>
            </div>

            {/* Header Banner Section with Book Stack Illustration */}
            <motion.div variants={itemVariants} className="relative bg-[#F7F2EB] rounded-3xl p-8 md:p-10 border border-[#EBE3D7] overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
              <div className="z-10 max-w-xl">
                <p className="text-sm font-medium text-[#7C6C61] tracking-wide mb-1">Welcome back,</p>
                <h1 className="text-4xl md:text-5xl font-bold text-[#2C1F18] font-serif tracking-tight leading-tight">
                  {fullName}
                </h1>
                <p className="text-sm md:text-base text-[#7C6C61] mt-1.5">
                  Manage your account and preferences
                </p>
                <div className="w-12 h-1 bg-[#C8A97E] rounded-full mt-4" />
              </div>

              {/* Decorative Book Stack Illustration */}
              <div className="relative md:absolute right-0 top-0 bottom-0 w-full md:w-[420px] h-48 md:h-full opacity-90 pointer-events-none flex items-center justify-end overflow-hidden">
                <img 
                  src="/images/header_books.png" 
                  alt="Aesthetic Bookshelf Banner" 
                  className="w-full h-full object-cover object-right filter drop-shadow-md rounded-r-3xl" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>

            {/* Top 4 Stat Metric Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { 
                  icon: BookOpen, 
                  value: "12", 
                  title: "Books Converted", 
                  desc: "Total books to audiobooks" 
                },
                { 
                  icon: Headphones, 
                  value: "48h", 
                  title: "Listening Time", 
                  desc: "Total time spent listening" 
                },
                { 
                  icon: AudioLines, 
                  value: "8", 
                  title: "Audiobooks", 
                  desc: "In your library" 
                },
                { 
                  icon: Bookmark, 
                  value: "24", 
                  title: "Bookmarks", 
                  desc: "Saved across books" 
                }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="bg-white p-5 rounded-2xl border border-[#EFE8DC] shadow-[0_2px_12px_rgba(44,31,24,0.03)] flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FAF5EF] text-[#594336] flex items-center justify-center shrink-0 border border-[#EFE8DC]">
                    <stat.icon size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-serif text-[#2C1F18] leading-tight mb-0.5">
                      {stat.value}
                    </div>
                    <p className="text-xs font-bold text-[#2C1F18]">{stat.title}</p>
                    <p className="text-[11px] text-[#8C7B70]">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Main Content 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Account Info & Settings) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Account Information Card */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 md:p-8 border border-[#EFE8DC] shadow-[0_2px_12px_rgba(44,31,24,0.03)]">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5EFE6]">
                    <h2 className="text-xl font-serif font-bold text-[#2C1F18]">
                      Account Information
                    </h2>
                    <button className="px-3.5 py-1.5 rounded-xl border border-[#E6DDD0] text-[#594336] text-xs font-semibold hover:bg-[#FAF5EF] flex items-center gap-1.5 transition-colors cursor-pointer">
                      <Pencil size={13} />
                      <span>Edit Profile</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Avatar with Camera badge */}
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 rounded-full bg-[#594336] text-white text-3xl font-serif font-bold flex items-center justify-center shadow-md">
                        {initials}
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-[#E6DDD0] text-[#594336] flex items-center justify-center shadow-xs hover:bg-[#FAF5EF] transition-colors cursor-pointer">
                        <Camera size={15} />
                      </button>
                    </div>

                    {/* Details Rows */}
                    <div className="w-full space-y-3.5 text-xs sm:text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-[#FAF5EF]">
                        <div className="flex items-center gap-2.5 text-[#7C6C61]">
                          <User size={16} className="text-[#8C7B70]" />
                          <span>Full Name</span>
                        </div>
                        <span className="font-semibold text-[#2C1F18]">{fullName}</span>
                      </div>

                      <div className="flex items-center justify-between py-2 border-b border-[#FAF5EF]">
                        <div className="flex items-center gap-2.5 text-[#7C6C61]">
                          <Mail size={16} className="text-[#8C7B70]" />
                          <span>Email Address</span>
                        </div>
                        <span className="font-semibold text-[#2C1F18]">{email}</span>
                      </div>

                      <div className="flex items-center justify-between py-2 border-b border-[#FAF5EF]">
                        <div className="flex items-center gap-2.5 text-[#7C6C61]">
                          <Calendar size={16} className="text-[#8C7B70]" />
                          <span>Member Since</span>
                        </div>
                        <span className="font-semibold text-[#2C1F18]">January 1, 2026</span>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2.5 text-[#7C6C61]">
                          <ShieldCheck size={16} className="text-[#8C7B70]" />
                          <span>Account Status</span>
                        </div>
                        <span className="px-3 py-0.5 rounded-full bg-[#EAF6ED] text-[#2E7D32] text-xs font-semibold">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Account Settings Card */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 md:p-8 border border-[#EFE8DC] shadow-[0_2px_12px_rgba(44,31,24,0.03)] space-y-5">
                  <h2 className="text-xl font-serif font-bold text-[#2C1F18] flex items-center gap-2">
                    <Settings size={20} className="text-[#594336]" />
                    <span>Account Settings</span>
                  </h2>

                  <div className="space-y-3">
                    {[
                      { 
                        icon: Lock, 
                        title: "Change Password", 
                        desc: "Update your password to keep your account secure." 
                      },
                      { 
                        icon: Bell, 
                        title: "Notification Preferences", 
                        desc: "Manage your email and in-app notification settings." 
                      },
                      { 
                        icon: Shield, 
                        title: "Privacy Settings", 
                        desc: "Control your privacy and data preferences." 
                      },
                      { 
                        icon: Download, 
                        title: "Export Data", 
                        desc: "Download a copy of your data and activity." 
                      }
                    ].map((setting, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-4 rounded-xl border border-[#F5EFE6] bg-[#FAF8F5] hover:bg-[#F3EDE2] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-lg bg-white border border-[#E6DDD0] text-[#594336] flex items-center justify-center group-hover:scale-105 transition-transform">
                            <setting.icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#2C1F18]">{setting.title}</p>
                            <p className="text-xs text-[#8C7B70]">{setting.desc}</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-[#8C7B70] group-hover:text-[#2C1F18] transition-colors" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column (Account Overview & Danger Zone) */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Account Overview Card */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 md:p-8 border border-[#EFE8DC] shadow-[0_2px_12px_rgba(44,31,24,0.03)] relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#2C1F18] flex items-center gap-2 mb-2">
                      <BookOpen size={20} className="text-[#594336]" />
                      <span>Account Overview</span>
                    </h2>
                    <p className="text-xs text-[#8C7B70] leading-relaxed mb-6">
                      Here's a quick overview of your activity on Bookify. Keep exploring and listening to more books!
                    </p>

                    <div className="space-y-3.5">
                      {[
                        { icon: BookOpen, label: "Total Books Converted", val: "12" },
                        { icon: Headphones, label: "Total Listening Time", val: "48h" },
                        { icon: AudioLines, label: "Audiobooks in Library", val: "8" },
                        { icon: Bookmark, label: "Total Bookmarks", val: "24" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-[#FAF5EF]">
                          <div className="flex items-center gap-2.5 text-[#7C6C61]">
                            <item.icon size={15} className="text-[#8C7B70]" />
                            <span>{item.label}</span>
                          </div>
                          <span className="font-bold text-[#2C1F18] font-serif text-sm">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Open Books Decorative Image */}
                  <div className="mt-6 pt-4 flex justify-end">
                    <img 
                      src="/images/account_overview_books.png" 
                      alt="Open Books Illustration" 
                      className="w-44 h-auto object-contain opacity-90 filter drop-shadow-xs"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </motion.div>

                {/* Danger Zone Card */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-[#FCE8E6] shadow-[0_2px_12px_rgba(185,28,28,0.03)] space-y-4">
                  <h2 className="text-lg font-serif font-bold text-[#B91C1C] flex items-center gap-2">
                    <Shield size={18} className="text-[#B91C1C]" />
                    <span>Danger Zone</span>
                  </h2>

                  <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#FEE2E2]/60 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#FCA5A5]/40 text-[#991B1B] flex items-center justify-center">
                        <Trash2 size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#991B1B]">Delete Account</p>
                        <p className="text-xs text-[#B91C1C]/80">Permanently delete your account and all data.</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[#B91C1C] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.div>

              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}
