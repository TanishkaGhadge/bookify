import { Headphones, Book, FastForward } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "Ultra-Realistic Voices",
      desc: "Our AI accurately captures human emotion, pacing, and cadence, making every book an immersive journey.",
      icon: <Headphones className="w-6 h-6 text-[var(--walnut)]" />
    },
    {
      title: "Universal Formats",
      desc: "Seamlessly drop any PDF or EPUB file. We automatically extract and format the text for perfect playback.",
      icon: <Book className="w-6 h-6 text-[var(--walnut)]" />
    },
    {
      title: "Intelligent Playback",
      desc: "Control your listening experience with adjustable speeds, smart chapter detection, and a built-in sleep timer.",
      icon: <FastForward className="w-6 h-6 text-[var(--walnut)]" />
    }
  ];

  return (
    <section className="py-32 px-8 relative z-10 bg-[var(--surface)] border-y border-black/[0.03]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--text)] tracking-tight">
            Designed for <span className="font-serif italic text-[var(--walnut)]">focus.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--text)]/60 max-w-2xl mx-auto font-normal">
            Every detail of Bookify is crafted to provide a calm, uninterrupted reading companion. No distractions, just you and your books.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={i} 
              className="bg-white p-10 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-black/[0.04] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--background)] flex items-center justify-center mb-8 border border-black/5">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--text)] mb-3">{f.title}</h3>
              <p className="text-[var(--text)]/60 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}