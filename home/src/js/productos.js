document.addEventListener('DOMContentLoaded', function () {
    // Cargamos la lista de productos al cargar la página
    obtenerProductos();

    // Configuramos el evento 'submit' del formulario para evitar que la página se recargue
    var form = document.getElementById('formularioProducto');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita la recarga de la página al enviar el formulario
        agregarProducto();
    });
});

// Función para agregar un nuevo producto
function agregarProducto() {
    var nombre = document.getElementById('nombreProducto').value;
    var precio = document.getElementById('precioProducto').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server_productos.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
            obtenerProductos(); // Actualizamos la lista de productos después de agregar uno nuevo
        }
    };

    // Los datos se envían como una cadena codificada
    xhr.send("accion=agregarProducto&nombreProducto=" + encodeURIComponent(nombre) +
        "&precioProducto=" + encodeURIComponent(precio));
}

// Función para obtener la lista de productos
function obtenerProductos() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "server_productos.php?accion=obtenerProductos", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var productos = JSON.parse(xhr.responseText);
            var listaProductos = document.getElementById('listaProductos');
            listaProductos.innerHTML = ""; // Limpiamos el contenido actual

            // Agregamos elementos de lista para cada producto
            for (var i = 0; i < productos.length; i++) {
                var listItem = document.createElement("li");
                listItem.textContent = `Nombre: ${productos[i].nombre}, Precio: ${productos[i].precio}`;
                listaProductos.appendChild(listItem);
            }
        }
    };
    xhr.send();
}
