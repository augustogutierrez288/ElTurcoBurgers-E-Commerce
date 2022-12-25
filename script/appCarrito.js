const btnCarrito = document.querySelector(".carrito");
const contenedorCarrito = document.querySelector(".contenedor-carrito");
const contenedorPadre = document.getElementById("contenedor-padre");
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

// creo la clase para los objetos
class Hambuguesas{
    constructor(id,nombre,img,precio, categoria){
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.precio = precio;
        this.categoria = categoria;
        this.cantidad = 1;
    }
}

// creo los objetos
const burgerTurquecita = new Hambuguesas(1,"Burger Turquecita","./assets/burgers/turquecita.webp",850,"carne");
const simpleBurger = new Hambuguesas(2,"Simple Burger","./assets/burgers/simple.webp",580,"carne");
const satanic = new Hambuguesas(3,"Burger de Pollo","./assets/burgers/satanic.webp",750,"carne");
const torreBurger = new Hambuguesas(4,"Torre Burger","./assets/burgers/torre-burger.webp",980,"carne");
const burgerTentacion = new Hambuguesas(5,"Burger Tentacion","./assets/burgers/tentacion.webp",1050,"carne");
const turcoBlack = new Hambuguesas(6,"Turco Black","./assets/burgers/black.webp",1100,"carne");
const blackWhite = new Hambuguesas(7,"Black & White","./assets/burgers/black_white.webp",1150,"carne");
const turcoBurger = new Hambuguesas(8,"Turco Burger","./assets/burgers/turco-burger.webp",1150,"carne");
const burgerKids = new Hambuguesas(9,"Burger Kids","./assets/burgers/burguer-kid.webp",500, "carne");
const burgerKidsDoble = new Hambuguesas(10,"Burger Kids Doble","./assets/burgers/burguer-kid-doble.webp",600,"carne");
const blueBurger = new Hambuguesas(11,"Blue Burger","./assets/burgers/Blue-Burger.webp",1000,"carne");
const burgerAmazona = new Hambuguesas(12,"Burger Amazona","./assets/burgers/amazon.webp",950,"vegetariana");
const selvaBurger = new Hambuguesas(13,"Selva Burger","./assets/burgers/selva.webp",950,"vegetariana");
const vegeBlack = new Hambuguesas(14,"VegeBlack","./assets/burgers/vegeblack.webp",950,"vegetariana");
const papas1 = new Hambuguesas(15,"Papas Cheese","./assets/burgers/papas-cheese.webp",300,"papas");
const papas2 = new Hambuguesas(16,"Papas Baches","./assets/burgers/papas-con-bacon-y-queso.webp",400,"papas");
const papas3 = new Hambuguesas(17,"Papas Mix","./assets/burgers/papas-gratinadas-bacon-cheddar-mix-de-queso.webp",500,"papas");
const papas4 = new Hambuguesas(18,"Papas Kids","./assets/burgers/papas-kids.webp",200,"papas");


//Array de productos y Carritos
const arrayProductos = [burgerTurquecita, simpleBurger, satanic, torreBurger, burgerTentacion, turcoBlack, blackWhite, turcoBurger, burgerKids, burgerKidsDoble, blueBurger, burgerAmazona, selvaBurger, vegeBlack, papas1, papas2, papas3, papas4];
let carrito = [];
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}
// funcion para pintar el index con los objetos creados.
const pintarBurgers = (array) =>{
    contenedorPadre.innerHTML = " ";
    array.forEach((burger) =>{
        const contenedor = document.createElement("div");
        const dataAos = document.createAttribute("data-aos");
        dataAos.value = "fade-up";
        contenedor.setAttributeNode(dataAos);
        contenedor.classList.add("col-12", "col-sm-12", "col-md-12", "col-lg-4", "col-xl-4", "col-xxl-4", "bg-dark", "div-padre");
        contenedor.innerHTML = 
        `
            <div class="div1">
                <img src="${burger.img}" alt="${burger.nombre}">
            </div>
            <div class="div2">
                <h4>${burger.nombre}</h4>
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
        
            Toastify({
                text: "Producto Añadido al Carrito",
                duration: 1000,
                gravity: "top",
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "#09adad",
                    width: "220px",
                    fontSize: "14px",
                    fontFamily: '"Roboto", sans-serif',
                    fontWeight: "300",
                    textAlign: "center",
                    borderRadius: "50px",
                },
            }).showToast();
        });
    });
}

pintarBurgers(arrayProductos);


// funcion para añadir elementos al array carrito.
const agregarAlCarrito = (id) =>{
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
    pintarCarrito();


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

title()

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
    pintarCarrito()
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find( producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    pintarCarrito();
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
    pintarCarrito()

    if (carrito.length == 0) {
        title()
    }
}

vaciarCarrito.addEventListener("click",()=>{
    vaciadorCarrito();
})

// funcion para limpiar el array carrito
const vaciadorCarrito = () =>{
    carrito.length = 0;
    pintarCarrito()
    title()

    localStorage.clear();
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
    contadorCarrito.textContent = cantidadTotal;
    totalProductos.innerHTML = cantidadTotal;
}

