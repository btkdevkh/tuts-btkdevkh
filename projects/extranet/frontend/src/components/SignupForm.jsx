import { Link } from "react-router";

const SignupForm = () => {
  return (
    <>
      {/* Login form */}
      <form className="w-110 mx-auto flex flex-col items-center gap-3">
        <h1 className="text-2xl font-[500] mb-2">Inscription</h1>
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
        />
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
        />
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
        />
        <input
          type="text"
          name="password"
          placeholder="Mot de passe"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
        />
        <input
          type="text"
          name="confirmPassword"
          placeholder="Confirmer mot de passe"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
        />

        <select
          name="question"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
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
          name="anwser"
          placeholder="Votre réponse"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
        />

        <div className="w-full flex flex-col gap-3">
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
