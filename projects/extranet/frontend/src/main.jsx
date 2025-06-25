import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ForgetPasswordPage from "./pages/ForgetPassword.jsx";
import SignupPage from "./pages/Signup.jsx";
import AboutPage from "./pages/About.jsx";
import LoginPage from "./pages/Login.jsx";
import { ToastContainer, toast } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* Header */}
      <Navbar />

      <main className="max-w-[1280px] mx-auto p-3">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);
