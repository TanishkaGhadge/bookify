import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./styles/global.css";
import { router } from "./router";
import { BookProvider } from "./context/BookContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BookProvider>
        <RouterProvider router={router} />
      </BookProvider>
    </AuthProvider>
  </StrictMode>
);