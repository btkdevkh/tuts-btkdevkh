<?php

function addUser (PDO $pdo, $data) {
  // Add new account to database
  $nom = $data['nom'];
  $prenom = $data['prenom'];
  $username = $data['username'];
  $password = $data['password'];
  $question = $data['question'];
  $reponse = $data['reponse'];

  $stmt = $pdo->prepare(
    "INSERT INTO account (
      nom, 
      prenom, 
      username, 
      password, 
      question, 
      reponse
    ) VALUES (
      :nom, 
      :prenom, 
      :username, 
      :password, 
      :question, 
      :reponse
    )"
  );

  $stmt->execute([
    ':nom' => $nom,
    ':prenom' => $prenom,
    ':username' => $username,
    ':password' => password_hash($password, PASSWORD_DEFAULT), // Hash du mot de passe
    ':question' => $question,
    ':reponse' => $reponse
  ]);
  $stmt->closeCursor();
}
