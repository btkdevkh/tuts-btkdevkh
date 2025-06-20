import { Link } from "react-router";

const ForgetPasswordForm = () => {
  return (
    <>
      {/* Login form */}
      <form className="w-80 mx-auto flex flex-col items-center gap-3">
        <h1 className="text-2xl font-[500] mb-2">Oublié mot de passe</h1>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
        />

        <input
          type="text"
          name="answer"
          placeholder="Votre réponse à la question secrète"
          className="w-full p-2 bg-white focus:outline-gray-200 rounded-sm"
        />

        <div className="w-full flex flex-col gap-3">
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
