import { useState } from "react";
import { useNavigate } from "react-router";
import BackButton from "../components/BackButton";
import { useAuthContext } from "../contexts/AuthContext";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";
import { BASE_API_URL } from "../utils/config";
import { toast } from "react-toastify";

const UserSettingsForm = () => {
  const navigate = useNavigate();
  const { auth } = useAuthContext();

  const [username, setUsername] = useState(auth ? auth.username : "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [question, setQuestion] = useState(auth ? auth.question : "");
  const [answer, setAnswer] = useState(auth ? auth.reponse : "");
  const [error, setError] = useState("");

  const resetState = () => {
    setUsername("");
    setNewPassword("");
    setConfirmNewPassword("");
    setQuestion("Q_01");
    setAnswer("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username) {
      return setError("Nom d'utilisateur est obligatoire");
    }

    if (!answer) {
      return setError("La réponse est obligatoire");
    }

    if (
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      return setError("Nouveau mot de passe doivent être identiques");
    }

    const updateAccount = {
      id_user: auth.id_user ?? null,
      username,
      newPassword,
      question,
      reponse: answer,
    };

    // Send http request to the server
    const response = await fetch(`${BASE_API_URL}?api=update_user`, {
      method: "PUT",
      credentials: "include", // Httponly
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCookieNonHttponly("XSRF-TOKEN"),
      },
      body: JSON.stringify(updateAccount),
    });

    const data = await response.json();

    if (data && data.success && data.message) {
      if (data.message.includes("Duplicate")) {
        return setError("Le nom d'utilisateur existe déja!");
      }

      toast.success(data.message, {
        toastId: "update-user-success",
        position: "top-right",
      });
      resetState();

      // Redirect to connexion page
      navigate("/");
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
        <h1 className="text-2xl font-[500] mb-2">Mes informations</h1>

        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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

        <select
          name="question"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        >
          <option disabled>Choissisez votre question préférée</option>

          <option value="Q_01">
            Quel est le nom de votre premier animal ?
          </option>
          <option value="Q_02">
            Quel est le nom de votre école primaire ?
          </option>
          <option value="Q_03">
            Quelle est la ville de naissance de votre mère ?
          </option>
        </select>

        <input
          type="text"
          name="answer"
          placeholder="Votre réponse"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <div className="w-full flex flex-col gap-3">
          {error && <span className="text-red-500">{error}</span>}

          <button
            type="submit"
            className="w-full p-2 bg-[#b23a48] text-white text-lg font-[500] cursor-pointer rounded-sm"
          >
            Mettre à jour
          </button>

          <br />

          <div>
            <BackButton />
          </div>
        </div>
      </form>
    </>
  );
};

export default UserSettingsForm;
