import {
  createBrowserRouter,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Player from "./pages/Player";
import Profile from "./pages/Profile";
import AuthBook from "./components/auth/AuthBook";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UpdatePassword from "./pages/UpdatePassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        path: "login",
        element: <AuthBook />,
      },
      {
        path: "signup",
        element: <AuthBook />,
      },
      {
        path: "forgot-password",
        element: <AuthBook />,
      },
    ]
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/library",
        element: <Library />,
      },
      {
        path: "/player/:id",
        element: <Player />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ]
  }
]);