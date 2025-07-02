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
import LikeButton from "../components/LikeButton";
import DisikeButton from "../components/DisikeButton";
import CountLike from "../components/CountLike";
import formatDateWithZeros from "../utils/formatDateWithZeros";
import { MdAdd } from "react-icons/md";
import CountDislike from "../components/CountDislike";

const ActeurPage = () => {
  const [submit, setSubmit] = useState(false);

  const { id: id_acteur } = useParams();
  const { auth } = useAuthContext();
  const { loading: loadingPost, posts } = useGetPosts(id_acteur, submit);
  const { loading, acteur } = useGetActeur(id_acteur);
  const [show, setShow] = useState(false);

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
    <div className="min-h-screen md:w-[80%] mx-auto flex flex-col justify-between mt-3 mb-3">
      <div className="p-1 flex flex-col justify-between">
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
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setShow(true)}
                className="border border-black font-semibold py-2 px-2 rounded-md cursor-pointer flex items-center"
              >
                <MdAdd size={20} />
                <span>Commentaire</span>
              </button>

              {/* Like & Dislike buttons */}
              <div className="flex items-center gap-8 border py-2 px-2 rounded-md">
                <div className="flex gap-3 items-center">
                  <CountLike id_acteur={id_acteur ?? null} submit={submit} />
                  <LikeButton
                    id_user={auth ? auth.id_user : null}
                    id_acteur={id_acteur ?? null}
                    setSubmit={setSubmit}
                  />
                </div>

                <div className="flex gap-3 items-center">
                  <DisikeButton
                    id_user={auth ? auth.id_user : null}
                    id_acteur={id_acteur ?? null}
                    setSubmit={setSubmit}
                  />
                  <CountDislike id_acteur={id_acteur ?? null} submit={submit} />
                </div>
              </div>
            </div>

            <br />
            {/* Commentaires */}
            {loadingPost && <Spinner />}

            <h2 className="text-xl font-semibold mb-5">
              {posts && posts.length > 0
                ? posts.length + " Commentaire(s)"
                : ""}
            </h2>

            <div className="flex flex-col gap-3 pb-7">
              {posts ? (
                posts.map((post) => (
                  <div
                    className="bg-[#f1f1f1] p-3 rounded-md"
                    key={post.id_post}
                  >
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

      <div>
        <BackButton />
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
    </div>
  );
};

export default ActeurPage;
