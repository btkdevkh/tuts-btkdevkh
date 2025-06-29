import { createContext, useEffect, useState, use } from "react";
import { useLocation, useNavigate } from "react-router";
import { BASE_API_URL } from "../utils/config";
import { toast } from "react-toastify";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";

const initialStates = {
  auth: null,
  loading: false,
  handleSignout: () => {},
};

const AuthContext = createContext(initialStates);

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_API_URL}?api=get_current_user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCookieNonHttponly("XSRF-TOKEN"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Utilisateur connecté :", data);

        if (data && data.user) {
          setAuth(data.user);
        }
      })
      .catch((err) => {
        console.error("Erreur auth:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  useEffect(() => {
    if (!loading && !auth) {
      return navigate("/login");
    }

    if (auth && PATHNAMES.includes(location.pathname)) {
      return navigate("/");
    }
  }, [auth, loading]);

  const handleSignout = async () => {
    const response = await fetch(`${BASE_API_URL}?api=signout_user`, {
      method: "GET",
      credentials: "include", // Httponly
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCookieNonHttponly("XSRF-TOKEN"),
      },
    });

    const data = await response.json();

    if (data && data.success && data.message) {
      toast.success(data.message, "signup-user-success");
      setAuth(null);
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ auth, loading, handleSignout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuthContext = () => {
  const context = use(AuthContext);

  if (!context.auth && !context.loading) {
    console.log("Auth context mut be used in Auth context provider");
  }

  return context;
};

export { useAuthContext };
export default AuthContextProvider;

// Defined pathnames array
const PATHNAMES = ["/login", "/signup", "/forgetPassword"];
