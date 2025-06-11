<?php
require 'config.php';

$stmt = $pdo->query("SELECT id, nombre FROM bodegas");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>