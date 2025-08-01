<?php

// API stateless

require_once 'database/db.php';
require_once 'functions/addUser.php';
require_once 'functions/updateUserInfo.php';
require_once 'functions/updateUserPassword.php';
require_once 'functions/getUserByUsername.php';
require_once 'functions/deleteUserToken.php';
require_once 'functions/addUserToken.php';
require_once 'functions/getAuthToken.php';
require_once 'functions/getActeurs.php';
require_once 'functions/getActeurById.php';
require_once 'functions/addPost.php';
require_once 'functions/getPosts.php';
require_once 'functions/addVote.php';
require_once 'functions/updateVote.php';
require_once 'functions/deleteVote.php';
require_once 'functions/getLikesByIdActeur.php';
require_once 'functions/getDislikesByIdActeur.php';
require_once 'functions/getVoteByIdUserAndIdActeur.php';
require_once 'utils/set_header.php';
require_once 'utils/checkAuth.php';
require_once 'utils/set_cookie.php';
require_once 'utils/unset_cookie.php';

$api = $_GET['api'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];

$id = $_GET['id'] ?? null;
$id_acteur = $_GET['id_acteur'] ?? null;

try {
  if(!empty($api)) {
    // Set header
    set_header();

    // PDO instace
    $pdo = getPdo();

    // Si la requête est de type OPTIONS (préflight), on répond directement
    if ($method === 'OPTIONS') {
      http_response_code(200);
      exit();
    }

    switch ($method) {
      // Method POST
      case 'PUT':
        switch (htmlspecialchars($api)) {
          case "reset_user_password":
            // Check authenticated user
            checkAuth($pdo);

            // Lire le corps brut de la requête
            $rawInput = file_get_contents("php://input");

            // Décoder le JSON en tableau associatif
            $data = json_decode($rawInput, true); 

            $id_user = $data["id_user"];
            $newPassword = $data["newPassword"];

            // Reset new user password
            $response = updateUserPassword($pdo, (int) $id_user, $newPassword);

            if(!$response) {
              http_response_code(404);
              echo json_encode(["success" => false, "message" => "Une erreur s'est produit lors de la réinitalisation du mot de passe"]);
              exit;
            }

            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Votre mot de pass a bien été réinitialisé"]);
            break;
          case 'update_user':
            // Check authenticated user
            checkAuth($pdo);

            // Lire le corps brut de la requête
            $rawInput = file_get_contents("php://input");

            // Décoder le JSON en tableau associatif
            $data = json_decode($rawInput, true); 

            $id_user = $data["id_user"];
            $username = $data["username"];
            $newPassword = $data["newPassword"];
            $question = $data["question"];
            $reponse = $data["reponse"];

            // Save new update info from user
            $response = updateUserInfo($pdo, $id_user, $username, $question, $reponse, $newPassword);

            if(!$response) {
              http_response_code(404);
              echo json_encode(["success" => false, "message" => "Une erreur s'est produit lors de modification"]);
              exit;
            }

            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Votre informations ont bien été modifiés"]);
            break;
          default: throw new Exception("Route not found");
        }
        break;
      case "POST":
        switch (htmlspecialchars($api)) {
          case "forget_user_password":
            // Lire le corps brut de la requête
            $rawInput = file_get_contents("php://input");

            // Décoder le JSON en tableau associatif
            $data = json_decode($rawInput, true); 

            $username = $data["username"];
            $reponse = $data["reponse"];

            // Get user by username
            $user = getUserByUsername($pdo, $username);

            if(!$user || ($user && $user->reponse !== $reponse)) {
              http_response_code(404);
              echo json_encode(["success" => false, "message" => "Identifiants inconnus"]);
              exit;
            }

            // Cookie mode "httponly" TRUE
            // Générer un token aléatoire
            $token = bin2hex(random_bytes(32)); // 64 char
            $token_csrf = bin2hex(random_bytes(32)); // Cross-Site Request Forgery

            $expiry = time() + 86400; // 24h
            $createdAt = date('Y-m-d H:i:s');
            $expiryDate = date('Y-m-d H:i:s', $expiry);
            $id_user = $user->id_user; // ID user

            // Delete user token
            deleteUserToken($pdo, (int) $id_user);

            // Add user token
            addUserToken($pdo, $id_user, $token, $createdAt, $expiryDate, $token_csrf);

            // Set token cookie httponly
            set_cookie("auth_token", $token, false, true, $expiry);

            // Set CSRF token cookie non httponly
            set_cookie('XSRF-TOKEN', $token_csrf, false, false);

            http_response_code(200);
            echo json_encode(["success" => true, "id_user" => $user->id_user, "token_csrf" => $token_csrf]);
            break;
          case "dislike":
            // Check authenticated user
            checkAuth($pdo);

            // Lire le corps brut de la requête
            $rawInput = file_get_contents("php://input");

            // Décoder le JSON en tableau associatif
            $data = json_decode($rawInput, true); 

            $id_user = $data["id_user"];
            $id_acteur = $data["id_acteur"];

            // Get votes by id user & id acteur
            $myVote = getVoteByIdUserAndIdActeur($pdo, $id_user, $id_acteur);

            if($myVote && $myVote->vote === -1) {
              http_response_code(401);
              echo json_encode(["success" => false]);
              exit;
            }

            if($myVote && $myVote->vote === 1) {
              // Update like
              updateVote($pdo, $id_user, $id_acteur, -1);
  
              http_response_code(200);
              echo json_encode(["success" => true]);
              exit;
            } 

            // Add dislike
            addVote($pdo, $id_user, $id_acteur, -1);

            http_response_code(201);
            echo json_encode(["success" => true]);
            break;
          case "like":
            // Check authenticated user
            checkAuth($pdo);

            // Lire le corps brut de la requête
            $rawInput = file_get_contents("php://input");

            // Décoder le JSON en tableau associatif
            $data = json_decode($rawInput, true); 
            $id_user = $data["id_user"];
            $id_acteur = $data["id_acteur"];

            $myVote = getVoteByIdUserAndIdActeur($pdo, $id_user, $id_acteur);

            if($myVote && $myVote->vote === 1) {
              http_response_code(401);
              echo json_encode(["success" => false]);
              exit;
            }

            if($myVote && $myVote->vote === -1) {
              // Update dislike
              updateVote($pdo, $id_user, $id_acteur, 1);
              
              http_response_code(200);
              echo json_encode(["success" => true]);
              exit;
            } 
            
            // Add like
            addVote($pdo, $id_user, $id_acteur, 1);

            http_response_code(201);
            echo json_encode(["success" => true]);
            break;
          case "add_user":
            // Lire le corps brut de la requête
            $rawInput = file_get_contents("php://input");

            // Décoder le JSON en tableau associatif
            $data = json_decode($rawInput, true); 

            // Add new account
            addUser($pdo, $data);

            http_response_code(201);
            echo json_encode(["message" => "Votre comptre a bien été crée."]);
            break;
          case "login_user":
            // Recupérer et convitir les donées en object PHP
            $data = (object) $_POST;
            
            // Recuperer l'utilisateur qui correspond celui qui est passé par le formulaire
            $user = getUserByUsername($pdo, $data->username);

            // Check user exist & verify password
            if(!$user || ($user && !password_verify($data->password, $user->password))) {
              http_response_code(404);
              echo json_encode(["message" => "Identifiants inconnus"]);
              exit();
            }

            // Cookie mode "httponly" TRUE
            // Générer un token aléatoire
            $token = bin2hex(random_bytes(32)); // 64 char
            $token_csrf = bin2hex(random_bytes(32)); // Cross-Site Request Forgery

            $expiry = time() + 86400; // 24h
            $createdAt = date('Y-m-d H:i:s');
            $expiryDate = date('Y-m-d H:i:s', $expiry);
            $id_user = $user->id_user; // ID user
   
            // Delete user token
            deleteUserToken($pdo, (int) $id_user);

            // Add user token
            addUserToken($pdo, $id_user, $token, $createdAt, $expiryDate, $token_csrf);

            // Set token cookie httponly
            set_cookie("auth_token", $token, false, true, $expiry);

            // Set CSRF token cookie non httponly
            set_cookie('XSRF-TOKEN', $token_csrf, false, false);

            http_response_code(201);
            echo json_encode(["message" => "Bienvenue dans votre espace!", "token_csrf" => $token_csrf]);
            break;
          case "add_comment":
            // Check authenticated user
            checkAuth($pdo);

            // Lire le corps brut de la requête
            $rawInput = file_get_contents("php://input");

            // Décoder le JSON en tableau associatif
            $data = json_decode($rawInput, true); 
            
            $id_user = htmlspecialchars($data['id_user']);
            $id_acteur = htmlspecialchars($data['id_acteur']);
            $post = $data['post'];

            // Add post
            addPost($pdo, $id_user, $id_acteur, $post);

            http_response_code(201);
            echo json_encode(["message" => "Commentaire posté!"]);
          break;
          default: throw new Exception("Route not found");
        }
        break;

      // Method GET
      case "GET":
        switch (htmlspecialchars($api)) {
          case "get_dislikes":
            // Check authenticated user
            checkAuth($pdo);

            if(
              empty($id_acteur) || 
              (!empty($id_acteur) && !is_numeric($id_acteur))
              ) {
              http_response_code(404);
              echo json_encode(["message" => "Identifiant acteur inconnu"]);
              exit;
            }

            // Get votes by id acteur
            $dislikes = getDislikesByIdActeur($pdo, $id_acteur);

            http_response_code(200);
            echo json_encode(["success" => true, "count" => $dislikes]);
            break;
          case "get_likes":
            // Check authenticated user
            checkAuth($pdo);

            if(
              empty($id_acteur) || 
              (!empty($id_acteur) && !is_numeric($id_acteur))
              ) {
              http_response_code(404);
              echo json_encode(["message" => "Identifiant acteur inconnu"]);
              exit;
            }

            // Get votes by id acteur
            $likes = getLikesByIdActeur($pdo, $id_acteur);

            http_response_code(200);
            echo json_encode(["success" => true, "count" => $likes]);
            break;
          case "get_posts":
            // Check authenticated user
            checkAuth($pdo);

            if(empty($id) || (!empty($id) && !is_numeric($id))) {
              http_response_code(404);
              echo json_encode(["message" => "Identifiant inconnue"]);
              exit;
            }

            // Get comments
            $posts = getPosts($pdo, $id);

            http_response_code(200);
            echo json_encode(['posts' => $posts]);
            break;
          case "get_acteur":
            // Check authenticated user
            checkAuth($pdo);

            if(empty($id) || (!empty($id) && !is_numeric($id))) {
              http_response_code(404);
              echo json_encode(["message" => "Identifiant inconnue"]);
              exit;
            }

            $acteur = getActeurById($pdo, $id);

            http_response_code(200);
            echo json_encode(['acteur' => $acteur]);
            break;
          case "get_acteurs":
            // Check authenticated user
            checkAuth($pdo);

            $acteurs = getActeurs($pdo);

            http_response_code(200);
            echo json_encode(['acteurs' => $acteurs]);
            break;
          case "get_current_user":
            // Check authenticated user
            checkAuth($pdo);

            // Get token from cooke httponly
            $tokenCookie = $_COOKIE['auth_token'];
            // Get auth token
            $user = getAuthToken($pdo, $tokenCookie);

            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Bienvenue dans votre espace!", "user" => $user]);
            break;
          case "signout_user":
            // Check authenticated user
            checkAuth($pdo);

            // Get token from cooke httponly
            $tokenCookie = $_COOKIE['auth_token'];
            // Get auth token
            $user = getAuthToken($pdo, $tokenCookie);

            // Delete user token
            deleteUserToken($pdo, (int) $user->id_user);

            // Set cookie to 1h ago & remove
            unset_cookie('auth_token', false, true);
            unset_cookie('XSRF-TOKEN', false, false);

            http_response_code(200);
            echo json_encode([ "success" => true, "message" => "Vous vous êtes bien déconnecté!"]);
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
