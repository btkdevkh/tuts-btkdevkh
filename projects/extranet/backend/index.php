<?php

require_once 'database/db.php';

$pdo = getPdo();
// var_dump($pdo);

$method = $_SERVER['REQUEST_METHOD'];
$api = $_GET['api'] ?? null;

try {
  if(!empty($api)) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    // Autoriser les headers envoyés (Content-Type, etc.)
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");

    // Si la requête est de type OPTIONS (préflight), on répond directement
    if ($method === 'OPTIONS') {
      http_response_code(200);
      exit();
    }

    switch ($method) {
      // Method POST
      case "POST":
        switch (htmlspecialchars($api)) {
          case "add_user":
              // Lire le corps brut de la requête
              $rawInput = file_get_contents("php://input");

              // Décoder le JSON en tableau associatif
              $data = json_decode($rawInput, true); 

              // Add new account to database
              $nom = $data['nom'];
              $prenom = $data['prenom'];
              $username = $data['username'];
              $password = $data['password'];
              $question = $data['question'];
              $reponse = $data['reponse'];

              $stmt = $pdo->prepare(
                "INSERT INTO account (
                  nom, 
                  prenom, 
                  username, 
                  password, 
                  question, 
                  reponse
                ) VALUES (
                  :nom, 
                  :prenom, 
                  :username, 
                  :password, 
                  :question, 
                  :reponse
                )"
              );

              $stmt->execute([
                ':nom' => $nom,
                ':prenom' => $prenom,
                ':username' => $username,
                ':password' => password_hash($password, PASSWORD_DEFAULT), // Hash du mot de passe
                ':question' => $question,
                ':reponse' => $reponse
              ]);
              
              echo json_encode(["message" => "Utilisateur ajouté avec succès."]);
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
