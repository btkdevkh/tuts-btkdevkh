<?php

function getVoteByIdUserAndIdActeur (PDO $pdo, $id_user, $id_acteur) {
  $req = "SELECT * FROM vote WHERE id_user = :id_user AND id_acteur = :id_acteur";
  $stmt = $pdo->prepare($req);
  $stmt->execute([":id_user" => $id_user, ":id_acteur" => $id_acteur]);
  $vote = $stmt->fetch(PDO::FETCH_OBJ);
  $stmt->closeCursor();
  return $vote;
}
