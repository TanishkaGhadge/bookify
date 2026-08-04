import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function AuthPages({ side, activePage }) {
  
  // Animation variants for page content
  const contentVariants = {
    initial: { opacity: 0, rotateY: 10, filter: "blur(4px)" },
    animate: { opacity: 1, rotateY: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } },
    exit: { opacity: 0, rotateY: -10, filter: "blur(4px)", transition: { duration: 0.4 } }
  };

  if (side === "left") {
    return (
      <div className="w-full h-full flex flex-col justify-between h-full relative p-8">
        <AnimatePresence mode="wait">
          {activePage === "login" && (
            <motion.div key="left-login" variants={contentVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full justify-center items-center text-center">
              <div className="mb-16 flex flex-col items-center">
                <h2 className="text-6xl lg:text-7xl font-bold font-heading text-[#4B2E1F] mb-8 leading-tight">Welcome Back</h2>
                <div className="w-24 h-[4px] bg-[#C8A45A] mb-8"></div>
                <h3 className="text-3xl font-serif text-[#6B4A35] italic mb-10 text-center">"Every page has a voice waiting to be heard."</h3>
                <p className="text-[#6B4A35]/90 text-xl leading-relaxed max-w-md font-medium text-center">
                  Continue your reading journey by transforming your PDFs into beautiful AI-powered audiobooks.
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="mt-auto flex justify-center opacity-40">
                <img src="/logo.png" alt="Decoration" className="w-20 h-20 rounded-xl grayscale opacity-50 sepia mix-blend-multiply" />
              </div>
            </motion.div>
          )}

          {activePage === "signup" && (
            <motion.div key="left-signup" variants={contentVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full justify-center items-center text-center">
              <div className="mb-16 flex flex-col items-center">
                <h2 className="text-6xl lg:text-7xl font-bold font-heading text-[#4B2E1F] mb-8 leading-tight">A New Chapter</h2>
                <div className="w-24 h-[4px] bg-[#C8A45A] mb-8"></div>
                <h3 className="text-3xl font-serif text-[#6B4A35] italic mb-10 text-center">"Your personal library awaits."</h3>
                <p className="text-[#6B4A35]/90 text-xl leading-relaxed max-w-md font-medium text-center">
                  Create an account to save your favorite books, customize voices, and sync your audiobooks across all your devices.
                </p>
              </div>
            </motion.div>
          )}

          {activePage === "forgot-password" && (
            <motion.div key="left-forgot" variants={contentVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full justify-center items-center text-center">
              <div className="mb-16 flex flex-col items-center">
                <h2 className="text-6xl lg:text-7xl font-bold font-heading text-[#4B2E1F] mb-8 leading-tight">Forgot Your Story?</h2>
                <div className="w-24 h-[4px] bg-[#C8A45A] mb-8"></div>
                <h3 className="text-3xl font-serif text-[#6B4A35] italic mb-10 text-center">"Every story deserves another chapter."</h3>
                <p className="text-[#6B4A35]/90 text-xl leading-relaxed max-w-md font-medium text-center">
                  Don't worry. Enter your email and we'll send you a magical link to reset your password and continue your journey.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-8 left-0 w-full text-center">
          <span className="font-serif text-[#C8A45A] text-xl tracking-widest">Page 01</span>
        </div>
      </div>
    );
  }

  // Right Side (Forms)
  return (
    <div className="w-full h-full flex flex-col justify-center h-full relative">
      <AnimatePresence mode="wait">
        {activePage === "login" && (
          <motion.div key="right-login" variants={contentVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-xl mx-auto">
            <LoginForm />
          </motion.div>
        )}
        
        {activePage === "signup" && (
          <motion.div key="right-signup" variants={contentVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-xl mx-auto">
            <SignupForm />
          </motion.div>
        )}

        {activePage === "forgot-password" && (
          <motion.div key="right-forgot" variants={contentVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-xl mx-auto">
            <ForgotPasswordForm />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-8 left-0 w-full text-center">
        <span className="font-serif text-[#C8A45A] text-xl tracking-widest">Page 02</span>
      </div>
    </div>
  );
}
