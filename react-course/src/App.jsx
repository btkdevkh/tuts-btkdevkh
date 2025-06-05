import { useState, lazy, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ThemeButton from "./components/ThemeButton";

// import BasicForm from "./components/BasicForm";
// import TodoList from "./components/TodoList";

// Lazy loading
const LazyTodoListComponent = lazy(async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return import("./components/TodoList");
});

// Parent component
const App = () => {
  // React hook useState
  // const [count, setCount] = useState(0);
  // const [people, setPeople] = useState([
  //   { id: 1, name: "Jim" },
  //   { id: 2, name: "Bella" },
  //   { id: 3, name: "Gill" },
  // ]);

  // Handlers
  // const deletePerson = (id) => {
  //   setPeople((prevs) => prevs.filter((prev) => prev.id !== id));
  // };

  return (
    <>
      <ThemeButton />

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <hr />

      {/* Example of useState hook */}
      {/* <div className="card">
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          count is {count}
        </button>
      </div> */}

      {/* <h2>Prénoms :</h2>
      {people.map((person) => (
        <div key={person.id} onClick={() => deletePerson(person.id)}>
          {person.name}
        </div>
      ))} */}

      {/* <TodoList /> */}

      <Suspense fallback={<h2>Chargement en cours...</h2>}>
        <LazyTodoListComponent />
      </Suspense>

      {/* Formulaire */}
      {/* <BasicForm /> */}
    </>
  );
};

export default App;
