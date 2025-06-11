<?php
require 'config.php';

$codigo = $_GET['codigo'] ?? '';

$stmt = $pdo->prepare("SELECT id FROM productos WHERE codigo = ?");
$stmt->execute([$codigo]);

echo json_encode([
  "exists" => $stmt->rowCount() > 0
]);
