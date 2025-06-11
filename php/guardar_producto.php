<?php
require 'config.php';

$codigo = $_POST['codigo'] ?? '';
$nombre = $_POST['nombre'] ?? '';
$bodega = $_POST['bodega'] ?? '';
$sucursal = $_POST['sucursal'] ?? '';
$moneda = $_POST['moneda'] ?? '';
$precio = $_POST['precio'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$materiales = $_POST['materiales'] ?? [];

header('Content-Type: application/json');

// 1. Verificar unicidad del código
$check = $pdo->prepare("SELECT id FROM productos WHERE codigo = ?");
$check->execute([$codigo]);
if ($check->rowCount() > 0) {
    echo json_encode(["status" => "error", "message" => "El código del producto ya está registrado."]);
    exit;
}

try {
    // 2. Insertar el producto
    $pdo->beginTransaction();
    $stmt = $pdo->prepare("INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion)
                           VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$codigo, $nombre, $bodega, $sucursal, $moneda, $precio, $descripcion]);

    $productoId = $pdo->lastInsertId();

    // 3. Insertar los materiales seleccionados
    $stmtMat = $pdo->prepare("INSERT INTO producto_material (producto_id, material_id) VALUES (?, ?)");
    foreach ($materiales as $matId) {
        $stmtMat->execute([$productoId, $matId]);
    }

    $pdo->commit();
    echo json_encode(["status" => "ok"]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => "Error al guardar producto: " . $e->getMessage()]);
}
?>