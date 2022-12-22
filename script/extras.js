// modifica dinamicamente el title

let docTitle = document.title;
window.addEventListener("blur", () =>{
    document.title = "No te vayas, vuelve :(";
})

window.addEventListener("focus", () => {
    document.title = docTitle
})