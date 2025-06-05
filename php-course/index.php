<?php

// Variables primitives
$firstname = "Bella"; // string
$age = 9; // interger
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
var_dump($result);

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

</body>
</html>
