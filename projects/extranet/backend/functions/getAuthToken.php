<?php

function getAuthToken (PDO $pdo, string $tokenCookie) {
  // Get token from "auth_token" table in SQL
  // Requête pour retrouver l'utilisateur à partir du token
  $sql = "SELECT t.token_csrf, u.id_user, u.nom, u.prenom
    FROM auth_token t
    JOIN account u ON u.id_user = t.id_user
    WHERE t.token = ?
    AND t.expired_at > t.created_at
    LIMIT 1
  ";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$tokenCookie]);
  $user = $stmt->fetch(PDO::FETCH_OBJ);
  return $user;
}
