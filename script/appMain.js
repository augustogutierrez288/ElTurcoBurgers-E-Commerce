// Modifica dinamicamente el title 

let docTitle = document.title;
window.addEventListener("blur", () =>{
    document.title = "No te vayas, vuelve :(";
})

window.addEventListener("focus", () => {
    document.title = docTitle
})

// Logica para el Filtro

const botonFiltro = document.querySelectorAll(".boton-filtro");

botonFiltro.forEach((boton) =>{
    boton.addEventListener("click",(e) =>{
        botonFiltro.forEach(e => e.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if( e.currentTarget.id != "todos"){
            const productoFiltrado = arrayProductos.filter(producto => producto.categoria === e.currentTarget.id);
            pintarBurgers(productoFiltrado);
        }else{
            pintarBurgers(arrayProductos);
        }

    })
})

// Logica para modificar el DOM del main dinamicamente

const contenedorPadre = document.getElementById("contenedor-padre");
const BBDD = "script/BBDD.json";
const arrayProductos = []

fetch(BBDD)
    .then((response) => response.json())
    .then((data) => {
        arrayProductos.push(...data);
        pintarBurgers(arrayProductos);
    })
    .catch(error => console.error(error))

// funcion para pintar el index con los objetos creados.
function pintarBurgers(array){
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