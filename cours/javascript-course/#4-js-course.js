/**
 * 04. Tableaux et objets
 * - Créer et manipuler un tableau : push, pop, map, filter, forEach
 * - Créer un objet : propriétés et méthodes
 * - Parcourir un objet (boucle for...in)
 * - Notion d’accès par “dot” ou “bracket”
 */

// Array
const numbers = [1, 55, 66, 33, 100, 99];
const people = Array("Jimmy", "Bella", "Gile", "Mike");

numbers.push(35);
numbers.pop();

const newNumbers = numbers.map((number) => number + 1);
const filteredNumbers = numbers.filter((number) => number < 60);

numbers.forEach((number) => {
  // console.log("number", number);
});

// Object
const person = {
  name: "Bella",
  age: 5,
  email: "bella@gmail.com",
  greet() {
    console.log(`Salut, je m'appelle ${this.name}`);
  },
};

// console.log(person.age); // (dot)
// console.log(person["name"]); // []

for (let property in person) {
  console.log(`${property}:`, person[property]);
}
