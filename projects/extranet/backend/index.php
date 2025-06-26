<?php

// API stateless

require_once 'database/db.php';
require_once 'functions/addUser.php';
require_once 'functions/getUserByUsername.php';

$pdo = getPdo();
// var_dump($pdo);

$method = $_SERVER['REQUEST_METHOD'];
$api = $_GET['api'] ?? null;

try {
  if(!empty($api)) {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
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

            // Add new account
            addUser($pdo, $data);
            
            echo json_encode(["message" => "Votre comptre a bien été crée."]);
            break;
          case "login_user":
            // Recupérer et convitir les donées en object PHP
            $data = (object) $_POST;
            
            // Recuperer l'utilisateur qui correspond celui qui est passé par le formulaire
            $user = getUserByUsername($pdo, $data->username);

            // Check user exist & verify password
            if(!$user || ($user && !password_verify($data->password, $user->password))) {
              echo json_encode(["message" => "Identifiants inconnus"]);
              exit();
            }

            // Cookie mode "httponly" TRUE
            // Générer un token aléatoire
            $token = bin2hex(random_bytes(32)); // 64 char
            $expiry = time() + 86400; // 24h
            $createdAt = date('Y-m-d H:i:s');
            $expiryDate = date('Y-m-d H:i:s', $expiry);
            $id_user = $user->id_user; // ID user
   
            // Supprimer tous les anciens tokens de cet utilisateur
            $pdo->prepare("DELETE FROM auth_token WHERE id_user = ?")->execute([$id_user]);

            // Insert token in "auth_token" table
            $req = "INSERT INTO auth_token (
              id_user, 
              token, 
              created_at, 
              expired_at
            ) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($req);
            $stmt->execute([$id_user, $token, $createdAt, $expiryDate]);

            // Créer le cookie avec des options de sécurité
            setcookie(
              'auth_token',         
              $token,              
              [
                'expires' => $expiry,
                'path' => '/',
                'domain' => '',
                'secure' => false, 
                'httponly' => true, // Inaccessible en JavaScript
                'samesite' => 'Lax'  // ou 'Strict' selon le besoin
              ]
            );

            echo json_encode(["message" => "Vous vous êtes bien connecté!"]);
            break;
          default: throw new Exception("Route not found");
        }
        break;

      // Method GET
      case "GET":
        switch (htmlspecialchars($api)) {
          case "get_current_user":
            // Lire le token (cookie httponly)
            if (!isset($_COOKIE['auth_token'])) {
              http_response_code(401);
              echo json_encode(['error' => 'Non authentifié']);
              exit;
            }

            // Get token from cooke
            $tokenCookie = $_COOKIE['auth_token'];

            // Get token from "auth_token" table in SQL
            // Requête pour retrouver l'utilisateur à partir du token
            $sql = "SELECT u.id_user, u.nom, u.prenom
              FROM auth_token t
              JOIN account u ON u.id_user = t.id_user
              WHERE t.token = ?
              AND t.expired_at > t.created_at
              LIMIT 1
            ";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$tokenCookie]);
            $user = $stmt->fetch(PDO::FETCH_OBJ);

            // Si aucun utilisateur trouvé
            if (!$user) {
              http_response_code(401);
              echo json_encode(['error' => 'Token invalide ou expiré']);
              exit;
            }

            echo json_encode(["message" => "Bienvenue dans votre espace!", "user" => $user]);
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
