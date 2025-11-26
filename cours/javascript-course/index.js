/**
 * 05. Le DOM (Document Object Model)
 * - Qu’est-ce que le DOM ?
 * - Sélectionner des éléments (getElementById, querySelector)
 * - Modifier le contenu et les styles (innerText, style, classList)
 * - Gérer les événements (addEventListener)
 *
 */

const h1El = document.querySelector("#main-title");
const buttonEl = document.getElementById("submit-button");

// h1El.style.backgroundColor = "red";
// h1El.style.padding = "1rem";
// h1El.style.color = "white";
// h1El.style.borderRadius = "0.3rem";

h1El.classList.add("main-title");

// Events
document.addEventListener("DOMContentLoaded", () => {
  // console.log("DOM loaded");

  buttonEl.addEventListener("click", () => {
    h1El.style.backgroundColor = "blue";
  });

  // buttonEl.addEventListener("mouseover", () => {
  //   h1El.style.backgroundColor = "blue";
  // });

  // buttonEl.addEventListener("mouseleave", () => {
  //   h1El.style.backgroundColor = "red";
  // });
});
