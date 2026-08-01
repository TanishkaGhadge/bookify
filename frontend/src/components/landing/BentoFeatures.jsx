import { motion } from "framer-motion";
import { Languages, AudioWaveform, Zap, Layers } from "lucide-react";

export default function BentoFeatures() {
  const features = [
    {
      title: "Customise Audio & Language",
      desc: "Choose from dozens of ultra-realistic AI voices. Support for over 30+ languages, automatically translated and narrated.",
      icon: <Languages className="w-8 h-8 text-[var(--accent-primary)]" />,
      delay: 0,
      duration: 6
    },
    {
      title: "Instant Extraction",
      desc: "Drop a 500-page PDF and start listening in seconds.",
      icon: <Zap className="w-8 h-8 text-[var(--accent-secondary)]" />,
      delay: 1,
      duration: 7
    },
    {
      title: "Cross-Device Sync",
      desc: "Your library travels with you. Pick up where you left off on any device.",
      icon: <Layers className="w-8 h-8 text-[var(--accent-primary)]" />,
      delay: 2,
      duration: 8
    },
    {
      title: "Intelligent Playback",
      desc: "Adjust speed, skip silence, and let our smart chapter detection guide you through the book seamlessly.",
      icon: <AudioWaveform className="w-8 h-8 text-[var(--accent-secondary)]" />,
      delay: 1.5,
      duration: 6.5
    }
  ];

  return (
    <section className="py-32 px-6 bg-[var(--background)] flex flex-col items-center w-full relative z-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center w-full flex flex-col items-center pb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-main)] mb-6 text-center"
          >
            Everything you need.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-muted)] font-medium max-w-xl mx-auto text-center text-lg md:text-xl"
          >
            A premium listening experience crafted for focus and simplicity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-4xl mx-auto relative z-20">
          {features.map((f, i) => (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: f.delay * 0.2 }}
              key={i}
              className="relative group h-full"
            >
              {/* Static Card Wrapper */}
              <div
                className="bg-[var(--accent-primary)]/10 backdrop-blur-md p-8 md:p-10 text-center flex flex-col items-center justify-center rounded-[32px] border border-[var(--accent-primary)]/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glowing)] transition-all duration-300 hover:-translate-y-2 h-full relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-[var(--surface)] border border-[var(--border-subtle)] shadow-inner group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-main)] font-heading relative z-10">
                  {f.title}
                </h3>
                <p className="font-medium text-[var(--text-muted)] max-w-sm text-center relative z-10 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Potted Plants in the Background (Right) */}
      <div className="absolute bottom-0 right-[-10%] md:right-0 z-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative mix-blend-multiply"
        >
          <img 
            src="/images/terracotta_plants.png" 
            alt="Terracotta Potted Plants" 
            className="w-[28rem] md:w-[35rem] lg:w-[45rem] opacity-40 object-contain origin-bottom filter contrast-[1.3] brightness-[1.2]"
          />
        </motion.div>
      </div>

      {/* Floating Leaves in the Background (Left) */}
      <div className="absolute top-[30%] left-[-10%] md:left-[-5%] z-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="relative mix-blend-multiply"
        >
          <img 
            src="/images/real_green_leaves.png" 
            alt="Green Leaves Left" 
            className="w-56 md:w-80 lg:w-[26rem] opacity-50 object-contain filter contrast-[1.3] brightness-[1.2] transform -rotate-12"
          />
        </motion.div>
      </div>
    </section>
  );
}
