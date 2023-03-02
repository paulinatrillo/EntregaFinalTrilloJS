const nombreCliente = prompt("Ingrese su nombre:");
console.log(`Bienvenido/a, ${nombreCliente}!`);
alert ("¡Bienvenido/a a nuestra tienda online!")

class Producto {
    constructor (id, nombre, precio, url){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.url = url;
        this.cantidad = 1;
    }
}

const comodadegrade = new Producto (1,"Cómoda degradé", 10500, "img/comodadegrade.jpeg");
const comodaverde = new Producto (2, "Cómoda verde", 11500, "img/comodaverde.jpg");
const mesitasazules = new Producto (3,"Mesas de luz azules", 9500, "img/mesitasazul.jpeg");
const mesitasverdes = new Producto (4,"Mesas de luz verdes", 10500, "img/mesitasverde.jpg");

const arrayProductos = [comodadegrade, comodaverde, mesitasazules, mesitasverdes];

console.log (arrayProductos);

let carrito = [];

const contenedorProductos = document.getElementById ("contenedorProductos");

const mostrarProductos = () => {
arrayProductos.forEach (producto => {
 const div = document.createElement ("div");
 div.className = "caja";
 div.innerHTML =  `<p class = "titulo"> Nombre: ${producto.nombre} </p> 
                   <p class = "titulo"> Precio: ${producto.precio} </p> 
                   <img class = "antiguobazar" src = "${producto.url}">
                   <button class = "btn" id="boton${producto.id}"> Agregar al carrito </button>`;

                   contenedorProductos.appendChild(div);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id);

    })
})
}

mostrarProductos();

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find (producto => producto.id === id);
  if (productoEnCarrito){
    productoEnCarrito.cantidad++;
  }else {
    const producto = arrayProductos.find (producto => producto.id === id);
    carrito.push (producto);
  }
  calcularTotal();
}

const contenedorCarrito = document.getElementById ("contenedorCarrito");
const verCarrito = document.getElementById ("verCarrito");

verCarrito.addEventListener ("click", () =>{
 mostrarCarrito();
})

const mostrarCarrito = () =>{
  contenedorCarrito.innerHTML = "";
  carrito.forEach (producto => {
    const div = document.createElement ("div");
    div.className = "caja";
    div.innerHTML =  `<p class = "titulo"> Nombre: ${producto.nombre} </p> 
                   <p class = "titulo"> Precio: ${producto.precio} </p> 
                   <p class = "titulo"> Cantidad: ${producto.cantidad} </p>
                   <img class = "antiguobazar" src = "${producto.url}">
                   <button class = "btn" id="eliminar${producto.id}"> Eliminar producto </button>`;

                   contenedorCarrito.appendChild(div);
  
    const boton = document.getElementById (`eliminar${producto.id}`);
    boton.addEventListener ("click", ()=> {
      eliminarDelCarrito(producto.id);
    })
    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
  const producto = carrito.find(producto => producto.id === id);
  if (producto.cantidad > 1) {
    producto.cantidad--;
  } else {
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
  }
  mostrarCarrito();
}

const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach (producto => {
    totalCompra += producto.precio * producto.cantidad;
  })
total.innerHTML = `$${totalCompra}`;
} 

const vaciarCarrito = document.getElementById ("vaciarCarrito");

vaciarCarrito.addEventListener("click", ()=>{
  eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () =>{
  carrito =[];
  mostrarCarrito();
}



const nombreProductoBuscado = prompt("Ingrese el nombre del producto que desea buscar: Cómoda degradé, Cómoda verde, Mesas de luz azules o Mesas de luz verdes");
const productoBuscado = arrayProductos.find(producto => producto.nombre === nombreProductoBuscado);

if (productoBuscado) {
  console.log("Encontré el producto:", productoBuscado);
} else {
  console.log("No encontré el producto buscado!");
}

