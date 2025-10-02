import { useEffect, useState } from "react";
import "./App.css";

const BASE_API_URL = "http://localhost:8000";

function App() {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState<number | null>(null);
  const [posts, setPosts] = useState<{ id: number; postTitle: string }[]>([]);

  const handleDelete = async (idPost: number) => {
    if (!idPost) return;

    // Http request 'PUT'
    const res = await fetch(`${BASE_API_URL}/api/v1/posts/${idPost}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.log("Not ok");
      return;
    }

    const data = await res.json();
    setPosts(data.data);
  };

  const onSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !title) return;

    // Http request 'PUT'
    const res = await fetch(`${BASE_API_URL}/api/v1/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ postTitle: title }),
    });

    if (!res.ok) {
      console.log("Not ok");
      return;
    }

    const data = await res.json();
    setPosts(data.data);
  };

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`${BASE_API_URL}/api/v1/posts`);

      if (!res.ok) {
        console.log("Not ok");
        return;
      }

      const data = await res.json();
      setPosts(data.data);
    };

    getPosts();
  }, []);

  return (
    <>
      <h1>Mini React App + Express API Rest</h1>

      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id}>
            <div>
              {" "}
              id: {post.id}, Titre: {post.postTitle} |{" "}
              <button
                onClick={() => {
                  setEdit(true);
                  setId(post.id);
                }}
              >
                Modifier
              </button>
              <button onClick={() => handleDelete(post.id)}>Supprimer</button>
            </div>

            {edit && post.id === id && (
              <form onSubmit={onSubmitUpdate}>
                <input
                  type="text"
                  name="post-title"
                  placeholder="Titre"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Valider</button>
              </form>
            )}
            <br />
            <br />
          </div>
        ))}
    </>
  );
}

export default App;
