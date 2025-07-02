import { useEffect, useState } from "react";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";
import { BASE_API_URL } from "../utils/config";

const useGetLikes = (id_acteur, submit) => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLikes = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}?api=get_likes&id_acteur=${id_acteur}`,
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

      if (data && data.count > 0) {
        return setCount(data.count);
      }

      setCount(null);
    } catch (error) {
      console.log("Error: ", error);
      setCount(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!submit || submit) {
      getLikes();
    }
  }, [submit]);

  return { loading, count };
};

export default useGetLikes;
