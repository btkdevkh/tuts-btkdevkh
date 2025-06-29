import Logo from "./Logo";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useAuthContext } from "../contexts/AuthContext";
import { RiAccountCircle2Fill } from "react-icons/ri";

const Navbar = () => {
  const { auth, handleSignout } = useAuthContext();

  return (
    <nav className={`bg-[#fcb9b2] py-3`}>
      <div
        className={`max-w-[1280px] mx-auto ${
          auth ? "flex justify-between" : "flex justify-center"
        }`}
      >
        {/* Pricipal logo */}
        <Logo size={auth ? 100 : 200} />

        {/* Disconnect button */}
        {auth && (
          <div className="flex flex-col justify-center gap-3 items-end pr-3">
            <button
              title="Déconnexion"
              type="button"
              className="cursor-pointer"
              onClick={handleSignout}
            >
              <LiaSignOutAltSolid size={30} color="#ff0000" />
            </button>

            <div className="flex justify-center gap-1 items-center">
              <RiAccountCircle2Fill size={30} />
              <span>
                <b>
                  {auth.nom} {auth.prenom}
                </b>
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
