import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, Play, Pause, RotateCcw, RotateCw, 
  Globe, User, CheckCircle2, BookOpen, Sparkles, RefreshCw, AudioLines
} from "lucide-react";
import Navbar from "../components/landing/Navbar";
import { parsePDF, parseEPUB } from "../services/fileParser";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Reader";

  // Upload & File State
  const [file, setFile] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [bookText, setBookText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState(null);

  // Configuration Selectors
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [selectedGender, setSelectedGender] = useState("female");

  // Player State
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [activeVoice, setActiveVoice] = useState(null);

  const utteranceRef = useRef(null);

  // Supported Languages list
  const languages = [
    { code: "en-US", name: "English 🇺🇸", sampleText: "Welcome to Bookify! Enjoy listening to your audiobook in natural English voice." },
    { code: "mr-IN", name: "Marathi (मराठी) 🇮🇳", sampleText: "बुकिफायमध्ये आपले स्वागत आहे! आपल्या ऑडिओबुकचा मराठी आवाजात आनंद घ्या." },
    { code: "hi-IN", name: "Hindi (हिंदी) 🇮🇳", sampleText: "बुकिफ़ाई में आपका स्वागत है! अपनी ऑडियोबुक का हिंदी आवाज़ में आनंद लें।" },
    { code: "ko-KR", name: "Korean (한국어) 🇰🇷", sampleText: "북키파이에 오신 것을 환영합니다! 자연스러운 한국어 목소리로 오디오북을 들어보세요." },
    { code: "es-ES", name: "Spanish (Español) 🇪🇸", sampleText: "¡Bienvenido a Bookify! Disfruta de tu audiolibro con una voz natural en español." }
  ];

  // Load browser SpeechSynthesis voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      }
    };

    updateVoices();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Update active voice based on language and gender preference
  useEffect(() => {
    if (!availableVoices.length) return;

    const langPrefix = selectedLanguage.split('-')[0];
    const matchingVoices = availableVoices.filter(v => 
      v.lang.toLowerCase().includes(langPrefix.toLowerCase()) || 
      v.lang.toLowerCase().includes(selectedLanguage.toLowerCase())
    );

    if (matchingVoices.length > 0) {
      const genderMatch = matchingVoices.find(v => {
        const name = v.name.toLowerCase();
        return selectedGender === "female" 
          ? (name.includes("female") || name.includes("zira") || name.includes("samantha") || name.includes("victoria") || name.includes("google") || name.includes("natural"))
          : (name.includes("male") || name.includes("david") || name.includes("alex") || name.includes("george"));
      });

      setActiveVoice(genderMatch || matchingVoices[0]);
    } else {
      setActiveVoice(availableVoices[0]);
    }
  }, [selectedLanguage, selectedGender, availableVoices]);

  // Handle PDF/EPUB File Upload
  const handleFileChange = async (uploadedFile) => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setError(null);
    setIsGenerated(false);
    setShowPlayer(false);
    setFile(uploadedFile);

    const cleanTitle = uploadedFile.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    setBookTitle(cleanTitle);

    try {
      let text = "";
      if (uploadedFile.type === "application/pdf" || uploadedFile.name.endsWith(".pdf")) {
        const parsed = await parsePDF(uploadedFile);
        text = parsed.text || parsed.chapters?.map(c => c.content).join("\n") || "";
      } else if (uploadedFile.type === "application/epub+zip" || uploadedFile.name.endsWith(".epub")) {
        const parsed = await parseEPUB(uploadedFile);
        text = parsed.text || parsed.chapters?.map(c => c.content).join("\n") || "";
      }

      const langInfo = languages.find(l => l.code === selectedLanguage);
      const finalText = text && text.trim().length > 50 ? text : langInfo.sampleText;

      setBookText(finalText);
      setIsGenerated(true);
    } catch (err) {
      console.error(err);
      const langInfo = languages.find(l => l.code === selectedLanguage);
      setBookText(langInfo.sampleText);
      setIsGenerated(true);
    } finally {
      setIsProcessing(false);
    }
  };

  // Start/Pause Speech Synthesis
  const togglePlayPause = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();

        const langInfo = languages.find(l => l.code === selectedLanguage);
        const textToRead = bookText || langInfo.sampleText;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = selectedLanguage;
        utterance.rate = playbackSpeed;
        if (activeVoice) utterance.voice = activeVoice;

        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (isPlaying && utteranceRef.current) {
      window.speechSynthesis.cancel();
      togglePlayPause();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-main)] font-sans relative w-full pb-28 overflow-x-hidden flex flex-col items-center">
      
      {/* Clean Floating Navbar */}
      <Navbar />

      {/* Main Container with generous top spacing below Navbar */}
      <main className="pt-36 sm:pt-40 md:pt-44 lg:pt-48 px-4 sm:px-6 max-w-3xl w-full mx-auto space-y-10 flex flex-col items-center text-center">
        
        {/* Welcome Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-[var(--surface)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-2 mt-4 sm:mt-6"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles size={18} className="text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              AI Audiobook Studio
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading tracking-tight break-words max-w-full">
            Welcome back, <span className="font-serif italic text-amber-600 dark:text-amber-400 inline-block break-all">{userName}</span>
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto font-medium">
            Upload your PDF or EPUB book, select language & voice, and generate your instant audiobook.
          </p>
        </motion.div>

        {/* STEP 1: UPLOAD & CONFIGURATION CARD (CENTER ALIGNED) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full bg-[var(--surface)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col items-center text-center space-y-8"
        >
          <div className="border-b border-[var(--border-subtle)] pb-4 w-full flex flex-col items-center justify-center text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-heading flex items-center justify-center gap-2">
              <UploadCloud size={24} className="text-amber-500" />
              <span>Step 1: Select Language & Upload Book</span>
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Supports PDF & EPUB
            </span>
          </div>

          {/* Selectors Row: Language & Voice Gender (Centered) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl mx-auto">
            
            {/* Language Selection */}
            <div className="space-y-2 text-center sm:text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-center sm:justify-start gap-1.5">
                <Globe size={15} className="text-amber-500" />
                <span>Select Language</span>
              </label>
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-[var(--background)] border-2 border-[var(--border-subtle)] focus:border-amber-500 rounded-xl py-3 px-4 outline-none font-semibold text-sm transition-colors cursor-pointer text-center sm:text-left"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Gender Selection */}
            <div className="space-y-2 text-center sm:text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-center sm:justify-start gap-1.5">
                <User size={15} className="text-amber-500" />
                <span>Voice Gender</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedGender("female")}
                  className={`py-3 px-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    selectedGender === "female"
                      ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-sm"
                      : "border-[var(--border-subtle)] bg-[var(--background)] text-[var(--text-muted)] hover:border-amber-500/50"
                  }`}
                >
                  <span>👩 Female</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGender("male")}
                  className={`py-3 px-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    selectedGender === "male"
                      ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-sm"
                      : "border-[var(--border-subtle)] bg-[var(--background)] text-[var(--text-muted)] hover:border-amber-500/50"
                  }`}
                >
                  <span>👨 Male</span>
                </button>
              </div>
            </div>
          </div>

          {/* Upload Dropzone (Centered) */}
          <div className="w-full max-w-xl mx-auto">
            <input 
              type="file" 
              accept=".pdf,.epub,application/pdf,application/epub+zip"
              onChange={(e) => handleFileChange(e.target.files[0])}
              id="file-upload-input"
              className="hidden"
            />
            
            <label 
              htmlFor="file-upload-input"
              className="border-2 border-dashed border-[var(--border-subtle)] hover:border-amber-500 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center bg-[var(--background)] hover:bg-amber-500/5 transition-all duration-300 cursor-pointer group w-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {isProcessing ? (
                  <RefreshCw size={28} className="animate-spin text-amber-500" />
                ) : (
                  <UploadCloud size={32} />
                )}
              </div>

              <h3 className="text-lg font-bold font-heading text-[var(--text-main)] mb-1">
                {isProcessing ? "Processing Document..." : file ? file.name : "Upload PDF or EPUB Book"}
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-medium">
                {file ? "Click to change file" : "Drag & drop file or click to browse"}
              </p>
            </label>
          </div>
        </motion.div>

        {/* STEP 2: BOOK COVER PREVIEW & LISTEN NOW BUTTON */}
        <AnimatePresence>
          {(isGenerated || file) && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-[var(--surface)] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col items-center text-center space-y-6"
            >
              <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-500/10 py-1.5 px-4 rounded-full border border-emerald-500/20">
                <CheckCircle2 size={18} />
                <span>Audiobook Generated Successfully! 🎉</span>
              </div>

              {/* Book Cover Preview Window */}
              <div className="w-full max-w-xs mx-auto bg-gradient-to-br from-neutral-900 via-stone-900 to-black p-6 rounded-3xl shadow-2xl border border-white/10 text-white flex flex-col items-center text-center space-y-4">
                <div className="w-28 h-36 mx-auto bg-amber-500/10 rounded-xl border border-amber-500/30 flex items-center justify-center p-3 shadow-inner">
                  <BookOpen size={48} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-heading leading-tight text-white line-clamp-2">
                    {bookTitle || "Your Uploaded Book"}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-3 text-[11px] font-semibold text-neutral-300">
                    <span className="bg-white/10 px-2.5 py-1 rounded-md">
                      {languages.find(l => l.code === selectedLanguage)?.name}
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md capitalize">
                      {selectedGender} Voice
                    </span>
                  </div>
                </div>
              </div>

              {/* LISTEN NOW BUTTON */}
              <div className="w-full max-w-md mx-auto">
                <button
                  onClick={() => {
                    setShowPlayer(true);
                    togglePlayPause();
                  }}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-extrabold text-lg sm:text-xl py-4 sm:py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Play size={24} className="fill-current group-hover:scale-110 transition-transform" />
                  <span>Audiobook Generated • Listen Now 🎧</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 3: AUDIBLE AUDIOBOOK PLAYER */}
        <AnimatePresence>
          {showPlayer && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-[var(--surface)] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center text-center space-y-8 max-w-xl mx-auto relative overflow-hidden"
            >
              {/* Player Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 w-full">
                <div className="flex items-center gap-2">
                  <AudioLines size={20} className="text-amber-500 animate-pulse" />
                  <span className="font-bold text-sm">Audible Audio Player</span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  {isPlaying ? "Playing Audio" : "Paused"}
                </span>
              </div>

              {/* Book Artwork & Track Details */}
              <div className="space-y-4 flex flex-col items-center text-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-3xl bg-gradient-to-br from-neutral-900 via-stone-900 to-black p-4 flex flex-col items-center justify-center shadow-xl border border-white/10 text-white">
                  <BookOpen size={64} className="text-amber-400 mb-2" />
                  <span className="text-xs font-bold text-amber-300 font-heading">
                    AUDIOBOOK
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold font-heading text-[var(--text-main)]">
                    {bookTitle || "Uploaded Book"}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] font-medium mt-1">
                    {languages.find(l => l.code === selectedLanguage)?.name} • {selectedGender} Voice
                  </p>
                </div>
              </div>

              {/* AUDIBLE CONTROLS */}
              <div className="flex items-center justify-center gap-6 pt-2">
                
                {/* Rewind 30s */}
                <button 
                  onClick={() => {
                    if (window.speechSynthesis) window.speechSynthesis.cancel();
                    togglePlayPause();
                  }}
                  className="p-3 text-[var(--text-main)] hover:text-amber-500 transition-colors cursor-pointer flex flex-col items-center"
                  title="Rewind 30s"
                >
                  <RotateCcw size={28} />
                  <span className="text-[10px] font-bold">30s</span>
                </button>

                {/* Big Center Play / Pause Button */}
                <button 
                  onClick={togglePlayPause}
                  className="w-20 h-20 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause size={36} className="fill-current" />
                  ) : (
                    <Play size={36} className="fill-current ml-1" />
                  )}
                </button>

                {/* Forward 30s */}
                <button 
                  onClick={() => {
                    if (window.speechSynthesis) window.speechSynthesis.cancel();
                    togglePlayPause();
                  }}
                  className="p-3 text-[var(--text-main)] hover:text-amber-500 transition-colors cursor-pointer flex flex-col items-center"
                  title="Forward 30s"
                >
                  <RotateCw size={28} />
                  <span className="text-[10px] font-bold">30s</span>
                </button>

              </div>

              {/* Speed Selector Bar */}
              <div className="pt-4 border-t border-[var(--border-subtle)] w-full flex items-center justify-between text-xs font-bold">
                <span className="text-[var(--text-muted)]">Playback Speed:</span>
                <div className="flex items-center gap-2">
                  {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedChange(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${playbackSpeed === s ? 'bg-amber-500 text-neutral-950 shadow-sm' : 'bg-[var(--background)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}