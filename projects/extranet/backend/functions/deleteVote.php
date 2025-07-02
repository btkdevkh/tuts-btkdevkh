<?php

function deleteVote (PDO $pdo, $id_user, $id_acteur) {
  $stmt = $pdo->prepare(
    "DELETE FROM vote WHERE id_user = :id_user AND id_acteur = :id_acteur"
  );
  $stmt->execute([
    ':id_user' => $id_user,
    ':id_acteur' => $id_acteur,
  ]);
  $stmt->closeCursor();
}
