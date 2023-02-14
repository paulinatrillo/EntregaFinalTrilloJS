const nombreCliente = prompt("Ingrese su nombre:");
console.log(`Bienvenido/a, ${nombreCliente}!`);
alert ("¡Bienvenido/a a nuestra tienda online!")

const nombreProductoBuscado = prompt("Ingrese el nombre del producto que desea buscar: Cómoda degradé, Cómoda verde, Mesas de luz azules o Mesas de luz verdes");
const productoBuscado = arrayProductos.find(producto => producto.nombre === nombreProductoBuscado);

if (productoBuscado) {
  console.log("Encontré el producto:", productoBuscado);
} else {
  console.log("No encontré el producto buscado.");
}

class Producto {
    constructor (nombre, precio, url){
        this.nombre = nombre;
        this.precio = precio;
        this.url = url;
    }
}

const comodadegrade = new Producto ( "Cómoda degradé", 10500, "img/comodadegrade.jpeg");
const comodaverde = new Producto ( "Cómoda verde", 11500, "img/comodaverde.jpg");
const mesitasazules = new Producto ( "Mesitas azules", 9500, "img/mesitasazul.jpeg");
const mesitasverdes = new Producto ( "Mesitas verdes", 10500, "img/mesitasverde.jpg");

const arrayProductos = [comodadegrade, comodaverde, mesitasazules, mesitasverdes];

const contenedorProductos = document.getElementById ("contenedorProductos");

arrayProductos.forEach (producto => {
 const div = document.createElement ("div");
 div.className = "caja";
 div.innerHTML =  `<p class = "titulo"> Nombre: ${producto.nombre} </p> 
                   <p class = "titulo"> Precio: ${producto.precio} </p> 
                   <img class = "antiguobazar" src = "${producto.url}">
                   <button class = "boton"> Agregar al carrito </button>`;

                   contenedorProductos.appendChild(div);

})

