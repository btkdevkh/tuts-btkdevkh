import BackButton from "../components/BackButton";

const AboutPage = () => {
  return (
    <>
      <div className="p-3 flex flex-col gap-7">
        <h2 className="text-2xl">Qui nous somme?</h2>

        <p>
          Le GBAF (Groupement Banque Assurance Français) est une initiative
          dédiée aux salariés des grands groupes bancaires et d’assurance en
          France. Face à la diversité croissante des produits financiers et à
          l’absence d’une base de données centralisée, nous avons créé une
          plateforme extranet qui offre un point d’accès unique à des
          informations fiables sur les acteurs, partenaires et produits du
          secteur bancaire. Notre objectif : faciliter la recherche, encourager
          le partage d’expériences et permettre à chaque salarié de donner son
          avis et de commenter librement les services et initiatives du secteur.
        </p>

        <div>
          <BackButton />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
