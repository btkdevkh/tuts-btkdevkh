import { useState } from "react";
import { BASE_API_URL } from "../utils/config";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ResetPasswordForm = ({ id_user }) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmNewPassword) {
      return setError("Tous les champs sont obligatoires");
    }

    if (newPassword !== confirmNewPassword) {
      return setError("Nouveau mot de passe doivent être identiques");
    }

    // Send http request to the server
    const response = await fetch(`${BASE_API_URL}?api=reset_user_password`, {
      method: "PUT",
      credentials: "include", // Httponly
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCookieNonHttponly("XSRF-TOKEN"),
      },
      body: JSON.stringify({ id_user, newPassword }),
    });

    const data = await response.json();

    if (data && data.success) {
      toast.success(data.message, {
        toastId: "reset-password-success",
        position: "top-right",
      });
      setNewPassword("");
      setConfirmNewPassword("");

      // Redirect to member page
      navigate("/");
    } else {
      toast.error(data.message, {
        toastId: "reset-password-failed",
        position: "top-right",
      });
    }
  };

  return (
    <>
      <br />
      <br />
      <br />

      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-110 sm:w-85 md:w-full mx-auto flex flex-col items-center gap-3"
      >
        <h1 className="text-2xl font-[500] mb-2">
          Réinitaliser le mot de passe
        </h1>

        <input
          type="password"
          name="password"
          placeholder="Nouveau mot de passe"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer nouveau mot de passe"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />

        <div className="w-full flex flex-col gap-3">
          {error && <span className="text-red-500">{error}</span>}

          <button
            type="submit"
            className="w-full p-2 bg-[#b23a48] text-white text-lg font-[500] cursor-pointer rounded-sm"
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
