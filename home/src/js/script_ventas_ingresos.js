document.addEventListener('DOMContentLoaded', function () {
    // Configuramos el evento 'submit' del formulario de ingreso
    var formIngreso = document.getElementById('formularioIngreso');
    formIngreso.addEventListener('submit', function (event) {
        event.preventDefault();
        registrarIngreso();
    });

    // Cargamos la lista de ventas al cargar la página
    obtenerVentas();
});

// Función para registrar un nuevo ingreso
function registrarIngreso() {
    var producto = document.getElementById('productoIngreso').value;
    var cantidad = document.getElementById('cantidadIngreso').value;
    var precio = document.getElementById('precioIngreso').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server_ventas_ingresos.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
            obtenerVentas(); // Actualizamos la lista de ventas después de registrar un ingreso
        }
    };

    xhr.send("accion=registrarIngreso&producto=" + encodeURIComponent(producto) +
        "&cantidad=" + encodeURIComponent(cantidad) +
        "&precio=" + encodeURIComponent(precio));
}

// Función para obtener la lista de ventas
function obtenerVentas() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "server_ventas_ingresos.php?accion=obtenerVentas", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var ventas = JSON.parse(xhr.responseText);
            var listaVentas = document.getElementById('listaVentas');
            listaVentas.innerHTML = "";

            for (var i = 0; i < ventas.length; i++) {
                var listItem = document.createElement("li");
                listItem.textContent = `Producto: ${ventas[i].producto}, Cantidad: ${ventas[i].cantidad}, Total: ${ventas[i].total}`;
                listaVentas.appendChild(listItem);
            }
        }
    };
    xhr.send();
}
