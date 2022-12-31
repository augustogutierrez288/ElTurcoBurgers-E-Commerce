const btnCarrito = document.querySelector(".carrito");
const contenedorCarrito = document.querySelector(".contenedor-carrito");
const contenedorPrimarioCarrito = document.getElementById("contenedor-primario");
const btAgregarAlCarrito = document.querySelector(".agregar-al-carrito");
const totalProductos = document.querySelector(".total-de-productos");
const totalPrecio = document.querySelector(".total-de-precios");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const contadorCarrito = document.querySelector(".numero-de-carrito");

//Me Permite acceder al carrito al realizar el click
btnCarrito.addEventListener('click', () =>{
    contenedorCarrito.classList.toggle("active");
})

let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    pintarCarrito(carrito);
}

// funcion para añadir elementos al array carrito.
function agregarAlCarrito(id){
    const burgerEnCarrito =  carrito.find(e => e.id === id);
    if(burgerEnCarrito){
        burgerEnCarrito.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
        const producto = arrayProductos.find(e => e.id === id);
        producto.cantidad = 1
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    costoTotal()
    pintarCarrito(carrito);


};

function title(){
    if(carrito.length == 0){
        contenedorPrimarioCarrito.innerHTML = " ";
        const h4 = document.createElement("h4");
        h4.classList.add("title");
        h4.textContent = "Carrito Vacio, comienza a comprar"
        contenedorPrimarioCarrito.appendChild(h4);
    }
}

// funcion que permite mostrar los elementos cargados en el array carrito.
function pintarCarrito(array){
    if( carrito && carrito.length > 0){

        contenedorPrimarioCarrito.innerHTML= " "

        array.forEach((e) =>{
            const ctCarritoHijo = document.createElement("div");
            ctCarritoHijo.classList.add("contenedor-carrito-hijo");
            ctCarritoHijo.innerHTML = 
            `
                <img src="${e.img}" alt="${e.nombre}">
                <p>${e.nombre}</p>
                <button class="btn btn-warning" id="aumentar${e.id}">+</button>
                <p class="cantidad">${e.cantidad}</p>
                <button class="btn btn-danger" id="${e.id}">-</button>
                <p class="total">$${e.precio * e.cantidad}</p>
            `
            contenedorPrimarioCarrito.appendChild(ctCarritoHijo);

            const aumentar = document.getElementById(`aumentar${e.id}`);
            const dismunir = document.getElementById(e.id);

            aumentar.addEventListener("click",()=>{
                aumentando(e.id)
            })

            dismunir.addEventListener("click",()=>{
                dismuyendo(e.id)
            })
        })
    }else{
        title()
    }
    
    costoTotal()

    if (carrito.length > 6){
        contenedorCarrito.style.height = "auto";
    }
}

// funcion para aumentar un elemento al carrito
const aumentando = (id) =>{
    const burgerEnCarrito =  carrito.find(burger => burger.id === id);
    if (burgerEnCarrito) {
        const acumulador = burgerEnCarrito.cantidad++
        const cantidad = document.querySelector(".cantidad");
        cantidad.innerHTML= acumulador
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    pintarCarrito(carrito)
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find( producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    pintarCarrito(carrito);
}

// funcion para dismunir y eliminar 
const dismuyendo =(id) =>{
    const burgerEnCarrito =  carrito.find(burger => burger.id === id);
    if (burgerEnCarrito) {
        const acumulador = burgerEnCarrito.cantidad--
        if (acumulador <= 1) {
            eliminarDelCarrito(id);
        }else{
            const cantidad = document.querySelector(".cantidad");
            cantidad.innerHTML= acumulador
            contenedorPrimarioCarrito.appendChild(cantidad);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
    }
    pintarCarrito(carrito)
}

vaciarCarrito.addEventListener("click",()=>{
    vaciadorCarrito();
})

// funcion para limpiar el array carrito
const vaciadorCarrito = () =>{
    carrito.length = 0;
    pintarCarrito(carrito)

    localStorage.clear();
}

// funcion para calcular costo total.
function costoTotal(){
    let total = 0;
    let cantidadTotal = 0;
    carrito.forEach((producto) =>{
        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;
    })
    totalPrecio.innerHTML = `$${total}`;
    contadorCarrito.textContent = cantidadTotal;
    totalProductos.innerHTML = cantidadTotal;
}