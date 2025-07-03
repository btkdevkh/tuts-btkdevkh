import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_API_URL } from "../utils/config";
import { toast } from "react-toastify";

const ForgetPasswordForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [answerToSecretQuestion, setAnswerToSecretQuestion] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !answerToSecretQuestion) {
      return setError("Tous les champs sont obligatoires");
    }

    // Send http request to the server
    const response = await fetch(`${BASE_API_URL}?api=forget_user_password`, {
      method: "POST",
      credentials: "include", // Httponly
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, reponse: answerToSecretQuestion }),
    });

    const data = await response.json();

    if (data && data.success && data.token_csrf && data.id_user) {
      toast.success("On vous a trouvé!", {
        toastId: "forget-password-success",
        position: "top-right",
      });
      setUsername("");
      setAnswerToSecretQuestion("");

      // Redirect to connexion page
      navigate(`/resetPassword/${data.id_user}`);
    } else {
      toast.error(data.message, {
        toastId: "forget-password-failed",
        position: "top-right",
      });
    }
  };

  return (
    <>
      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="w-80 mx-auto flex flex-col items-center gap-3"
      >
        <h1 className="text-2xl font-[500] mb-2">Oublié mot de passe</h1>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          name="answer"
          placeholder="Votre réponse à la question secrète"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={answerToSecretQuestion}
          onChange={(e) => setAnswerToSecretQuestion(e.target.value)}
        />

        <div className="w-full flex flex-col gap-3">
          {error && <span className="text-red-500">{error}</span>}

          <button
            type="submit"
            className="w-full p-2 bg-[#b23a48] text-white text-lg font-[500] cursor-pointer rounded-sm"
          >
            Valider
          </button>

          <div className="flex justify-between">
            <Link to={"/login"} className="text-blue-700 underline">
              S'identifier
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
