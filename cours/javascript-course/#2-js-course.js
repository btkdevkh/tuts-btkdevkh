/**
 * 02. Contrôle du flux (conditions et boucles)
 * - if, else if, else
 * - switch
 * - Boucles : for, while, do...while
 * - break et continue
 */

let sunny = false;
let day = "mercredi";
day = "jeudi";
let number = 1;

if (sunny === true) {
  console.log("Je vais sortir et courir!");
} else {
  console.log("Je ne vais pas sortir, il fait froid dehors!");
}

switch (day) {
  case "mercredi":
    console.log("Je bosse!");
    break;
  case "jeudi":
    console.log("Je bosse aussi!");
    break;
  default:
    console.log("C'est le week-end!");
}

switch (number) {
  case 1:
    console.log(`Ici number par cas: ${number}`);
    break;
  default:
    console.log(`Ici number par default: ${number}`);
}

console.log("-----------------------------------------");

for (let i = 0; i < 5; i++) {
  if (i > 3) {
    break;
  }

  console.log(`i dans la boucle for: ${i}`);
}

console.log("-----------------------------------------");

let i = 0;
while (i < 5) {
  i++;

  if (i > 3) {
    console.log(`i dans la boucle while de continue: ${i}`);
    continue;
  }

  console.log(`i dans la boucle while: ${i}`);
}

console.log("-----------------------------------------");

let k = 6;
do {
  console.log("Code exécuté malgré la condition est fausse.");
  // console.log(`k dans la boucle do while: ${k}`);
  k++;
} while (k < 5);
