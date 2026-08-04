import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-5xl md:text-6xl font-bold font-heading text-[#4B2E1F] mb-12 text-center border-b-2 border-[#C8A45A]/30 pb-6 inline-block w-full">Login</h2>
      
      {error && (
        <div className="mb-8 p-5 bg-red-50 border-2 border-red-200 text-red-600 text-lg rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      <div className="px-6 md:px-10">
        <form onSubmit={handleLogin} className="space-y-14">
          <div className="space-y-4">
            <label className="block text-lg font-serif font-bold text-[#6B4A35] uppercase tracking-wider text-center">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-4 border-[#D5C5AC] focus:border-[#C8A45A] py-4 outline-none text-[#4B2E1F] text-2xl font-medium transition-colors placeholder:text-[#B8A384] placeholder:font-serif italic text-center"
              placeholder="reader@example.com"
            />
          </div>
          
          <div className="space-y-4 relative">
            <label className="block text-lg font-serif font-bold text-[#6B4A35] uppercase tracking-wider text-center">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-4 border-[#D5C5AC] focus:border-[#C8A45A] py-4 pr-14 pl-10 outline-none text-[#4B2E1F] text-2xl font-medium transition-colors text-center"
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

          <div className="flex items-center justify-center gap-8 text-lg pt-6 pb-2">
            <label className="flex items-center gap-3 cursor-pointer text-[#6B4A35] font-medium hover:text-[#4B2E1F]">
              <input type="checkbox" className="w-6 h-6 rounded border-[#D5C5AC] text-[#C8A45A] focus:ring-[#C8A45A] bg-transparent" />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-[#6B4A35] hover:text-[#C8A45A] font-medium transition-colors font-serif italic">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#4B2E1F] hover:bg-[#3A2216] text-[#F9F3E8] font-bold text-2xl py-6 rounded-2xl shadow-[0_8px_30px_rgba(75,46,31,0.4)] hover:shadow-[0_12px_40px_rgba(75,46,31,0.6)] hover:-translate-y-1 transition-all duration-300 mt-10 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          >
            {loading && <Loader2 size={24} className="animate-spin" />}
            Enter Library
          </button>
        </form>

        <div className="mt-14 mb-10 relative flex items-center justify-center">
          <div className="absolute w-full border-t-2 border-[#D5C5AC]"></div>
          <span className="relative bg-[#F9F3E8] px-6 text-[#B8A384] font-serif italic text-xl">Or</span>
        </div>

        <button 
          onClick={handleGoogleLogin}
          type="button"
          className="w-full mt-10 bg-transparent border-4 border-[#D5C5AC] hover:border-[#C8A45A] text-[#6B4A35] font-bold text-2xl py-5 rounded-2xl transition-colors duration-300 flex items-center justify-center gap-4 hover:bg-[#C8A45A]/5"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <p className="text-center mt-14 mb-6 text-[#6B4A35] font-medium text-lg">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#4B2E1F] font-bold border-b-2 border-[#C8A45A] pb-1 hover:text-[#C8A45A] transition-colors">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
