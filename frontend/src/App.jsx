import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Library from "./pages/Library";
import Player from "./pages/Player";
import NotFound from "./pages/NotFound";
import AuthBook from "./components/auth/AuthBook";
import UpdatePassword from "./pages/UpdatePassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page with Auth Overlays */}
        <Route path="/" element={<Landing />}>
          <Route path="login" element={<AuthBook />} />
          <Route path="signup" element={<AuthBook />} />
          <Route path="forgot-password" element={<AuthBook />} />
        </Route>
        
        <Route path="/update-password" element={<UpdatePassword />} />

        {/* Protected/App Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/library" element={<Library />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}