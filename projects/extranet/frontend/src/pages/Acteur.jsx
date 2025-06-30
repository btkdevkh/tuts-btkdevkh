import { useParams } from "react-router";
import useActeur from "../hooks/useActeur";
import Spinner from "../components/Spinner";
import { IMAGE_API_URL } from "../utils/config";

const ActeurPage = () => {
  const { id } = useParams();
  const { loading, acteur } = useActeur(id);

  if (!loading && !acteur) {
    return (
      <div className="text-center font-bold">
        <br />
        <h2>Aucun acteur à afficher</h2>
      </div>
    );
  }

  return (
    <div>
      {loading && <Spinner />}
      <br />

      {!loading && acteur && (
        <div className="w-[80%] mx-auto flex flex-col gap-5">
          <div className="w-full h-50 mx-auto">
            <img
              className="w-full h-full rounded-lg"
              src={IMAGE_API_URL + acteur.logo}
              alt={acteur.acteur}
            />
          </div>

          <h2 className="text-xl font-bold">{acteur.acteur}</h2>
          <p>{acteur.description}</p>

          <hr />

          {/* Commentaire */}
          <div>
            <h2 className="text-xl font-semibold">10 Commentaires</h2>
            <p>A implémenter...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActeurPage;
