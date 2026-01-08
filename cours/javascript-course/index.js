/**
 * 08. JSON et stockage local (FIN)
 * - Qu’est-ce que JSON
 * - localStorage et sessionStorage
 * - Exemple : sauvegarder des préférences utilisateur
 */

// JSON (JavaScript Object Notation)
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    localStorage.setItem("data", JSON.stringify(data));
  })
  .catch((err) => console.log(err));

// localStorage (donée persitante non sensible)
localStorage.setItem("theme", "light");
const theme = localStorage.getItem("theme");
const data = JSON.parse(localStorage.getItem("data"));
console.log(theme);
// console.log(data);
// localStorage.clear();

// sessionStorage (donnée temporaire non sensible)
sessionStorage.setItem("email", "james@example.com");
const email = sessionStorage.getItem("email");
sessionStorage.setItem("data", JSON.stringify(data));
// console.log(email);
// sessionStorage.clear();

// Example
theme && theme === "dark"
  ? (document.body.style.backgroundColor = "#333")
  : "#fff";

// Enjoy !
