import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
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
          <svg className="w-10 h-10 text-[#6B4A35]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-bold font-heading text-[#4B2E1F]">Welcome to the Library</h2>
        <p className="text-[#6B4A35] font-medium max-w-[250px]">
          Please check your email to verify your account and open your first book.
        </p>
        <Link to="/login" className="mt-8 text-[#4B2E1F] font-bold border-b border-[#C8A45A] hover:text-[#C8A45A] transition-colors pb-1">
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold font-heading text-[#4B2E1F] mb-6 text-center border-b border-[#C8A45A]/30 pb-4 inline-block w-full">Create Account</h2>
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-5">
        <div className="space-y-1">
          <label className="block text-[13px] font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Full Name</label>
          <input 
            type="text" 
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-transparent border-b-2 border-[#D5C5AC] focus:border-[#C8A45A] py-1.5 outline-none text-[#4B2E1F] font-medium transition-colors placeholder:text-[#B8A384] placeholder:font-serif italic"
            placeholder="Jane Austen"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[13px] font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b-2 border-[#D5C5AC] focus:border-[#C8A45A] py-1.5 outline-none text-[#4B2E1F] font-medium transition-colors placeholder:text-[#B8A384] placeholder:font-serif italic"
            placeholder="author@example.com"
          />
        </div>
        
        <div className="space-y-1 relative">
          <label className="block text-[13px] font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[#D5C5AC] focus:border-[#C8A45A] py-1.5 pr-10 outline-none text-[#4B2E1F] font-medium transition-colors"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#B8A384] hover:text-[#6B4A35] p-2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-1 relative">
          <label className="block text-[13px] font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Confirm Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent border-b-2 border-[#D5C5AC] focus:border-[#C8A45A] py-1.5 outline-none text-[#4B2E1F] font-medium transition-colors"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer text-[#6B4A35] text-sm hover:text-[#4B2E1F] leading-tight">
            <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-[#D5C5AC] text-[#C8A45A] focus:ring-[#C8A45A] bg-transparent" />
            <span>I agree to the <span className="font-serif italic border-b border-[#D5C5AC]">Terms</span> & <span className="font-serif italic border-b border-[#D5C5AC]">Privacy Policy</span></span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#4B2E1F] hover:bg-[#3A2216] text-[#F9F3E8] font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(75,46,31,0.4)] hover:shadow-[0_6px_20px_rgba(75,46,31,0.6)] hover:-translate-y-0.5 transition-all duration-300 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          Join the Library
        </button>
      </form>

      <p className="text-center mt-6 text-[#6B4A35] font-medium text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-[#4B2E1F] font-bold border-b border-[#C8A45A] pb-0.5 hover:text-[#C8A45A] transition-colors">
          Login
        </Link>
      </p>
    </div>
  );
}
