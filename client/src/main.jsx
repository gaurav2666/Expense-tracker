import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1e293b",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        },
      }}
    />
  </StrictMode>
);