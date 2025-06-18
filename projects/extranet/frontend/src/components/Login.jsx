import { Link } from "react-router";

const Login = () => {
  return (
    <>
      {/* Login form */}
      <form className="w-80 mx-auto flex flex-col items-center gap-3">
        <h1 className="text-2xl font-[500] mb-2">Connexion</h1>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 bg-white focus:outline-gray-200"
        />

        <input
          type="text"
          name="password"
          placeholder="Mot de passe"
          className="w-full p-2 bg-white focus:outline-gray-200"
        />

        <div className="w-full flex flex-col gap-3">
          <button
            type="submit"
            className="w-full p-2 bg-[#b23a48] text-white text-lg font-[500] cursor-pointer"
          >
            Se connecter
          </button>

          <div className="flex justify-between">
            <Link to={"/forgetPassword"} className="text-blue-700 underline">
              Mot de pass oublié?
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

export default Login;
