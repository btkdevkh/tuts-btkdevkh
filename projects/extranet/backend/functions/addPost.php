<?php

function addPost (PDO $pdo, $id_user, $id_acteur, $post) {
  $stmt = $pdo->prepare(
    "INSERT INTO post (
      id_user, 
      id_acteur, 
      date_add,
      post
    ) VALUES (
      :id_user, 
      :id_acteur, 
      NOW(), 
      :post
    )"
  );

  $stmt->execute([
    ':id_user' => $id_user,
    ':id_acteur' => $id_acteur,
    ':post' => $post
  ]);
  $stmt->closeCursor();
}
