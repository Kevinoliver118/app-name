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

// Operación para agregar un nuevo proveedor
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion']) && $_POST['accion'] == 'agregarProveedor') {
    $nombre = $_POST['nombreProveedor'];
    $direccion = $_POST['direccionProveedor'];
    $telefono = $_POST['telefonoProveedor'];

    $sql = "INSERT INTO proveedores (nombre, direccion, telefono) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nombre, $direccion, $telefono);

    if ($stmt->execute()) {
        echo "Proveedor agregado correctamente";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close(); // Cierra la declaración preparada
    $conn->close(); // Cierra la conexión después de realizar la operación
    exit(); // Finaliza la ejecución del script para evitar más salida
}

// Operación para obtener la lista de proveedores
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['accion']) && $_GET['accion'] == 'obtenerProveedores') {
    $sql = "SELECT id, nombre FROM proveedores";
    $result = $conn->query($sql);

    $proveedores = array();

    while ($row = $result->fetch_assoc()) {
        $proveedores[] = $row;
    }

    echo json_encode($proveedores);
    $conn->close(); // Cierra la conexión después de realizar la operación
    exit(); // Finaliza la ejecución del script
}
?>
