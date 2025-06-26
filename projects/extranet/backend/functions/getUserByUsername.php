<?php

function getUserByUsername (PDO $pdo, string $username) {
  $req = "SELECT * FROM account WHERE username = ?";
  $stmt = $pdo->prepare($req);
  $stmt->execute([$username]);
  $user = $stmt->fetch(PDO::FETCH_OBJ);
  $stmt->closeCursor();
  return $user;
}

