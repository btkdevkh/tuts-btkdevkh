<?php

require_once 'database/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$api = $_GET['api'] ?? null;

try {
  if(!empty($api)) {
    switch ($method) {
      // Method POST
      case "POST":
        switch (htmlspecialchars($api)) {
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
        switch (htmlspecialchars($api)) {
          case "get_user":
              $pdo = getPdo();
              // var_dump($pdo);

              echo json_encode(["message" => "Bienvenue dans votre espace!"]);
            break;
          default: throw new Exception("Route not found");
        }
        break;
      default: throw new Exception("Method not allowed");
    }
  } else {
    // throw new Exception("Benvenue à API de GBAF");
    echo json_encode(["message" => "Benvenue à API de GBAF"]);
    die;
  }
} catch (Exception $e) {
  // var_dump($e->getMessage());
  echo json_encode(["message" => $e->getMessage()]);
}
