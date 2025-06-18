import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import Signup from "./pages/Signup.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* Header */}
      <Navbar />

      <main className="p-3">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
