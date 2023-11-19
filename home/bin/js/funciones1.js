const productos = [
    { id: 1, nombre: "Producto 1", precio: 20.00 },
    { id: 2, nombre: "Producto 2", precio: 15.00 },
    { id: 3, nombre: "Producto 3", precio: 25.00 },
    // ... más productos ...
];

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);
    document.getElementById("buscador").addEventListener("input", filtrarProductos);
});

function mostrarProductos(lista) {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";

    lista.forEach(producto => {
        const elementoProducto = document.createElement("div");
        elementoProducto.innerHTML = `
            <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        listaProductos.appendChild(elementoProducto);
    });
}

function filtrarProductos() {
    const textoBuscador = document.getElementById("buscador").value.toLowerCase();
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBuscador)
    );
    mostrarProductos(productosFiltrados);
}

function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);

    if (productoSeleccionado) {
        // Puedes almacenar el carrito en localStorage o enviar la información al servidor (PHP).
        // Aquí simplemente actualizamos la interfaz del carrito.

        const listaCarrito = document.getElementById("lista-carrito");
        const totalCarrito = document.getElementById("total-carrito");

        const nuevoItem = document.createElement("li");
        nuevoItem.textContent = `${productoSeleccionado.nombre} - $${productoSeleccionado.precio.toFixed(2)}`;
        listaCarrito.appendChild(nuevoItem);

        const totalActual = parseFloat(totalCarrito.textContent);
        totalCarrito.textContent = (totalActual + productoSeleccionado.precio).toFixed(2);
    }
}