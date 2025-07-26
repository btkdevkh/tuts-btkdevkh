import { Person as PersonType } from "./types/types.js";
import Person, { Lead } from "./oop/Person.js";
import Admin from "./oop/Admin.js";

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
const person: PersonType = {
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

// as
const inputEl = document.querySelector("#text")! as HTMLInputElement;

/**
 * Generic (<>)
 *
 * generic Array
 * generic with function
 * generic with type (alias)
 * generic with interface
 */

// generic Array
const array4 = ["abc", 1000, null, undefined];
const array5: Array<string | number | null | undefined> = [
  "abc",
  1000,
  null,
  undefined,
];
const array6: Array<string> = ["dsds", "sdsdsd", "dsdsds"];
const array7: Array<number> = [1, 2, 3, 4];
const people: Array<PersonType> = [person];

// without generic function
function logger1(params: string | number | boolean): string | number | boolean {
  return params;
}
// const a = logger1("Je suis une fonction non générique");

// type guard
// if (typeof a === "string") {
//   console.log(a.toUpperCase());
// }

// with generic function
function logger2<T>(params: T): T {
  return params;
}

const b = logger2<string>("Je suis une fonction générique");
// const c = logger2<number>(35);
// const d = logger2<boolean>(true);
// const e = logger2<Person>(person);

// generic with type (alias)
type BasicType<T> = T;

const f: BasicType<string> = "dklsjslflsls";
const g: BasicType<PersonType> = person;

// generic with interface
interface ILogger<T> {
  log: T;
}

function logger3<T>(params: T): T {
  return params;
}

const j = logger3<ILogger<string>>({ log: "500, server error!" });
const k = logger3<ILogger<number>>({ log: 500 });
// console.log(j);
// console.log(k);

/**
 * OOP
 *
 * Properties
 * Methods
 * Getters
 * Setters
 * Accessibilities (public, private, protected)
 * static
 * inheritance
 * interface
 * abstract
 */
const person1 = new Person(
  "mike91",
  "Mike",
  "NM",
  "mike91@gmail.com",
  true,
  "NH123456"
);
const person2 = new Person(
  "jim75",
  "Jim",
  "KO",
  "jim75@gmail.com",
  true,
  "KM456789"
);
const person3 = new Admin(
  "admin91",
  "Bella",
  "KM",
  "admin91@gmail.com",
  false,
  "FG45655566"
);
// console.log("person1", person1);
// console.log("person2", person2);
// person2.greet();

// person1.userName = "bella91";
// console.log(person1.userName);

// person1.greet();
person2.greet();
console.log("--------------------");
person3.greet();
