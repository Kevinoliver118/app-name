document.addEventListener("DOMContentLoaded", () => {
    // Puedes cargar la información del voucher desde la base de datos aquí.
    // En este ejemplo, se utiliza información estática.

    const fechaVoucher = "2023-11-15";
    const proveedorVoucher = "Proveedor Ejemplo";
    const totalVoucher = 150.00;
    const productosVoucher = [
        { nombre: "Producto 1", precio: 50.00 },
        { nombre: "Producto 2", precio: 30.00 },
        { nombre: "Producto 3", precio: 70.00 },
    ];

    // Mostrar información del voucher
    document.getElementById("fechaVoucher").textContent = fechaVoucher;
    document.getElementById("proveedorVoucher").textContent = proveedorVoucher;
    document.getElementById("totalVoucher").textContent = totalVoucher.toFixed(2);

    const listaProductosVoucher = document.getElementById("productosVoucher");
    productosVoucher.forEach(producto => {
        const nuevoItem = document.createElement("li");
        nuevoItem.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaProductosVoucher.appendChild(nuevoItem);
    });
});

