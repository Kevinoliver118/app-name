<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "laravel";

$conexion = new mysqli($servername, $username, $password, $dbname);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombreProducto = $_POST["nombreProducto"];
    $precioProducto = $_POST["precioProducto"];

    if (!empty($nombreProducto) && is_numeric($precioProducto) && $precioProducto > 0) {
        $query = "INSERT INTO productos (nombre, precio) VALUES ('$nombreProducto', $precioProducto)";
        $resultado = $conexion->query($query);

        if ($resultado) {
            echo "Producto agregado correctamente.";
        } else {
            echo "Error al agregar el producto: " . $conexion->error;
        }
    } else {
        echo "Por favor, ingresa un nombre y un precio válido para el producto.";
    }
}

$conexion->close();
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VentaExpress - Contabilidad</title>
    <link rel="stylesheet" href="../capa-presentacion/style.css">
</head>

<body>

    <div class="contenedor">
        <div class="menu-lateral">
            <img class="header-image" src="../capa-presentacion/img/1.2.jpg" alt="Imagen de encabezado de VentaExpress">
            <h1>VentaExpress</h1>
            <ul>
                <li class="opcion">
                    <!-- ... (otros elementos del menú) ... -->
                </li>
            </ul>
        </div>

        <div class="contenido">
            <h2>Contabilidad</h2>

            <!-- Mostrar Voucher de Compra -->
            <div id="voucher">
                <h3>Voucher de Compra</h3>
                <p>Fecha: <span id="fechaVoucher"></span></p>
                <p>Proveedor: <span id="proveedorVoucher"></span></p>
                <p>Total: <span id="totalVoucher"></span></p>
                <ul id="productosVoucher"></ul>
            </div>

            <!-- Formulario para Agregar Productos -->
            <h3>Agregar Producto</h3>
            <form id="formularioProducto" method="post" action="contabilidad.php">
                <label for="nombreProducto">Nombre del Producto:</label>
                <input type="text" id="nombreProducto" name="nombreProducto" required>

                <label for="precioProducto">Precio del Producto:</label>
                <input type="number" id="precioProducto" name="precioProducto" step="0.01" required>

                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
    <script src="contabilidad.js"></script>
</body>

</html>
