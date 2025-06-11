<?php
require 'config.php';

$bodega_id = $_GET['bodega_id'] ?? 0;

$stmt = $pdo->prepare("SELECT id, nombre FROM sucursales WHERE bodega_id = :id");
$stmt->execute(['id' => $bodega_id]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
