<?php
$host = 'localhost';
$db   = 'productos_app';
$user = 'postgres';
$pass = 'Plampe.276';
$charset = 'utf8';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    exit;
}
?>