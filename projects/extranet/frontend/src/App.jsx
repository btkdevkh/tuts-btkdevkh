import { useNavigate } from "react-router";
import "./App.css";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const connectedUser = false;

    if (!connectedUser) {
      navigate("/login");
    }
  }, []);

  return <main></main>;
}

export default App;
