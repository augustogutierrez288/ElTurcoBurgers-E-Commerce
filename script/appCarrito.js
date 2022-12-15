const btnCarrito = document.querySelector(".carrito");
const contenedorCarrito = document.querySelector(".contenedor-carrito");
const contenedorPadre = document.getElementById("contenedor-padre");
const contenedorPrimarioCarrito = document.getElementById("contenedor-primario");
const btAgregarAlCarrito = document.querySelector(".agregar-al-carrito");
const totalProductos = document.querySelector(".total-de-productos");
const totalPrecio = document.querySelector(".total-de-precios");
const vaciarCarrito = document.getElementById("vaciar-carrito");


//Me Permite acceder al carrito al realizar el click
btnCarrito.addEventListener('click', () =>{
    contenedorCarrito.classList.toggle("active");
})

// creo la clase para los objetos
class Hambuguesas{
    constructor(id,nombre,img,precio){
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.precio = precio;
        this.cantidad = 1;
    }
}

// creo los objetos
const burgerTurquecita = new Hambuguesas(1,"Burger Turquecita","./assets/burgers/Turquecita.webp",850);
const simpleBurger = new Hambuguesas(2,"Simple Burger","./assets/burgers/Simple-Burger.webp",580);
const burgerDePollo = new Hambuguesas(3,"Burger de Pollo","./assets/burgers/Burger-de-pollo.webp",750);
const torreBurger = new Hambuguesas(4,"Torre Burger","./assets/burgers/Torre-Burger.webp",980);
const burgerTentacion = new Hambuguesas(5,"Burger Tentacion","./assets/burgers/Tentacion.webp",1050);
const turcoBlack = new Hambuguesas(6,"Turco Black","./assets/burgers/Turco-Black.webp",1100);
const turcoBurger = new Hambuguesas(7,"Turco Burger","./assets/burgers/Turco-Burger.webp",1150);
const burgerKids = new Hambuguesas(8,".Burger Kids","./assets/burgers/Burger-Kids.webp",500);
const burgerAmazona = new Hambuguesas(9,"Burger Amazona","./assets/burgers/Amazona.webp",750);
const selvaBurger = new Hambuguesas(10,"Selva Burger","./assets/burgers/Selva.webp",950);

//Array de productos y Carritos
const arrayBurgers = [burgerTurquecita, simpleBurger, burgerDePollo, torreBurger, burgerTentacion, turcoBlack, turcoBurger, burgerKids, burgerAmazona, selvaBurger];
let carrito = [];


// funcion para pintar el index con los objetos creados.
const pintarBurgers = arrayBurgers.forEach((burger) =>{
    const contenedor = document.createElement("div");
    contenedor.classList.add("col-12", "col-sm-12", "col-md-12", "col-lg-4", "col-xl-4", "col-xxl-4", "bg-dark", "div-padre");
    contenedor.innerHTML = 
    `
        <div class="div1">
            <h4>${burger.nombre}</h4>
            <img src="${burger.img}" alt="${burger.nombre}">
        </div>
        <div class="div2">
            <p class="precio">$${burger.precio}</p>
            <div class="div3">
                <button class="ingredientes">Ingredientes</button>
                <button class="agregar-al-carrito" id="boton${burger.id}"><img src="./assets/Logos/agregar-al-carrito.png" alt="icono-agregar-al-carrito"></button>
            </div>
        </div>
    `
    contenedorPadre.appendChild(contenedor);

    // boton agregar al carrito 
    const boton = document.getElementById(`boton${burger.id}`);

    boton.addEventListener("click",() =>{
        agregarAlCarrito(burger.id);
    });
});

// funcion para añadir elementos al array carrito.
const agregarAlCarrito = (id) =>{
    const burgerEnCarrito =  carrito.find(e => e.id === id);
    if(burgerEnCarrito){
        burgerEnCarrito.cantidad++;
    }else{
        const producto = arrayBurgers.find(e => e.id === id);
        carrito.push(producto);
    }
    calcularTotal()
    pintarCarrito();

};

// funcion que permite mostrar los elementos cargados en el array carrito.
const pintarCarrito = () =>{
    contenedorPrimarioCarrito.innerHTML= " "
    carrito.forEach((e) =>{
        const ctCarritoHijo = document.createElement("div");
        ctCarritoHijo.classList.add("contenedor-carrito-hijo");
        ctCarritoHijo.innerHTML = 
        `
            <img src="${e.img}" alt="${e.nombre}">
            <p>${e.nombre}</p>
            <button class="btn btn-warning" id="aumentar${e.id}">+</button>
            <p class="cantidad">${e.cantidad}</p>
            <button class="btn btn-danger" id="eliminar${e.id}">-</button>
            <p class="total">$${e.precio * e.cantidad}</p>
        `
        contenedorPrimarioCarrito.appendChild(ctCarritoHijo);

        const aumentar = document.getElementById(`aumentar${e.id}`);
        const dismunir = document.getElementById(`eliminar${e.id}`);

        aumentar.addEventListener("click",()=>{
            aumentando(e.id)
        })

        dismunir.addEventListener("click",()=>{
            dismuyendo(e.id)
        })
    })
    calcularTotal()
}

// funcion para aumentar un elemento al carrito
const aumentando = (id) =>{
    const burgerEnCarrito =  carrito.find(burger => burger.id === id);
    if (burgerEnCarrito) {
        const acumulador = burgerEnCarrito.cantidad++
        const cantidad = document.querySelector(".cantidad");
        cantidad.innerHTML= acumulador
        contenedorPrimarioCarrito.appendChild(cantidad);
    }
    pintarCarrito()
}

// funcion para dismunir y eliminar 
const dismuyendo =(id) =>{
    const burgerEnCarrito =  carrito.find(burger => burger.id === id);
    if (burgerEnCarrito) {
        const acumulador = burgerEnCarrito.cantidad--
        if (acumulador === 0) {
            const indice = carrito.indexOf(id);
            carrito.splice(indice, 1);
        }else{
            const cantidad = document.querySelector(".cantidad");
            cantidad.innerHTML= acumulador
            contenedorPrimarioCarrito.appendChild(cantidad);
        }
    }
    pintarCarrito()
}

vaciarCarrito.addEventListener("click",()=>{
    vaciadorCarrito();
})

// funcion para limpiar el array carrito
const vaciadorCarrito = () =>{
    carrito = [];
    pintarCarrito()
}

// funcion para calcular costo total.
const costoTotal = () =>{
    let total = 0;
    let cantidadTotal = 0;
    carrito.forEach((producto) =>{
        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;
    })
    totalPrecio.innerHTML = `$${total}`;
    totalProductos.innerHTML = cantidadTotal;
}

