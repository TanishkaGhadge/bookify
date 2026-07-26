import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Bookshelf from "../components/landing/Bookshelf";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#F7F2EC]">
      <Navbar />
      <Hero />
      <Features />
      <Bookshelf />
      <CTA />
      <Footer />
    </main>
  );
}