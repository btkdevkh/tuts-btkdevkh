<?php

function deleteUserToken (PDO $pdo, int $id_user) {
  // Supprimer tous les anciens tokens de cet utilisateur
  $pdo->prepare("DELETE FROM auth_token WHERE id_user = ?")->execute([$id_user]);
}
