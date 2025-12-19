/**
 * 07. Introduction à l’Asynchrone
 * - Notion de “synchrone” vs “asynchrone”
 * - Les promesses (Promise, .then, .catch)
 * - async et await
 * - Exemple : récupérer des données avec fetch()
 */

// synchrone
// console.log("tâche 1");

// let result = 0;
// for (let i = 0; i < 1000000000; i++) {
//   result += i;
// }
// console.log("tâche 2", result);

// console.log("tâche 3");

// asynchrone
// console.log("tâche 1");

// setTimeout(() => {
//   let result = 0;
//   for (let i = 0; i < 1000000000; i++) {
//     result += i;
//   }
//   console.log("tâche 2", result);
// }, 0);

// console.log("tâche 3");

// Les promesses (Promise, .then, .catch)
// function goToCinema(go) {
//   return new Promise((resolve, reject) => {
//     if (go) {
//       return resolve("On y va!");
//     }

//     return reject("Oh, j'ai la flemme!");
//   });
// }

// goToCinema(true)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

console.log("task 1");

// DOM
const jokeQEl = document.getElementById("joke-q");
const jokeAEl = document.getElementById("joke-a");

// Exemple : récupérer des données avec fetch()
const API_URL = "https://v2.jokeapi.dev/joke/any?lang=FR";

const fetchData = async () => {
  console.log("task 2");

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  const data = await response.json();
  return data;
};

// async et await
async function main() {
  try {
    const data = await fetchData();
    jokeQEl.textContent = data.setup;
    jokeAEl.textContent = data.delivery;
  } catch (error) {
    console.log(error);
  }
}

console.log("task 3");

main();
