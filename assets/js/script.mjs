import Producto from "./Producto.mjs";
import Carrito from "./Carrito.mjs";

// funcion para mostrar los productos

function mostrarProductos(productosDisponibles) {
  return productosDisponibles
    .map(
      (producto, index) =>
        `${index + 1}.- ${producto.nombre} ${producto.precio}`
    )
    .join("\n");
}

// funcion para seleccionar producto

function seleccionarProducto(productoDisponibles) {
  let seleccion;
  let productoSelecionado = null;

  while (!productoSelecionado) {
    seleccion = parseInt(
      prompt("Productos disponibles:\n" + mostrarProductos(productoDisponibles))
    );

    if (
      isNaN(seleccion) ||
      seleccion < 1 ||
      seleccion > productoDisponibles.length
    ) {
      alert("Seleccion no válida, intente nuevamente");
    } else {
      productoSelecionado = productoDisponibles[seleccion - 1];
    }
  }

  return productoSelecionado;
}

// función para pedir cantidad del producto

function pedirCantidad() {
  let cantidad;

  while (true) {
    cantidad = parseInt(prompt("Ingresa la cantidad de unidades:"));
    if (!isNaN(cantidad) && cantidad > 0) {
      break;
    } else {
      alert("Cantidad no válida. Intente nuevamente.");
    }
  }
  return cantidad;
}

// Gestion de la compra

function gestionarCompra() {
  const productosDisponibles = [
    new Producto("Leche", 1000),
    new Producto("Pan de Molde", 2000),
    new Producto("Queso", 1200),
    new Producto("Mermelada", 890),
    new Producto("Azucar", 1300),
  ];

  const carrito = new Carrito();

  let continuar = true;
  let cantidadProducto;

  while (continuar) {
    const productoSelecionado = seleccionarProducto(productosDisponibles);
    cantidadProducto = pedirCantidad();
    productoSelecionado.cantidad = cantidadProducto;
    carrito.agregarProductos(productoSelecionado);

    continuar =
      prompt("¿Deseas seguir agregando productos? (s/n):").toLowerCase() ===
      "s";
  }

  carrito.finalizarCompra();
}

gestionarCompra();
