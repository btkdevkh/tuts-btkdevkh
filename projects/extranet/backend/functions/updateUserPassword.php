<?php

function updateUserPassword (PDO $pdo, $id_user, $newPassword) {
  $req = "UPDATE account 
    SET password = :newPassword
    WHERE id_user = :id_user";

  $stmt = $pdo->prepare($req);

  $stmt->execute([
    ':id_user' => $id_user,
    ':newPassword' => password_hash($newPassword, PASSWORD_DEFAULT)
  ]);

  $affectedRows = $stmt->rowCount(); 

  $stmt->closeCursor();

  return $affectedRows > 0;
}
