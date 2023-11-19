<?php

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Conexión a la base de datos (ajusta los detalles según tu configuración)
    $conn = new mysqli("localhost", "root", "", "ventaexpress");

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Recuperar datos del formulario
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Verificar si el correo electrónico ya existe en la base de datos
    $checkEmailQuery = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($checkEmailQuery);

    if ($result->num_rows > 0) {
        // Correo electrónico ya existe
        echo "Error: Este correo electrónico ya está registrado.";
    } else {
        // Insertar usuario en la base de datos
        $insertQuery = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

        if ($conn->query($insertQuery) === TRUE) {
            echo "Usuario registrado exitosamente.";
        } else {
            echo "Error al registrar el usuario: " . $conn->error;
        }
    }

    // Cerrar la conexión
    $conn->close();
}

?>

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="src/css/register.css">
    <title>Registro</title>
</head>
<body>
    <form action="register.php" method="post">
        <h2>Registro</h2>
        <label for="name">Nombre:</label>
        <input type="text" name="name" required>
        <br>
        <label for="email">Correo electrónico:</label>
        <input type="email" name="email" required>
        <br>
        <label for="password">Contraseña:</label>
        <input type="password" name="password" required>
        <br>
        <button type="submit">Registrar</button>
    </form>

    <p>Ya tienes una cuenta? <a href="login.php">Inicia sesión aquí</a>.</p>
</body>
</html>
