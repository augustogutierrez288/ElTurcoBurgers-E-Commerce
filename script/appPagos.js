const inputName = document.querySelector("#input-name");
const inputNumber = document.querySelector("#input-number");
const inputMonth = document.querySelector("#input-month");
const inputYear = document.querySelector("#input-year");
const inputCVC = document.querySelector("#input-cvc");
const cardNumber = document.querySelector("#card-number");
const cardName = document.querySelector("#card-name");
const cardMonth = document.querySelector("#card-month");
const cardYear = document.querySelector("#card-year");
const cardCVC = document.querySelector("#card-cvc");
const form = document.querySelector("#form");
const thankYou = document.querySelector("#thank-you");
const buttonContinue = document.querySelector("#continue");
const contenedorCard = document.querySelector(".container-card");


const arrayCard = [
    {
        ruta : "../assets/pagos/JCB_logo.svg.png",
        id : "jcb"
    },
    {
        ruta : "../assets/pagos/Discover-logo.png",
        id : "discover"
    },
    {
        ruta : "../assets/Logos/amex.png",
        id : "amex"
    },
    {
        ruta : "../assets/Logos/diners.png",
        id : "diners"
    },
    {
        ruta : "../assets/Logos/visa.png",
        id : "visa"
    },
    {
        ruta : "../assets/Logos/mastercard.png",
        id : "mastercard"
    },
    
]

inputName.addEventListener("input", () => {
    cardName.innerText = inputName.value;

    if (inputName.value.length === 0) {
        cardName.innerText = "Nombre Completo";
    }
})

//Libreria Cleave.js
var cleave = new Cleave('.input-number', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        pintarCard(type)
    }
});

// funcion que recorre un array y pinta si el id es identico al type de Clave.js
const pintarCard = (type) =>{
    const card =  arrayCard.find(e => e.id === type);
    if(card){
        contenedorCard.innerHTML = `<img src="${card.ruta}" alt="${card.id}">`;
    }else{
        contenedorCard.innerHTML = " ";
    }
};

inputNumber.addEventListener("input", () => {
    cardNumber.innerText = inputNumber.value;

    if (inputNumber.value.length === 0) {
        cardNumber.innerText = "0000 0000 0000 0000";
    }
})

inputMonth.addEventListener("input", () => {
    cardMonth.innerText = inputMonth.value;

    if (inputMonth.value.length === 0) {
        cardMonth.innerText = "00";
    }
})

inputYear.addEventListener("input", () => {
    cardYear.innerText = inputYear.value;

    if (inputYear.value.length === 0) {
        cardYear.innerText = "00";
    }
})

inputCVC.addEventListener("input", () => {
    cardCVC.innerText = inputCVC.value;

    if (inputCVC.value.length === 0) {
        cardCVC.innerText = "000";
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.classList.add("disabled");
    thankYou.classList.remove("disabled");
    const table = document.getElementById("table");
    table.style.display = "none";
    localStorage.clear()
})

buttonContinue.addEventListener("click", () => {
    form.classList.remove("disabled");
    thankYou.classList.add("disabled");
    form.reset();
    cardName.innerText = "Nombre Completo";
    cardNumber.innerText = "0000 0000 0000 0000";
    cardMonth.innerText = "00";
    cardYear.innerText = "00";
    cardCVC.innerText = "000";
})


let valoresCarrito = [];
if(localStorage.getItem("carrito")) {
    valoresCarrito = JSON.parse(localStorage.getItem("carrito"));
}

const pProduct = document.querySelector(".p-product");
const pTotal = document.querySelector(".p-total");

let precio = 0;
valoresCarrito.forEach((producto) =>{
    precio += producto.precio * producto.cantidad
})
pProduct.innerHTML = `$${precio}`;
pTotal.innerHTML = `$${precio + 300}`