const botonFiltro = document.querySelectorAll(".boton-filtro");
console.log(botonFiltro)

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