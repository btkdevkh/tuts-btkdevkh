<?php

function checkAuth (PDO $pdo) {
  // Lire le token (cookie httponly)
  if (!isset($_COOKIE['auth_token'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Non authentifié']);
    exit;
  }

  // Get token from cooke httponly
  $tokenCookie = $_COOKIE['auth_token'];

  // Get token from cooke non httponly
  $tokenCSRF = $_SERVER["HTTP_X_CSRF_TOKEN"] ?? null;

  // Get auth token
  $user = getAuthToken($pdo, $tokenCookie);

  // Check authentication with "token httponly" and "token CSRF"
  if (!$user || ($user && $user->token_csrf !== $tokenCSRF)) {
    http_response_code(401);
    echo json_encode(['error' => 'Token invalide ou expiré']);
    exit;
  }
}
