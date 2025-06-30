<?php

function getActeurById (PDO $pdo, $id) {
  $req = "SELECT * FROM acteur WHERE id_acteur = :id";
  $stmt = $pdo->prepare($req);
  $stmt->execute([":id" => $id]);
  $acteur = $stmt->fetch(PDO::FETCH_OBJ);
  $stmt->closeCursor();
  return $acteur;
}
