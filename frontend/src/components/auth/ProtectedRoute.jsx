import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[var(--text-muted)] font-serif italic">Loading library...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login book while saving the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
