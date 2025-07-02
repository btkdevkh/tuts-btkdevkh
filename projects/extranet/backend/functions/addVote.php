<?php

function addVote (PDO $pdo, $id_user, $id_acteur) {
  $stmt = $pdo->prepare(
    "INSERT INTO vote (
      id_user, 
      id_acteur, 
      vote
    ) VALUES (
      :id_user, 
      :id_acteur, 
      :vote
    )"
  );

  $stmt->execute([
    ':id_user' => $id_user,
    ':id_acteur' => $id_acteur,
    ':vote' => 1
  ]);
  $stmt->closeCursor();
}
