import { useEffect, useState } from "react";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";
import { BASE_API_URL } from "../utils/config";

const useGetActeur = (id_acteur) => {
  const [acteur, setActeur] = useState(null);
  const [loading, setLoading] = useState(true);

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
    if (id_acteur) {
      getActeur();
    }
  }, [id_acteur]);

  return { loading, acteur };
};

export default useGetActeur;
