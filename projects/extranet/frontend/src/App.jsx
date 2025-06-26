import { useEffect, useState } from "react";
import { BASE_API_URL } from "./utils/config";
import { useNavigate } from "react-router";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_API_URL}?api=get_current_user`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Utilisateur connecté :", data);

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
  }, []);

  useEffect(() => {
    if (!loading && !auth) {
      return navigate("/login");
    }
  }, [auth, loading]);

  return (
    <main className="p-3 flex flex-col gap-7">
      <div className="text-center">{loading && "LOADING..."}</div>

      <h1>
        Bienvenu dans votre espace membre, <b>{auth && auth.prenom}</b>
      </h1>
    </main>
  );
};

export default App;
