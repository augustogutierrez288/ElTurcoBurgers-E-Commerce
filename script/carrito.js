const btnCarrito = document.querySelector(".carrito");
const contenedorCarrito = document.querySelector(".contenedor-carrito");

btnCarrito.addEventListener('click', () =>{
    contenedorCarrito.classList.toggle("active");
})

