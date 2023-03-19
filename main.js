const usuarios = {
  "usuario1": "contraseña1",
  "usuario2": "contraseña2",
  "usuario3": "contraseña3",
};

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (usuarios[username] && usuarios[username] === password) {
    console.log(`Bienvenido/a, ${username}!`);
    alert("¡Bienvenido/a a nuestra tienda online!");
    loginForm.reset();
    mostrarProductos();
  } else {
    alert("Nombre de usuario o contraseña incorrectos");
  }
});

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

if (localStorage.getItem("carrito")){
  carrito = JSON.parse(localStorage.getItem ("carrito"));
}

const contenedorProductos = document.getElementById ("contenedorProductos");

const mostrarProductos = () => {
  arrayProductos.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "caja";
    div.innerHTML = `<p class="titulo">Nombre: ${producto.nombre}</p> 
                   <p class="titulo">Precio: $${producto.precio}</p> 
                   <img class="antiguobazar" src="${producto.url}">
                   <div>
                     <button class="btn" id="restar${producto.id}" disabled>-</button>
                     <span class="cantidad" id="cantidad${producto.id}">1</span>
                     <button class="btn" id="sumar${producto.id}">+</button>
                   </div>
                   <button class="btn agregar-carrito" id="boton${producto.id}">Agregar al carrito</button>`;

    contenedorProductos.appendChild(div);

    const botonAgregar = document.getElementById(`boton${producto.id}`);
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });

    const botonSumar = document.getElementById(`sumar${producto.id}`);
    botonSumar.addEventListener("click", () => {
      aumentarCantidad(producto.id);
    });

    const botonRestar = document.getElementById(`restar${producto.id}`);
    botonRestar.addEventListener("click", () => {
      disminuirCantidad(producto.id);
    });
  });
};

mostrarProductos();

const aumentarCantidad = (id) => {
  const spanCantidad = document.getElementById(`cantidad${id}`);
  const valorCantidad = parseInt(spanCantidad.textContent);
  spanCantidad.textContent = valorCantidad + 1;

  const botonRestar = document.getElementById(`restar${id}`);
  botonRestar.disabled = false;
};

const disminuirCantidad = (id) => {
  const spanCantidad = document.getElementById(`cantidad${id}`);
  const valorCantidad = parseInt(spanCantidad.textContent);
  if (valorCantidad > 1) {
    spanCantidad.textContent = valorCantidad - 1;
  } else {
    spanCantidad.textContent = 1;
    const botonRestar = document.getElementById(`restar${id}`);
    botonRestar.disabled = true;
  }
};

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find (producto => producto.id === id);
  if (productoEnCarrito){
    productoEnCarrito.cantidad++;
  }else {
    const producto = arrayProductos.find (producto => producto.id === id);
    carrito.push (producto);
  }
  calcularTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
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
  localStorage.setItem("carrito", JSON.stringify(carrito));
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
  localStorage.clear();
}

