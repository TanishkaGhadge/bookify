import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    setError(null);
    
    try {
      await signup(fullName, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-4xl md:text-5xl font-bold font-heading text-[#4B2E1F] mb-10 text-center border-b-2 border-[#C8A45A]/30 pb-4 inline-block w-full">Create Account</h2>
      
      {error && (
        <div className="mb-8 p-5 bg-red-50 border-2 border-red-200 text-red-600 text-lg rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      <div className="px-6 md:px-10">
        <form onSubmit={handleSignup} className="space-y-12">
          <div className="space-y-2">
            <label className="block text-lg font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent border-b-4 border-[#D5C5AC] focus:border-[#C8A45A] py-3 outline-none text-[#4B2E1F] text-2xl font-medium transition-colors placeholder:text-[#B8A384] placeholder:font-serif italic"
              placeholder="Jane Austen"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-4 border-[#D5C5AC] focus:border-[#C8A45A] py-3 outline-none text-[#4B2E1F] text-2xl font-medium transition-colors placeholder:text-[#B8A384] placeholder:font-serif italic"
              placeholder="author@example.com"
            />
          </div>
          
          <div className="space-y-2 relative">
            <label className="block text-lg font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-4 border-[#D5C5AC] focus:border-[#C8A45A] py-3 pr-14 outline-none text-[#4B2E1F] text-2xl font-medium transition-colors"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#B8A384] hover:text-[#6B4A35] p-3"
              >
                {showPassword ? <EyeOff size={28} /> : <Eye size={28} />}
              </button>
            </div>
          </div>

          <div className="space-y-2 relative">
            <label className="block text-lg font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border-b-4 border-[#D5C5AC] focus:border-[#C8A45A] py-3 outline-none text-[#4B2E1F] text-2xl font-medium transition-colors"
            />
          </div>

          <div className="pt-4">
            <label className="flex items-start gap-4 cursor-pointer text-[#6B4A35] text-lg hover:text-[#4B2E1F] leading-tight">
              <input type="checkbox" required className="mt-1 w-6 h-6 rounded border-[#D5C5AC] text-[#C8A45A] focus:ring-[#C8A45A] bg-transparent" />
              <span>I agree to the <span className="font-serif italic border-b-2 border-[#D5C5AC]">Terms</span> & <span className="font-serif italic border-b-2 border-[#D5C5AC]">Privacy Policy</span></span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#4B2E1F] hover:bg-[#3A2216] text-[#F9F3E8] font-bold text-2xl py-5 rounded-2xl shadow-[0_8px_30px_rgba(75,46,31,0.4)] hover:shadow-[0_12px_40px_rgba(75,46,31,0.6)] hover:-translate-y-1 transition-all duration-300 mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          >
            {loading && <Loader2 size={24} className="animate-spin" />}
            Join the Library
          </button>
        </form>

        <p className="text-center mt-10 text-[#6B4A35] font-medium text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-[#4B2E1F] font-bold border-b-2 border-[#C8A45A] pb-1 hover:text-[#C8A45A] transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
