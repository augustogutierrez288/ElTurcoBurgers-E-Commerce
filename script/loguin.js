const crearUser = document.getElementById("crear-usuario");
const box = document.getElementById("box");

crearUser.addEventListener("click", () => {
    box.innerHTML = " ";
    box.classList.remove("box");
    box.classList.add("box2")
    box.innerHTML = 
    `
        <form action=" " method="post" class="bg-dark" autocomplete="on">
            <fieldset>
                <p class="p-form">El Turco Burgers</p>
                <h2 class="title-form">Crear Usuario</h2>
                <div class="inputBox">
                    <input type="name" id="name-user" required>
                    <span>Nombre</span>
                    <i></i>
                </div>
                <div class="inputBox">
                    <input type="name" id="lastname-user" required>
                    <span>Apellido</span>
                    <i></i>
                </div>
                <div class="inputBox">
                    <input type="name" id="username" required>
                    <span>@Usuario</span>
                    <i></i>
                </div>
                <div class="inputBox">
                    <input type="email" id="email-user" required>
                    <span>Correo Electronico</span>
                    <i></i>
                </div>
                <div class="inputBox">
                    <input type="password" id="password-user" required>
                    <span>Contraseña</span>
                    <i></i>
                </div>
                <div class="links">
                    <a href="./loguin.html" id="login-user">Iniciar Sesion</a>
                </div>
                <input type="submit" class="create-user" id="usuario-creado" value="Crear Usuario">
            </fieldset>
        </form>
    `
});