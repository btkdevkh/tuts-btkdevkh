<?php

function set_header () {
  header("Access-Control-Allow-Origin: http://localhost:5173");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, x-csrf-token");
  header("Content-Type: application/json");
}
