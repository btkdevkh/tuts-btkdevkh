import { useAuthContext } from "./contexts/AuthContext";

const App = () => {
  const { loading, auth } = useAuthContext();
  console.log(auth);

  return (
    <main className="p-3 flex flex-col gap-7">
      <div className="text-center">{loading && "LOADING..."}</div>

      <h1>
        Bienvenu dans votre espace membre, <b>{auth && auth.prenom}</b>
      </h1>
    </main>
  );
};

export default App;
