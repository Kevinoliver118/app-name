document.addEventListener('DOMContentLoaded', function () {
    // Cargamos la lista de proveedores al cargar la página
    obtenerProveedores();

    // Configuramos el evento 'submit' del formulario para evitar que la página se recargue
    var form = document.getElementById('formularioProveedor');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita la recarga de la página al enviar el formulario
        agregarProveedor();
    });
});

// Función para agregar un nuevo proveedor
function agregarProveedor() {
    var nombre = document.getElementById('nombreProveedor').value;
    var direccion = document.getElementById('direccionProveedor').value;
    var telefono = document.getElementById('telefonoProveedor').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
            obtenerProveedores(); // Actualizamos la lista de proveedores después de agregar uno nuevo
        }
    };

    // Los datos se envían como una cadena codificada
    xhr.send("accion=agregarProveedor&nombreProveedor=" + encodeURIComponent(nombre) +
        "&direccionProveedor=" + encodeURIComponent(direccion) +
        "&telefonoProveedor=" + encodeURIComponent(telefono));
}

// Función para obtener la lista de proveedores
function obtenerProveedores() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "server.php?accion=obtenerProveedores", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var proveedores = JSON.parse(xhr.responseText);
            var listaProveedores = document.getElementById('listaProveedores');
            listaProveedores.innerHTML = ""; // Limpiamos el contenido actual

            // Agregamos elementos de lista para cada proveedor
            for (var i = 0; i < proveedores.length; i++) {
                var listItem = document.createElement("li");
                listItem.textContent = proveedores[i].nombre;
                listaProveedores.appendChild(listItem);
            }
        }
    };
    xhr.send();
}
