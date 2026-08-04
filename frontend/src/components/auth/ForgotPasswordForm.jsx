import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 bg-[#C8A45A]/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-[#6B4A35]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </div>
        <h2 className="text-3xl font-bold font-heading text-[#4B2E1F]">Owl Dispatched</h2>
        <p className="text-[#6B4A35] font-medium max-w-[250px]">
          We've sent a magic link to your email to help you recover your story.
        </p>
        <Link to="/login" className="mt-8 text-[#4B2E1F] font-bold border-b border-[#C8A45A] hover:text-[#C8A45A] transition-colors pb-1">
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-4xl md:text-5xl font-bold font-heading text-[#4B2E1F] mb-12 text-center border-b-2 border-[#C8A45A]/30 pb-6 inline-block w-full">Reset Password</h2>
      
      {error && (
        <div className="mb-8 p-5 bg-red-50 border-2 border-red-200 text-red-600 text-lg rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      <div className="px-6 md:px-10">
        <form onSubmit={handleReset} className="space-y-10">
          <div className="space-y-3">
            <label className="block text-lg font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-4 border-[#D5C5AC] focus:border-[#C8A45A] py-4 outline-none text-[#4B2E1F] text-2xl font-medium transition-colors placeholder:text-[#B8A384] placeholder:font-serif italic"
              placeholder="reader@example.com"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#4B2E1F] hover:bg-[#3A2216] text-[#F9F3E8] font-bold text-2xl py-6 rounded-2xl shadow-[0_8px_30px_rgba(75,46,31,0.4)] hover:shadow-[0_12px_40px_rgba(75,46,31,0.6)] hover:-translate-y-1 transition-all duration-300 mt-10 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          >
            {loading && <Loader2 size={24} className="animate-spin" />}
            Send Reset Link
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link to="/login" className="text-[#6B4A35] font-serif italic text-xl font-medium hover:text-[#C8A45A] transition-colors flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
