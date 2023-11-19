<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ventaexpress";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Operación para agregar un nuevo producto
if ($_POST['accion'] == 'agregarProducto') {
    $nombre = $_POST['nombreProducto'];
    $precio = $_POST['precioProducto'];

    $sql = "INSERT INTO productos (nombre, precio) VALUES ('$nombre', '$precio')";

    if ($conn->query($sql) === TRUE) {
        echo "Producto agregado correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close(); // Cierra la conexión después de realizar la operación
    exit(); // Finaliza la ejecución del script para evitar más salida
}

// Operación para obtener la lista de productos
if ($_GET['accion'] == 'obtenerProductos') {
    $sql = "SELECT id, nombre, precio FROM productos";
    $result = $conn->query($sql);

    $productos = array();

    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }

    echo json_encode($productos);
}

$conn->close();
?>
