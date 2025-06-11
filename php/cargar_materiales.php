<?php
require 'config.php';

$stmt = $pdo->query("SELECT id, nombre FROM materiales");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
