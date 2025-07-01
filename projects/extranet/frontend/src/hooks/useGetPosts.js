import { useEffect, useState } from "react";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";
import { BASE_API_URL } from "../utils/config";

const useGetPosts = (id_acteur, submit) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}?api=get_posts&id=${id_acteur}`,
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

      if (data && data.posts && data.posts.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPosts(data.posts);
      }
    } catch (error) {
      console.log("Error: ", error);
      setPosts(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!submit || submit) {
      getPosts();
    }
  }, [submit]);

  return { loading, posts, getPosts };
};

export default useGetPosts;
