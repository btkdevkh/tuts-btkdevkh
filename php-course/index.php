<?php

// Variables primitives
$firstname = "Bella"; // string
$age = 17; // interger
$amount = 100.50; // float
$sexe = false; // boolean

// Variables par références
$people = ["James", 'John', 'Jean', 'Bella']; // array
$person = [
  "name" => "Kim",
  "firstname" => "Bella",
  "age" => 9
]; // array (object litétal)

// Constantes
define('COLOR', '#fff');

// Opérartion Arithmétique
$num1 = 7;
$num2 = 5;

$result = $num1 + $num2; // Addition
$result = $num1 - $num2; // Soustraction
$result = $num1 / $num2; // Division
$result = $num1 * $num2; // Multiplication
$result = $num1 % $num2; // Modulo opération

// Opérations de comparaision (<, >, ==, ===, <=, >=)
$result = $num1 < $num2;
$result = $num1 > $num2;
$result = $num1 == $num2;
$result = $num1 === $num2;
$result = $num1 <= $num2;
$result = $num1 >= $num2;

// Opérateurs de logique (&&, ||)
$result = $num1 === 7 && $num2 === "5"; // true et false = false
$result = $num1 === 7 && $num2 === 5; // true et true = true
$result = $num1 === "7" || $num2 === 5; // false ou true = true
$result = $num1 === 7 || $num2 === 5; // true ou true = true
// var_dump($result);

// Condition (if)
// if($age === 9) {
//   echo "Tu as " . $age . " ans"; 
// } else if($age === 17) {
//   echo "Tu n'est pas encore majeur"; 
// } else {
//   echo "Tu es mineur";
// }

// Condition (switch)
// switch($age) {
//   case 9: echo "Tu as " . $age . " ans";
//     break;
//   case 17: echo "Tu n'est pas encore majeur";
//     break;
//   default: echo "Tu es mineur";
// }

// Ternaire
// echo($age === 9 ? "Tu as " . $age . " ans" : $age === 17) ? "Tu n'est pas encore majeur" : "Tu es mineur";

// Boucle (for), quand on sait le nombre d'iteration
// for($i = 0; $i < 10; $i++) {
//   echo "Itération de boucle (for) i : " . $i . "</br>";
// }

// echo "<hr>";

// Boucle (while), quand on sait le nombre d'iteration
// $i = 0; 
// while($i < count($people)) {
//   echo "Itération de boucle (while) prénom : " . $people[$i] . "</br>";
//   $i++;
// }

// echo "<hr>";

// Boucle (do, while)
// $i = 0; 
// do {
//   echo "J'exécute cette ligne quand même malgré la condition n'est pas satisfaite.";
//   echo "</br>";
//   echo "Itération de boucle (while) prénom : " . $people[$i] . "</br>";
//   $i++;
// } while($i < count($people));

// echo "<hr>";

// Boucle (foreach)
// foreach ($people as $person) {
//   echo "Itération de boucle (foreach) prénom : " . $person . "</br>";
// }

// Fonction (Classique)
// function greet () {
//   return "Salut, je suis une fonction classique! </br>";
// }
// echo(greet());

// Fonction (Anonyme)
// $anonymeFunc = function () {
//   return "Salut, je suis une fonction anonyme! </br>";
// };
// echo($anonymeFunc());

// Fonction (Arrow)
// $multiply = fn() => "Salut, je suis une fonction flechée, je calcule la multiplication : " . 5 * 3;
// echo($multiply());

// echo "</br>";

// $addition = fn($num1, $num2) => $num1 + $num2;
// echo("Résultat de l'addition : " . $addition(100, 50));

// function addition ($num1, $num2 = 50) {
//   return $num1 + $num2;
// }
// echo("Résultat de l'addition : " . addition(100, 80));

// Super Globals Variables

if(isset($_POST["submit"])) {
  if($_SERVER["REQUEST_METHOD"] === "POST" && (isset($_POST["email"]) || isset($_POST["password"]))) {
    echo $_SERVER["REQUEST_METHOD"];
    
    echo $_POST["email"];
    echo $_POST["password"];
  } else {
    echo "La methode n'est pas autorisée.";
  }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cours PHP</title>
</head>
<body>
  <h1>Cours PHP</h1>
  <hr>

  <form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="POST">
    <input type="email" name="email" placeholder="Email"><br>
    <input type="password" name="password" placeholder="Password"><br>
    <input type="submit" value="Valider" name="submit">
  </form>

</body>
</html>
