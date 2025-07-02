<?php

function updateVote (PDO $pdo, $id_user, $id_acteur, $vote) {
  $stmt = $pdo->prepare(
    "UPDATE vote SET vote = :vote WHERE id_user = :id_user AND id_acteur = :id_acteur"
  );
  $stmt->execute([
    ':id_user' => $id_user,
    ':id_acteur' => $id_acteur,
    ':vote' => $vote
  ]);
  $stmt->closeCursor();
}
