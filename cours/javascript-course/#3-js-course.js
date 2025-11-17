/**
 * 03. Fonctions
 * - Déclaration et exécution d’une fonction
 * - Paramètres et retour de valeur
 * - Fonctions fléchées (()=>{})
 * - IIFE
 * - Portée des variables (scope)
 */

// Function Declaration (clissic)
function greet(name = "Bunthoeun") {
  console.log(`Bonjour, je m'appelle ${name}`);
}

// Function Expression (anonyme)
const greet2 = function () {
  console.log("Je suis une expression fonction.");
};

// Arrow Function (anonyme)
const greet3 = () => {
  console.log("Je suis une fonction fléchée.");
};

// IIFE (Immediately Invoked Function Expression)
// (function () {
//   console.log("Je suis une IIFE manière expression.");
// })();

// (() => {
//   console.log("Je suis une IIFE manière fléchéé.");
// })();

// Valeur de retour
const add = (number) => 2 + number;
const result = add(20);

// Scope GLOBAL (Parents)
const globalvar = 2;

function multiply(number) {
  var fullname = "Gile FK";
  // Scope LOCAL (Enfant)
  const localVar = number;
  console.log(fullname);

  return 2 * localVar;
}

if (globalvar === 2) {
  var x = 10;
  let y = 5;
}

console.log(multiply(globalvar));

// var : il respect le cope de fonction
// let, const : ils respectent le scope de block
