import { useParams } from "react-router";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { IMAGE_API_URL } from "../utils/config";
import useGetActeur from "../hooks/useGetActeur";
import Modal from "../components/Modal";
import CommentForm from "../components/CommentForm";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import useGetPosts from "../hooks/useGetPosts";

const ActeurPage = () => {
  const [submit, setSubmit] = useState(false);

  const { id: id_acteur } = useParams();
  const { auth } = useAuthContext();
  const { loading: loadingPost, posts } = useGetPosts(id_acteur, submit);
  const { loading, acteur } = useGetActeur(id_acteur);
  const [show, setShow] = useState(false);

  console.log("posts :", posts);

  if (!acteur) {
    return (
      <div className="text-center font-bold">
        <br />
        {loading && <Spinner />}

        <h2>Aucun acteur à afficher</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="p-1 md:w-[80%] mx-auto flex flex-col justify-between">
        <div className="flex flex-col justify-between gap-5">
          <div className="w-full h-50 mx-auto">
            <img
              className="w-full h-full rounded-lg"
              src={IMAGE_API_URL + acteur.logo}
              alt={acteur.acteur}
            />
          </div>

          <h2 className="text-xl font-bold">{acteur.acteur}</h2>
          <p>{acteur.description}</p>

          {/* Commentaire */}
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {posts && posts.length > 0
                  ? posts.length + " Commentaire(s)"
                  : ""}
              </h2>
              <button
                onClick={() => setShow(true)}
                className="bg-[#000] font-semibold text-white py-2 px-2 rounded-md cursor-pointer"
              >
                + Commentaire
              </button>
            </div>

            <br />
            {/* Commentaires */}
            {loadingPost && <Spinner />}

            <div className="flex flex-col gap-3 pb-7">
              {posts ? (
                posts.map((post) => (
                  <div className="bg-[#fff] p-3 rounded-md" key={post.id_post}>
                    <p>{post.prenom}</p>
                    <p>{formatDateWithZeros(post.date_add)}</p>
                    <p>{post.post}</p>
                  </div>
                ))
              ) : (
                <h2>Aucun commentaire à afficher</h2>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {show && (
        <Modal setShow={setShow}>
          <CommentForm
            id_acteur={id_acteur}
            id_user={auth.id_user}
            setShow={setShow}
            setSubmit={setSubmit}
          />
        </Modal>
      )}

      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default ActeurPage;

const formatDateWithZeros = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0"); // 01-31
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 01-12
  const year = date.getFullYear(); // 2025

  const hours = String(date.getHours()).padStart(2, "0"); // 00-23
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 00-59

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
