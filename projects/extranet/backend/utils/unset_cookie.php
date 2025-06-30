<?php

function unset_cookie (string $cookie_name, bool $secure, bool $httponly) {
   setcookie(
    $cookie_name,         
    "",              
    [
      'expires' => time() - 3600,
      'path' => '/',
      'domain' => '',
      'secure' => $secure, 
      'httponly' => $httponly, 
      'samesite' => 'Lax'  
    ]
  );
}