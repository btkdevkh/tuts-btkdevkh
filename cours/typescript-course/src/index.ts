import { Person } from "./types/types.js";

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
 *
 * enum
 * ?? (coalesing)
 * ! (un élement est non null)
 * as (tpe assertion)
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
let testVar: boolean;
if (typeof unknownVar === "boolean") {
  testVar = unknownVar;
}

// Custom types
type CustomVar = string | number | boolean;

// Interface (object & class POO)
interface Person2 {
  id?: null | string;
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

// Enum (énumération)
enum Colors {
  BLACK = "#000",
  WHITE = "#fff",
  RED = "#ff0000",
  BLUE = "#0000FF",
}

// ?? (coalesing)
let user2: string | null | undefined = "Jimmy";
let connectedUser = user2 ?? "Anonyme";

// ! (indiquer un élément ne peut pas être null)
if (person?.id) {
  console.log(person.id);
}
console.log(person.username);

// as
const inputEl = document.querySelector("#text")! as HTMLInputElement;
