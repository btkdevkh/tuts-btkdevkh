<?php

require_once 'config.php';

// Singleton design pattern 
function getPdo () {
  static $db = null;

  if($db === null) {
    $db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
  } 

  return $db;
}