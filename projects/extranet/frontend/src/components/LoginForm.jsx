import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../utils/config";

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetState = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      return setError("Tous les champs doivent être renseignés");
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    // Send http request to the server
    const response = await fetch(`${BASE_API_URL}?api=login_user`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await response.json();

    if (data && data.message && data.token_csrf) {
      if (data.message.includes("Identifiants")) {
        return setError(data.message);
      }

      toast.success(data.message, {
        toastId: "login-user-success",
        position: "top-right",
      });
      resetState();

      // Redirect to connexion page
      navigate("/");
    }
  };

  return (
    <>
      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="w-80 mx-auto flex flex-col items-center gap-3"
      >
        <h1 className="text-2xl font-[500] mb-2">Connexion</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full flex flex-col gap-3">
          {error && <span className="text-red-500">{error}</span>}

          <button
            type="submit"
            className="w-full p-2 bg-[#b23a48] text-white text-lg font-[500] cursor-pointer rounded-sm"
          >
            Se connecter
          </button>

          <div className="flex justify-between">
            <Link to={"/forgetPassword"} className="text-blue-700 underline">
              Mot de passe oublié?
            </Link>

            <Link to={"/signup"} className="text-blue-700 underline">
              S'inscrire
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
