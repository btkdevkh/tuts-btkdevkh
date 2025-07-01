import Spinner from "./components/Spinner";
import useGetActeurs from "./hooks/useGetActeurs";
import { IMAGE_API_URL } from "./utils/config";
import { Link } from "react-router";

const App = () => {
  const { loading, acteurs } = useGetActeurs();

  return (
    <main className="p-3 flex flex-col gap-2">
      <div className="text-center">{loading && <Spinner />}</div>

      <h1>
        Le Groupement Banque Assurance Français​ (GBAF) est une fédération
        représentant les 6 grands groupes français :
      </h1>

      <ul className="px-15 py-5 list-disc">
        <li>BNP Paribas</li>
        <li>BPCE</li>
        <li>Crédit Agricole</li>
        <li>Crédit Mutuel-CIC</li>
        <li>Société Générale</li>
        <li>La Banque Postale</li>
      </ul>
      <p>
        Même s’il existe une forte concurrence entre ces entités, elles vont
        toutes travailler de la même façon pour gérer près de 80 millions de
        comptes sur le territoire national.{" "}
      </p>
      <p>
        Le GBAF est le représentant de la profession bancaire et des assureurs
        sur tous les axes de la réglementation financière française. Sa mission
        est de promouvoir l'activité bancaire à l’échelle nationale. C’est aussi
        un interlocuteur privilégié des pouvoirs publics.
      </p>

      <br />

      <h2 className="font-bold text-xl">Acteurs et partenaires</h2>

      {/* Acteurs */}
      <div className="flex flex-col gap-2">
        {acteurs ? (
          acteurs.map((acteur) => {
            return (
              <div
                className="bg-[#5aa16a] text-white p-3 rounded-xl flex gap-5 items-center"
                key={acteur.id_acteur}
              >
                <div className="w-95 h-50">
                  <img
                    className="w-full h-full rounded-lg"
                    src={IMAGE_API_URL + acteur.logo}
                    alt={acteur.acteur}
                  />
                </div>

                <div className="flex flex-col gap-6 w-full">
                  <h3 className="font-bold">{acteur.acteur}</h3>
                  <p>{acteur.description.slice(0, 50)}...</p>

                  <Link
                    className="bg-[#ad4d43] px-2 py-1 ml-auto rounded-md"
                    to={`/acteur/${acteur.id_acteur}`}
                  >
                    Lire la suite
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>Aucun acteur à afficher</p>
        )}
      </div>
    </main>
  );
};

export default App;
