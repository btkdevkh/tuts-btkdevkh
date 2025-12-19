/**
 * 06. Manipulation du temps et des événements
 * - setTimeout, setInterval
 * - Exemple pratique : un compteur ou une horloge
 * - Gestion des clics, des formulaires, du clavier
 */

// const timer = setTimeout(() => {
//   console.log("Code exécuté après 3s");
// }, 1000);
// clearTimeout(timer);

// const timer2 = setInterval(() => {
//   console.log("Code exécuté toutes les 1s");
// }, 3000);
// clearInterval(timer2);

// DOM
const resultEl = document.getElementById("result");
const incrementBtnEl = document.getElementById("increment-button");
const decrementBtnEl = document.getElementById("decrement-button");
const clockEl = document.getElementById("clock");
const formEl = document.querySelector("form");

// Example : counter
let counter = 0;
resultEl.textContent += ` ${counter}`;

// Example : horloge
function clock() {
  clockEl.textContent = "Clock : ";

  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const format = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  clockEl.textContent += " " + format;
}

clock();

const clockTimer = setInterval(() => {
  clock();
}, 1000);

// Events
incrementBtnEl.addEventListener("click", (e) => {
  counter += 1;
  resultEl.textContent = "Resultat : ";
  resultEl.textContent += ` ${counter}`;
});

decrementBtnEl.addEventListener("click", (e) => {
  counter -= 1;
  resultEl.textContent = "Resultat : ";
  resultEl.textContent += ` ${counter}`;
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log(e.target["email"].value);
  // console.log(e.target["password"].value);

  const formData = new FormData(formEl);
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    clearInterval(clockTimer);
  }
});
