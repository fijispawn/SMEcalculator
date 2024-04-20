import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import "./index.css";
import "./main.css";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
