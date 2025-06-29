import { useEffect, useState } from "react";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";
import { BASE_API_URL } from "../utils/config";

const useActeur = () => {
  const [acteurs, setActeurs] = useState(null);
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

  useEffect(() => {
    getActeurs();
  }, []);

  return { loading, acteurs };
};

export default useActeur;
