<?php

function addActeur (PDO $pdo, $acteur, $description, $logo) {
   $stmt = $pdo->prepare(
    "INSERT INTO acteur (
      acteur,
      description,
      logo
    ) VALUES (?, ?, ?)"
  );
  $stmt->execute([$acteur, $description, $logo]);
  $stmt->closeCursor();
}
