import { useState } from "react";
import { BASE_API_URL } from "../utils/config";
import { toast } from "react-toastify";
import getCookieNonHttponly from "../utils/getCookieNonHttponly";

const CommentForm = ({ id_acteur, id_user, setShow, setSubmit }) => {
  const [error, setError] = useState("");
  const [post, setPost] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmit(true);

    if (!post) {
      return setError("Champ obligatoire");
    }

    // Send http request
    const response = await fetch(`${BASE_API_URL}?api=add_comment`, {
      method: "POST",
      credentials: "include", // Httponly
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCookieNonHttponly("XSRF-TOKEN"),
      },
      body: JSON.stringify({ id_acteur, id_user, post }),
    });

    const data = await response.json();

    if (data && data.message) {
      toast.success(data.message, {
        toastId: "create-post-success",
        position: "top-right",
      });

      setPost("");
      setShow(false);
      setSubmit(false);
    }
  };

  return (
    <>
      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-100 w-full mx-auto flex flex-col items-center gap-3 bg-[#ddd] p-5 rounded-xl"
      >
        <h1 className="text-2xl font-[500] mb-2">Écrire un commentaire</h1>

        <div className="w-full flex flex-col gap-3">
          <textarea
            className="w-full bg-white p-2"
            rows={5}
            placeholder="Commentaire..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
          ></textarea>
          {error && <span className="text-red-500">{error}</span>}

          <button
            type="submit"
            className="w-full p-2 bg-[#b23a48] text-white text-lg font-[500] cursor-pointer rounded-sm"
          >
            Poster ce commentaire
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentForm;
