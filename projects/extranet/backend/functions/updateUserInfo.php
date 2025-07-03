<?php

function updateUserInfo (PDO $pdo, $id_user, $username, $question, $reponse, $newPassword) {
  $req = "UPDATE account SET 
    username = :username,
    question = :question,
    reponse = :reponse";

  if (!empty($newPassword)) {
    $req .= ", password = :newPassword";
  }

  $req .= " WHERE id_user = :id_user";

  $stmt = $pdo->prepare($req);

  $params = [
    ':id_user' => $id_user,
    ':username' => $username,
    ':question' => $question,
    ':reponse' => $reponse
  ];

  if (!empty($newPassword)) {
    $params[':newPassword'] = password_hash($newPassword, PASSWORD_DEFAULT);
  }

  $stmt->execute($params);

  $affectedRows = $stmt->rowCount(); 

  $stmt->closeCursor();

  return $affectedRows > 0;
}
