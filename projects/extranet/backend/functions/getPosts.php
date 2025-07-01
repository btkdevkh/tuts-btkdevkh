<?php

function getPosts (PDO $pdo, $id_acteur) {
  $req = "SELECT p.id_post, p.date_add, p.post, u.prenom FROM post p JOIN account u ON u.id_user = p.id_user WHERE p.id_acteur = ? ORDER BY p.date_add DESC";
  $stmt = $pdo->prepare($req);
  $stmt->execute([$id_acteur]);
  $posts = $stmt->fetchAll(PDO::FETCH_OBJ);
  $stmt->closeCursor();
  return $posts;
}
