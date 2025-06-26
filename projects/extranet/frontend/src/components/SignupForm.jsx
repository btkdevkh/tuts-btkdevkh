import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../utils/config";

const SignupForm = () => {
  const navigate = useNavigate();

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [question, setQuestion] = useState("Q_01");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const resetState = () => {
    setLastname("");
    setFirstname("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setQuestion("Q_01");
    setAnswer("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !firstname ||
      !lastname ||
      !username ||
      !password ||
      !confirmPassword ||
      !answer
    ) {
      return setError("Tous les champs doivent être renseignés");
    }

    if (password !== confirmPassword) {
      return setError("Mot de passe doivent être identiques");
    }

    const newAccount = {
      nom: lastname,
      prenom: firstname,
      username,
      password,
      question,
      reponse: answer,
    };

    // Send http request to the server
    const response = await fetch(`${BASE_API_URL}?api=add_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    });

    const data = await response.json();

    if (data && data.message) {
      if (data.message.includes("Duplicate")) {
        return setError("Le nom d'utilisateur existe déja!");
      }

      toast.success(data.message, {
        toastId: "create-user-success",
        position: "top-right",
      });
      resetState();

      // Redirect to connexion page
      navigate("/login");
    }
  };

  return (
    <>
      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="w-110 mx-auto flex flex-col items-center gap-3"
      >
        <h1 className="text-2xl font-[500] mb-2">Inscription</h1>
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
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
          placeholder="Mot de passe"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer mot de passe"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <select
          name="question"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        >
          <option disabled>Choissisez votre question préférée</option>

          <option value="Q_01">
            Quel est le nom de votre premier animal de compagnie ?
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
            S'inscrire
          </button>

          <div className="flex justify-between">
            <Link to={"/login"} className="text-blue-700 underline">
              Déja membre?
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
