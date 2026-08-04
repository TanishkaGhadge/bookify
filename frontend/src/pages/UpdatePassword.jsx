import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      
      // Check for error in hash (Implicit Flow) or search params (PKCE Flow)
      if (
        (hash && hash.includes("error=unauthorized_client")) ||
        (hash && hash.includes("expired")) ||
        (search && search.includes("error=unauthorized_client")) ||
        (search && search.includes("expired"))
      ) {
        setIsExpired(true);
        setVerifying(false);
        return;
      }

      // Supabase automatically establishes the session from the URL
      // Let's verify if the user is authenticated
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error || !session) {
          // If there's no session and no hash/search params indicating recovery,
          // they might have just landed here without a token, or the token failed to process.
          // Wait for auth state change to confirm (Supabase handles it asynchronously).
        } else {
          setVerifying(false);
        }
      });
    };

    checkHash();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "PASSWORD_RECOVERY" || session) {
          setVerifying(false);
          setIsExpired(false);
        } else if (event === "SIGNED_OUT") {
          // No session
        }
      }
    );

    // Fallback: If after 2 seconds we still haven't verified and there is no session,
    // mark as expired or invalid.
    const timeout = setTimeout(() => {
      setVerifying(false);
    }, 2000);

    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#F9F3E8] flex flex-col items-center justify-center p-6">
        <Loader2 size={48} className="animate-spin text-[#C8A45A] mb-6" />
        <h2 className="text-2xl font-bold font-heading text-[#4B2E1F]">Verifying Magic Link...</h2>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="min-h-screen bg-[#F9F3E8] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 md:p-14 shadow-2xl text-center space-y-8 border border-[#E8DCC4]">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 className="text-3xl font-bold font-heading text-[#4B2E1F]">Link Expired</h2>
          <p className="text-[#6B4A35] font-medium text-lg leading-relaxed">
            This password reset link has expired. Please request a new one.
          </p>
          <div className="pt-4">
            <Link 
              to="/forgot-password" 
              className="inline-block w-full bg-[#4B2E1F] hover:bg-[#3A2216] text-[#F9F3E8] font-bold text-xl py-5 rounded-2xl shadow-[0_8px_30px_rgba(75,46,31,0.4)] hover:shadow-[0_12px_40px_rgba(75,46,31,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              Send New Reset Email
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F3E8] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E8DCC4] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-[#D5C5AC] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-[#C8A45A] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl space-y-8 border border-[#E8DCC4]">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-[#4B2E1F] text-center border-b-2 border-[#C8A45A]/30 pb-6 inline-block w-full">
            Update Password
          </h2>
          
          {error && (
            <div className="p-5 bg-red-50 border-2 border-red-200 text-red-600 text-lg rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="p-5 bg-green-50 border-2 border-green-200 text-green-700 text-lg rounded-xl text-center font-medium">
              Password updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-lg font-serif font-bold text-[#6B4A35] uppercase tracking-wider">New Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-4 border-[#D5C5AC] focus:border-[#C8A45A] py-4 outline-none text-[#4B2E1F] text-2xl font-medium transition-colors placeholder:text-[#B8A384] placeholder:font-serif italic"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-lg font-serif font-bold text-[#6B4A35] uppercase tracking-wider">Confirm Password</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-b-4 border-[#D5C5AC] focus:border-[#C8A45A] py-4 outline-none text-[#4B2E1F] text-2xl font-medium transition-colors placeholder:text-[#B8A384] placeholder:font-serif italic"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading || success}
              className="w-full bg-[#4B2E1F] hover:bg-[#3A2216] text-[#F9F3E8] font-bold text-2xl py-6 rounded-2xl shadow-[0_8px_30px_rgba(75,46,31,0.4)] hover:shadow-[0_12px_40px_rgba(75,46,31,0.6)] hover:-translate-y-1 transition-all duration-300 mt-10 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            >
              {loading && <Loader2 size={24} className="animate-spin" />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
