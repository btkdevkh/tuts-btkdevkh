<?php

function getDislikesByIdActeur (PDO $pdo, $id_acteur) {
  $req = "SELECT * FROM vote WHERE id_acteur = :id_acteur AND vote = :vote";
  $stmt = $pdo->prepare($req);
  $stmt->execute([":id_acteur" => $id_acteur, ":vote" => -1]);
  $dislikes = $stmt->fetchAll(PDO::FETCH_OBJ);
  $countDislikes = count($dislikes);
  $stmt->closeCursor();
  return $countDislikes;
}
