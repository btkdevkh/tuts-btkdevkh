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
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import ActeurPage from "./pages/Acteur.jsx";
import UserSettingsPage from "./pages/UserSettings.jsx";
import ResetPasswordPage from "./pages/ResetPassword.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        {/* Header */}
        <Navbar />

        <main className="min-h-screen max-w-[1280px] mx-auto p-3">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/acteur/:id" element={<ActeurPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
            <Route path="/resetPassword/:id" element={<ResetPasswordPage />} />
            <Route path="/userSettings" element={<UserSettingsPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
