<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ventaexpress";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_POST['accion'] == 'registrarIngreso') {
    $producto = $_POST['producto'];
    $cantidad = $_POST['cantidad'];
    $precio = $_POST['precio'];

    // Registra el ingreso
    $sqlIngreso = "INSERT INTO ingresos (producto, cantidad, precio) VALUES ('$producto', '$cantidad', '$precio')";
    if ($conn->query($sqlIngreso) !== TRUE) {
        echo "Error al registrar ingreso: " . $conn->error;
        exit();
    }

    // Registra la venta
    $sqlVenta = "INSERT INTO ventas (producto, cantidad, total) VALUES ('$producto', '$cantidad', '$precio')";
    if ($conn->query($sqlVenta) !== TRUE) {
        echo "Error al registrar venta: " . $conn->error;
        exit();
    }

    echo "Ingreso registrado y venta realizada correctamente";
    $conn->close();
    exit();
}

if ($_GET['accion'] == 'obtenerVentas') {
    $sql = "SELECT producto, cantidad, precio * cantidad AS total FROM ventas";
    $result = $conn->query($sql);

    $ventas = array();

    while ($row = $result->fetch_assoc()) {
        $ventas[] = $row;
    }

    echo json_encode($ventas);
}

$conn->close();
?>
