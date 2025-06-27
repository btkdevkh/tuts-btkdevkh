<?php

function addUserToken (PDO $pdo, $id_user, $token, $createdAt, $expiryDate) {
  // Insert token in "auth_token" table
  $req = "INSERT INTO auth_token (
    id_user, 
    token, 
    created_at, 
    expired_at
  ) VALUES (?, ?, ?, ?)";
  $stmt = $pdo->prepare($req);
  $stmt->execute([$id_user, $token, $createdAt, $expiryDate]);
}
