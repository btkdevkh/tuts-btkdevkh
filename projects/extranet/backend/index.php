<?php

$method = $_SERVER['REQUEST_METHOD'];
$api = $_GET['api'];

try {
  switch ($method) {
    // Method POST
    case "POST":
      switch ($api) {
        case "add_user":
            echo json_encode(["message" => "Votre compte a bien été créé!"]);
          break;
        case "login_user":
            echo json_encode(["message" => "Vous vous êtes bien connecté!"]);
          break;
        default: throw new Exception("Route not found");
      }
      break;

    // Method GET
    case "GET":
      switch ($api) {
        case "get_user":
            echo json_encode(["message" => "Bienvenue dans votre espace!"]);
          break;
        default: throw new Exception("Route not found");
      }
      break;
    default: throw new Exception("Method not allowed");
  }
} catch (Exception $e) {
  // var_dump($e->getMessage());
  echo json_encode(["message" => $e->getMessage()]);
}
