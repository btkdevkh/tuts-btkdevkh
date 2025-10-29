/**
 * 01. Les bases du langage
 * - Les variables : var, let, const
 * - Les types de données : string, number, boolean, null, undefined, object
 * - La concaténation et interpolation : Bonjour ${nom}
 * - Les opérateurs (arithmétiques, comparaison, logiques)
 */

var prenom; // undefinded
// console.log(prenom);

prenom = null; // null
// console.log(prenom);

prenom = "Bella"; // string
let age = 6; // number
let num = 12.5; // number
const sexe = true; // boolean
age = 7;

const personne = {
  firstname: prenom,
}; // object
personne.firstname = "Mike";

// console.log(sexe);
// console.log(age);
// console.log(num);
// console.log(prenom);

// console.log("Bonjour, je m'appelle " + prenom);
// console.log(`Bonjour, je m'appelle ${personne.firstname}`);

// Les opérateurs arithmétiques : -, +, *, /, %
const a = 3;
const b = 3;

let resultat = a + b;
resultat = b - a;
resultat = a * b;
resultat = b / 2;
resultat = a % 2;

// Les opérateurs comparaison : <, >, <=, >=, ==, ===
resultat = a < b;
resultat = a > b;
resultat = a <= b;
resultat = a >= b;
resultat = a === b;

// Les opérateurs logiques: &&, ||, !
resultat = a && b > 3;
resultat = a === 3 || b === 3; // (Positive)
resultat = a !== b; // (Negative)
resultat = !sexe;
// console.log(resultat);

// Opérateur logique (&&)
// true && true = true
// false && false = fasle
// true && false = false
// false && true = false

// console.log(true && true);
// console.log(false && false);
// console.log(true && false);
// console.log(false && true);

// Opérateur logique (||)
// true || true = true
// false || false = false
// true || false = true
// false || true = true

// console.log(true || true);
// console.log(false || false);
// console.log(true || false);
// console.log(false || true);
