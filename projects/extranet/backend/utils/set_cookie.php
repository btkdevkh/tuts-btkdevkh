<?php

function set_cookie (string $cookie_name, string $token, bool $secure, bool $httponly, $expiry = null) {
  setcookie(
    $cookie_name,         
    $token,              
    [
      'expires' => $expiry,
      'path' => '/',
      'domain' => '',
      'secure' => $secure, 
      'httponly' => $httponly, // Inaccessible en JavaScript
      'samesite' => 'Lax'  // ou 'Strict' selon le besoin
    ]
  );
}
