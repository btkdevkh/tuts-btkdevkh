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

const firstname: string = "Bella";
const age: number = 10;
const sexe: boolean = true;

// union
let user: string | boolean | null | undefined = null;
user = "abc";

// Tableau (Array)
const array1: (string | number | boolean)[] = ["abec", 100, true];
const array2: number[] = Array(1, 2, 3);

// Tableau (Tuple)
const array3: [string, number, boolean] = ["Jim", 35, true];

// Object
const person: Person = {
  username: "JK007",
  age: 35,
  sexe: true,
};

// any
let varAny: any = {};
varAny = "sdsd";
varAny = true;

// unknown
let unknownVar: unknown;
unknownVar = "abc";
unknownVar = 1000;
console.log(unknownVar);
let testVar: boolean;
if (typeof unknownVar === "boolean") {
  testVar = unknownVar;
}

// Custom types
type CustomVar = string | number | boolean;

type Person = {
  username: string;
  age: number;
  sexe: boolean;
};

// Interface (object & class POO)
interface Person2 {
  username: string;
  age: number;
  sexe: boolean;
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
