/**
 * BASIC
 *
 * string
 * number
 * boolean
 * null
 * undefined
 * union (|)
 * [], Tuple
 * {}
 * any
 * type (custom type)
 * interface (object & class POO)
 * unknown
 *
 * funtions
 * void
 * never
 * ? (optional)
 */
var firstname = "Bella";
var age = 10;
var sexe = true;
// union
var user = null;
user = "abc";
// Tableau (Array)
var array1 = ["abec", 100, true];
var array2 = Array(1, 2, 3);
// Tableau (Tuple)
var array3 = ["Jim", 35, true];
// Object
var person = {
    username: "JK007",
    age: 35,
    sexe: true,
};
// any
var varAny = {};
varAny = "sdsd";
varAny = true;
// unknown
var unknownVar;
unknownVar = "abc";
unknownVar = 1000;
console.log(unknownVar);
var testVar;
if (typeof unknownVar === "boolean") {
    testVar = unknownVar;
}
// Funtions
// function greet(nom: string): string {
//   return `Hello, my name is ${nom}`;
// }
// const greet = function (nom: string): string {
//   return `Hello, my name is ${nom}`;
// };
// const greet = (
//   age: number,
//   firstname: string = "Jimmy",
//   msg?: string
// ): string => {
//   if (msg) {
//     return `${msg}, my name is ${firstname}, I'm ${age} years old`;
//   }
//   return `Hello, my name is ${firstname}, I'm ${age} years old`;
// };
// const greet2 = (nom: string): void => {
//   console.log(`Hello, my name is ${nom}`);
// };
// const throwException = (msg: string): never => {
//   throw new Error(msg);
// };
