<?php

function getLikesByIdActeur (PDO $pdo, $id_acteur) {
  $req = "SELECT * FROM vote WHERE id_acteur = :id_acteur AND vote = :vote";
  $stmt = $pdo->prepare($req);
  $stmt->execute([":id_acteur" => $id_acteur, ":vote" => 1]);
  $likes = $stmt->fetchAll(PDO::FETCH_OBJ);
  $countLikes = count($likes);
  $stmt->closeCursor();
  return $countLikes;
}
