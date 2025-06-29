<?php

function getActeurs (PDO $pdo) {
  $req = "SELECT * FROM acteur";
  $stmt = $pdo->prepare($req);
  $stmt->execute();
  $acteurs = $stmt->fetchAll(PDO::FETCH_OBJ);
  $stmt->closeCursor();
  return $acteurs;
}
