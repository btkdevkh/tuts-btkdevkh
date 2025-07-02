<?php

function getVotesByIdUserAndIdActeur (PDO $pdo, $id_user, $id_acteur) {
  $req = "SELECT * FROM vote WHERE id_user = :id_user AND id_acteur = :id_acteur";
  $stmt = $pdo->prepare($req);
  $stmt->execute([":id_user" => $id_user, ":id_acteur" => $id_acteur]);
  $votes = $stmt->fetchAll(PDO::FETCH_OBJ);
  $count =  count($votes);
  $stmt->closeCursor();
  return $count;
}
