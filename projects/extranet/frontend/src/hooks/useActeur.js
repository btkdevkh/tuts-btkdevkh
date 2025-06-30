import { useEffect, useState } from "react";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";
import { BASE_API_URL } from "../utils/config";

const useActeur = (id_acteur = null) => {
  const [acteurs, setActeurs] = useState(null);
  const [acteur, setActeur] = useState(null);
  const [loading, setLoading] = useState(true);

  const getActeurs = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}?api=get_acteurs`, {
        method: "GET",
        credentials: "include", // Httponly
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookieNonHttponly("XSRF-TOKEN"),
        },
      });

      const data = await response.json();

      if (data && data.acteurs && data.acteurs.length > 0) {
        setActeurs(data.acteurs);
      }
    } catch (error) {
      console.log("Error: ", error);
      setActeurs(null);
    } finally {
      setLoading(false);
    }
  };

  const getActeur = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}?api=get_acteur&id=${id_acteur}`,
        {
          method: "GET",
          credentials: "include", // Httponly
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookieNonHttponly("XSRF-TOKEN"),
          },
        }
      );

      const data = await response.json();

      if (data && data.acteur) {
        setActeur(data.acteur);
      }
    } catch (error) {
      console.log("Error: ", error);
      setActeur(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActeurs();

    if (id_acteur) {
      getActeur();
    }
  }, [id_acteur]);

  return { loading, acteurs, acteur };
};

export default useActeur;
