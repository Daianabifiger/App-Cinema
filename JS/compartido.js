// Este archivo tiene la lógica compartida entre los dos HTML - ej: carrito, login, confirmacion y reservas 
let usuarios = obtenerUsuariosStorage();
let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;
let carrito = obtenerCarritoStorage();
let timerToast;

const toastCarrito = document.getElementById("toast-carrito");
const mensajeToast = document.getElementById("mensaje-toast");
const contenedorItemsCarrito = document.getElementById('items-carrito');
const totalCarritoElemento = document.getElementById('total-carrito');
const contCarritoElemento = document.getElementById('contador-carrito');
const login = document.getElementById('login');
const userNameNav = document.getElementById('useName-nav');
const btnFinalizar = document.getElementById('btn-finalizar');
const panelCarrito = document.getElementById('panelCarrito');

const usuariosBase = [
    {
        nombre: "Daiana",
        email: "daiana@gmail.com",
        user: "daiana",
        pass: "dai27ana"
    },
    {
        nombre: "Tomas",
        email: "tomas@gmail.com",
        user: "Tomas",
        pass: "tomi11"
    },
    {
        nombre: "Juan Perez",
        email: "juanperez@gmail.com",
        user: "JuanPerez",
        pass: "perez.5"
    }
];

const modalLoginHTML = `<dialog class="dialog text-bg-dark border border-secondary rounded-4 p-0" id="dialogLogin" data-bs-backdrop="static" tabindex="-1" aria-labelledby="tituloDialogLogin" style="max-width: 450px; width: 95%;">
                            <div class="dialog-header d-flex justify-content-between align-items-center border-bottom border-secondary px-4 py-3">
                                <h4 class="dialog-title fw-bold color-neon mb-0" id="tituloDialogLogin">
                                    <i class="bi bi-person-circle me-2"></i>Iniciar Sesión
                                </h4>
                                <button type="button" id="btn-cerrar-login" class="btn-close" aria-label="Close"></button>
                            </div>

                            <div class="dialog-body p-4">
                                <!-- Formulario de Login -->
                                <form id="form-login" novalidate>
                                    <div class="mb-3">
                                        <label for="login-user" class="form-label text-white">Usuario</label>
                                        <input type="text" id="login-user" class="form-control bg-dark text-white border-secondary" placeholder="Ingresá tu usuario">
                                        <div id="error-login-user" class="invalid-feedback">Por favor, ingresá tu usuario.</div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="login-pass" class="form-label text-white">Contraseña</label>
                                        <input type="password" id="login-pass" class="form-control bg-dark text-white border-secondary" placeholder="Ingresá tu contraseña">
                                        <div id="error-login-pass" class="invalid-feedback">Por favor, ingresá tu contraseña.</div>
                                    </div>

                                    <p id="error-login-general" class="text-danger small text-center d-none mb-3">
                                        Usuario o contraseña incorrectos.
                                    </p>

                                    <button type="submit" class="btn bg-neon fg-black fw-bold w-100 rounded-pill py-2 mt-1">
                                        Ingresar
                                    </button>

                                    <div class="text-center mt-4 pt-3 border-top border-secondary">
                                        <span class="text-secondary small d-block mb-1">¿Todavía no tenés cuenta?</span>
                                        <a class="icon-link icon-link-hover color-neon text-decoration-none fw-semibold" href="#dialogRegistro" id="link-ir-registro">
                                            Crear usuario
                                            <i class="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </form>

                                <!-- Vista cuando el usuario ya tiene sesión iniciada -->
                                <div id="vista-perfil" class="text-center d-none py-2">
                                    <i class="bi bi-person-check-fill color-neon" style="font-size: 3rem;"></i>
                                    <h5 id="perfil-nombre" class="text-white fw-bold mt-2 mb-1"></h5>
                                    <p id="perfil-email" class="text-secondary small mb-4"></p>
                                    <button type="button" id="btn-cerrar-sesion" class="btn btn-outline-danger w-100 rounded-pill py-2 fw-semibold">
                                        <i class="bi bi-box-arrow-right me-1"></i>Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </dialog>`;

const modalRegistroHTML = `<dialog class="dialog text-bg-dark border border-secondary rounded-4 p-0" id="dialogRegistro" data-bs-backdrop="static" tabindex="-1" aria-labelledby="tituloDialogRegistro" style="max-width: 450px; width: 95%;">
                                <div class="dialog-header d-flex justify-content-between align-items-center border-bottom border-secondary px-4 py-3">
                                    <h4 class="dialog-title fw-bold color-neon mb-0" id="tituloDialogRegistro">
                                        <i class="bi bi-person-plus-fill me-2"></i>Crear Usuario
                                    </h4>
                                    <button type="button" id="btn-cerrar-registro" class="btn-close" aria-label="Close"></button>
                                </div>

                                <div class="dialog-body p-4">
                                    <form id="form-registro" novalidate>
                                        <div class="mb-3">
                                            <label for="reg-nombre" class="form-label text-white">Nombre y Apellido</label>
                                            <input type="text" id="reg-nombre" class="form-control bg-dark text-white border-secondary" placeholder="Ej: Juan Pérez">
                                            <div id="error-reg-nombre" class="invalid-feedback">Ingresá un nombre válido (solo letras, mínimo 3 caracteres).</div>
                                        </div>

                                        <div class="mb-3">
                                            <label for="reg-email" class="form-label text-white">Correo electrónico</label>
                                            <input type="email" id="reg-email" class="form-control bg-dark text-white border-secondary" placeholder="ejemplo@gmail.com">
                                            <div id="error-reg-email" class="invalid-feedback">Ingresá un correo electrónico válido.</div>
                                        </div>

                                        <div class="mb-3">
                                            <label for="reg-user" class="form-label text-white">Nombre de usuario</label>
                                            <input type="text" id="reg-user" class="form-control bg-dark text-white border-secondary" placeholder="Mínimo 4 caracteres">
                                            <div id="error-reg-user" class="invalid-feedback">El usuario debe tener al menos 4 caracteres sin espacios.</div>
                                        </div>

                                        <div class="mb-3">
                                            <label for="reg-pass" class="form-label text-white">Contraseña</label>
                                            <input type="password" id="reg-pass" class="form-control bg-dark text-white border-secondary" placeholder="Mínimo 6 caracteres (letras y números)">
                                            <div id="error-reg-pass" class="invalid-feedback">La contraseña debe tener al menos 6 caracteres, una letra y un número.</div>
                                        </div>

                                        <div class="mb-3">
                                            <label for="reg-pass2" class="form-label text-white">Repetir contraseña</label>
                                            <input type="password" id="reg-pass2" class="form-control bg-dark text-white border-secondary" placeholder="Repetí tu contraseña">
                                            <div id="error-reg-pass2" class="invalid-feedback">Las contraseñas no coinciden.</div>
                                        </div>

                                        <button type="submit" class="btn bg-neon fg-black fw-bold w-100 rounded-pill py-2 mt-1">
                                            Registrarme
                                        </button>

                                        <div class="text-center mt-4 pt-3 border-top border-secondary">
                                            <a class="icon-link color-neon text-decoration-none fw-semibold" href="#" id="link-ir-login">
                                                <i class="bi bi-arrow-left"></i>
                                                Volver a Iniciar Sesión
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </dialog>`;

const modalConfirmarHTML = `<dialog class="dialog text-bg-dark border border-secondary rounded-4 p-0" id="dialogConfirmarCompra" data-bs-backdrop="static" tabindex="-1" aria-labelledby="tituloDialogConfirmar" style="max-width: 680px; width: 95%;">
                                <div class="dialog-header d-flex justify-content-between align-items-center border-bottom border-secondary px-4 py-3">
                                    <h4 class="dialog-title fw-bold color-neon mb-0" id="tituloDialogConfirmar">
                                        <i class="bi bi-cart-check-fill me-2"></i>Confirmar tu Compra
                                    </h4>
                                    <button type="button" id="btn-cerrar-confirmar" class="btn-close" aria-label="Close"></button>
                                </div>

                                <div class="dialog-body p-4">
                                    <p class="text-secondary mb-3">
                                        Revisá el detalle de tu carrito antes de reservar. ¿Estás seguro/a de confirmar la reserva?
                                    </p>

                                    <!-- Lista expandida de productos del carrito -->
                                    <div id="lista-carrito-expandido" class="d-flex flex-column gap-3 pe-2" style="max-height: 360px; overflow-y: auto;">
                                    </div>

                                    <!-- Total y botones de acción -->
                                    <div class="border-top border-secondary mt-4 pt-3">
                                        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                                            <span class="fs-6 sm:fs-5 text-white">Total a abonar en mostrador:</span>
                                            <span id="total-carrito-expandido" class="fs-4 sm:fs-3 fw-bold color-neon">$0</span>
                                        </div>

                                        <div class="d-flex gap-3">
                                            <button type="button" id="btn-cancelar-reserva" class="btn btn-outline-secondary w-50 rounded-pill py-2 fw-semibold">
                                                Volver
                                            </button>
                                            <button type="button" id="btn-confirmar-reserva" class="btn bg-neon fg-black w-50 rounded-pill py-2 fw-bold text-uppercase">
                                                Reservar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </dialog>`;

const modalCodigoHTML = `<dialog class="dialog text-bg-dark border border-secondary rounded-4 p-0" 
                                    id="dialogCodigoReserva" 
                                    data-bs-backdrop="static" 
                                    tabindex="-1" 
                                    aria-labelledby="tituloDialogCodigo" 
                                    style="max-width: 480px; width: 95%;">
                            <div class="dialog-header d-flex justify-content-between align-items-center border-bottom border-secondary px-4 py-3">
                                <h4 class="dialog-title fw-bold color-neon mb-0" id="tituloDialogCodigo">
                                    <i class="bi bi-ticket-perforated-fill me-2"></i>¡Reserva Confirmada!
                                </h4>
                                <button type="button" id="btn-cerrar-codigo" class="btn-close" aria-label="Close"></button>
                            </div>

                            <div class="dialog-body p-4 text-center">
                                <i class="bi bi-check-circle-fill color-neon" style="font-size: 3.5rem;"></i>
                                <h5 class="text-white fw-bold mt-3">Tu código de reserva es:</h5>

                                <div class="my-3 py-3 px-4 border border-2 rounded-4 bg-dark">
                                    <span id="codigo-reserva-generado" class="fs-2 fw-bold color-neon" style="letter-spacing: 4px;"></span>
                                </div>

                                <p class="text-white mb-2">
                                    Total a pagar: <strong id="monto-final-mostrador" class="color-neon"></strong>
                                </p>
                                <p class="text-secondary small mb-4">
                                    Presentá este código en el mostrador del cine para retirar tus entradas/combos y abonar de forma presencial.
                                </p>

                                <button type="button" id="btn-aceptar-codigo" class="btn bg-neon fg-black fw-bold w-100 rounded-pill py-2">
                                    Entendido
                                </button>
                            </div>
                        </dialog>`;

document.body.insertAdjacentHTML('beforeend', modalLoginHTML);
document.body.insertAdjacentHTML('beforeend', modalRegistroHTML);
document.body.insertAdjacentHTML('beforeend', modalConfirmarHTML);
document.body.insertAdjacentHTML('beforeend', modalCodigoHTML);

// Abrir el primer dialog (Login) al hacer click en el botón #login
login.addEventListener('click', () => {
    const dialogLogin = document.getElementById('dialogLogin');
    const formLogin = document.getElementById('form-login');

    actualizarEstadoUsuario();
    limpiarValidaciones(formLogin);
    document.getElementById('error-login-general').classList.add('d-none');
    if (!dialogLogin.open) {
        dialogLogin.showModal();
    }
});

// Pasar del Login al Registro con el icon-link
document.getElementById('link-ir-registro').addEventListener('click', (e) => {
    e.preventDefault();
    const dialogLogin = document.getElementById('dialogLogin');
    const dialogRegistro = document.getElementById('dialogRegistro');
    const formRegistro = document.getElementById('form-registro');

    dialogLogin.close();
    limpiarValidaciones(formRegistro);
    if (!dialogRegistro.open) {
        dialogRegistro.showModal();
    }
});

// Volver del Registro al Login con el icon-link
document.getElementById('link-ir-login').addEventListener('click', (e) => {
    e.preventDefault();
    const dialogLogin = document.getElementById('dialogLogin');
    const dialogRegistro = document.getElementById('dialogRegistro');
    const formLogin = document.getElementById('form-login');

    dialogRegistro.close();
    limpiarValidaciones(formLogin);
    if (!dialogLogin.open) {
        dialogLogin.showModal();
    }
});

// Botones X para cerrar cada dialog
document.getElementById('btn-cerrar-login').addEventListener('click', () => {
    document.getElementById('dialogLogin').close();
});

document.getElementById('btn-cerrar-registro').addEventListener('click', () => {
    document.getElementById('dialogRegistro').close();
});

document.getElementById('btn-cerrar-confirmar').addEventListener('click', () => {
    document.getElementById('dialogConfirmarCompra').close();
});

document.getElementById('btn-cancelar-reserva').addEventListener('click', () => {
    document.getElementById('dialogConfirmarCompra').close();
});

document.getElementById('btn-cerrar-codigo').addEventListener('click', () => {
    document.getElementById('dialogCodigoReserva').close();
});

document.getElementById('btn-aceptar-codigo').addEventListener('click', () => {
    document.getElementById('dialogCodigoReserva').close();
});

// Validaciones en tiempo real en cada campo del formulario de registro
document.getElementById('reg-nombre').addEventListener('input', validarNombreReg);
document.getElementById('reg-email').addEventListener('input', validarEmailReg);
document.getElementById('reg-user').addEventListener('input', validarUserReg);
document.getElementById('reg-pass').addEventListener('input', () => {
    validarPassReg();
    if (document.getElementById('reg-pass2').value !== "") validarPass2Reg();
});
document.getElementById('reg-pass2').addEventListener('input', validarPass2Reg);

// Envío del formulario de Crear Usuario
document.getElementById('form-registro').addEventListener('submit', (e) => {
    e.preventDefault();
    const formRegistro = document.getElementById('form-registro');
    const dialogRegistro = document.getElementById('dialogRegistro');
    usuarios = obtenerUsuariosStorage();

    const nombreOk = validarNombreReg();
    const emailOk = validarEmailReg();
    const userOk = validarUserReg();
    const passOk = validarPassReg();
    const pass2Ok = validarPass2Reg();

    if (nombreOk && emailOk && userOk && passOk && pass2Ok) {
        const nuevoUsuario = {
            nombre: document.getElementById('reg-nombre').value.trim(),
            email: document.getElementById('reg-email').value.trim(),
            user: document.getElementById('reg-user').value.trim(),
            pass: document.getElementById('reg-pass').value
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarioActivo', JSON.stringify(nuevoUsuario));

        // Si había armado un carrito sin loguearse, se lo pasamos a su nuevo usuario y limpiamos localStorage
        if (carrito.length > 0) {
            sessionStorage.setItem(`carrito_${nuevoUsuario.user}`, JSON.stringify(carrito));
        }
        localStorage.removeItem('carrito');

        actualizarEstadoUsuario();
        carrito = obtenerCarritoStorage();
        actualizarVistaCarrito();

        formRegistro.reset();
        limpiarValidaciones(formRegistro);
        dialogRegistro.close();
        mostrarNotificacion(`¡Cuenta creada! Bienvenido/a, ${nuevoUsuario.user}.`);
    }
});

// Envío del formulario de Login
document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const formLogin = document.getElementById('form-login');
    const dialogLogin = document.getElementById('dialogLogin');
    usuarios = obtenerUsuariosStorage();

    const inputUser = document.getElementById('login-user');
    const inputPass = document.getElementById('login-pass');
    const errUser = document.getElementById('error-login-user');
    const errPass = document.getElementById('error-login-pass');
    const errGeneral = document.getElementById('error-login-general');

    errGeneral.classList.add('d-none');

    const userValido = marcarCampo(inputUser, errUser, inputUser.value.trim() !== "", "Ingresá tu usuario.");
    const passValido = marcarCampo(inputPass, errPass, inputPass.value !== "", "Ingresá tu contraseña.");

    if (!userValido || !passValido) return;

    const usuarioEncontrado = usuarios.find(
        u => (u.user.toLowerCase() === inputUser.value.trim().toLowerCase() || u.email.toLowerCase() === inputUser.value.trim().toLowerCase()) && u.pass === inputPass.value
    );

    if (!usuarioEncontrado) {
        inputUser.classList.remove('is-valid');
        inputPass.classList.remove('is-valid');
        inputUser.classList.add('is-invalid');
        inputPass.classList.add('is-invalid');
        errUser.textContent = "";
        errPass.textContent = "";
        errGeneral.classList.remove('d-none');
        return;
    }

    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));

    // Si armó un carrito sin estar logueado y su carrito de usuario estaba vacío, se lo pasamos a su sesión
    const carritoGuardadoUsuario = JSON.parse(sessionStorage.getItem(`carrito_${usuarioEncontrado.user}`)) || [];
    if (carrito.length > 0 && carritoGuardadoUsuario.length === 0) {
        sessionStorage.setItem(`carrito_${usuarioEncontrado.user}`, JSON.stringify(carrito));
    }
    localStorage.removeItem('carrito');

    actualizarEstadoUsuario();
    carrito = obtenerCarritoStorage();
    actualizarVistaCarrito();

    formLogin.reset();
    limpiarValidaciones(formLogin);
    dialogLogin.close();
    mostrarNotificacion(`¡Bienvenido/a de nuevo, ${usuarioEncontrado.user}!`);
});

// Cerrar sesión
document.getElementById('btn-cerrar-sesion').addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo');
    localStorage.removeItem('carrito');

    actualizarEstadoUsuario();
    carrito = [];
    actualizarVistaCarrito();

    document.getElementById('dialogLogin').close();
    mostrarNotificacion("Cerraste sesión correctamente.");
});

// Botón "Finalizar Compra" del carrito: verifica que esté logueado
btnFinalizar.addEventListener('click', () => {
    usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

    if (!usuarioActivo) {
        if (panelCarrito && panelCarrito.open) panelCarrito.close();
        mostrarNotificacion("Debés iniciar sesión antes de poder realizar una reserva.");
        actualizarEstadoUsuario();
        const dialogLogin = document.getElementById('dialogLogin');
        if (!dialogLogin.open) dialogLogin.showModal();
        return;
    }

    if (carrito.length === 0) {
        mostrarNotificacion("Tu carrito está vacío. Agregá productos para reservar.");
        return;
    }

    if (panelCarrito && panelCarrito.open) panelCarrito.close();
    mostrarCarritoExpandido();
    const dialogConfirmar = document.getElementById('dialogConfirmarCompra');
    if (!dialogConfirmar.open) {
        dialogConfirmar.showModal();
    }
});

// genera el código alfanumérico aleatorio
document.getElementById('btn-confirmar-reserva').addEventListener('click', () => {
    const dialogConfirmar = document.getElementById('dialogConfirmarCompra');
    const dialogCodigo = document.getElementById('dialogCodigoReserva');

    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const codigoAleatorio = generarCodigoAlfanumerico();

    document.getElementById('codigo-reserva-generado').textContent = codigoAleatorio;
    document.getElementById('monto-final-mostrador').textContent = `$${totalCompra}`;

    // Vaciamos el carrito una vez confirmada la reserva
    carrito = [];
    guardarCarritoStorage();
    actualizarVistaCarrito();

    dialogConfirmar.close();
    if (!dialogCodigo.open) {
        dialogCodigo.showModal();
    }
});

// Actualizar carrito y usuario al cargar o volver a la página
window.addEventListener('pageshow', () => {
    actualizarEstadoUsuario();
    carrito = obtenerCarritoStorage();
    actualizarVistaCarrito();
});

// Suma los nuevos usuarios registrados 
function obtenerUsuariosStorage() {
    const guardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const listaUsuarios = [...usuariosBase];

    guardados.forEach(uGuardado => {
        const existe = listaUsuarios.some(
            uBase => uBase.user.toLowerCase() === uGuardado.user.toLowerCase()
        );
        if (!existe) {
            listaUsuarios.push(uGuardado);
        }
    });

    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    return listaUsuarios;
}

// trae el carrito guardado cuando carga la página o cambia de usuario
function obtenerCarritoStorage() {
    usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

    if (usuarioActivo) {
        return JSON.parse(sessionStorage.getItem(`carrito_${usuarioActivo.user}`)) || [];
    } else {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }
}

// guarda los cambios del carrito en el usuario activo (sessionStorage) o en localStorage
function guardarCarritoStorage() {
    usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

    if (usuarioActivo) {
        sessionStorage.setItem(`carrito_${usuarioActivo.user}`, JSON.stringify(carrito));
        localStorage.removeItem('carrito');
    } else {
        if (carrito.length > 0) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } else {
            localStorage.removeItem('carrito');
        }
    }
}

// carrito más expandido dentro del modal de confirmación
function mostrarCarritoExpandido() {
    const contenedorExpandido = document.getElementById('lista-carrito-expandido');
    const totalExpandido = document.getElementById('total-carrito-expandido');

    contenedorExpandido.innerHTML = '';
    let total = 0;

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const categoria = item.categoria || (item.nombre.includes('hs)') ? 'Entrada' : 'Candybar');

        contenedorExpandido.innerHTML += `
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 p-3 border border-secondary rounded-3 bg-dark">
                <div class="d-flex align-items-center gap-3 flex-grow-1" style="min-width: 220px;">
                    <img src="${item.imagen}" alt="${item.nombre}" class="rounded flex-shrink-0" style="width: 75px; height: 75px; object-fit: cover;">
                    <div class="flex-grow-1 min-w-0">
                        <span class="badge bg-neon fg-black text-uppercase mb-1">${categoria}</span>
                        <h6 class="text-white mb-1 text-break">${item.nombre}</h6>
                        <p class="text-secondary small mb-0">
                            Cantidad: <strong class="text-white">${item.cantidad}</strong> x $${item.precio} c/u
                        </p>
                    </div>
                </div>
                <div class="text-end ms-auto">
                    <span class="text-secondary small d-block">Subtotal</span>
                    <span class="fs-5 fw-bold color-neon">$${subtotal}</span>
                </div>
            </div>`;
    });

    totalExpandido.textContent = `$${total}`;
}

// Genera un código alfanumérico aleatorio de 8 caracteres (ej: HW-A7K9P2)
function generarCodigoAlfanumerico() {
    const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let codigo = 'HW-';

    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indiceAleatorio];
    }

    return codigo;
}

// Función auxiliar para marcar un input como válido o inválido
function marcarCampo(input, elementoError, esValido, mensajeError = "") {
    if (esValido) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (mensajeError && elementoError) {
            elementoError.textContent = mensajeError;
        }
    }
    return esValido;
}

// Limpia los estados de validación de un formulario
function limpiarValidaciones(formulario) {
    formulario.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
}

// Actualiza la vista del navbar y del dialog de login según haya un usuario logueado o no
function actualizarEstadoUsuario() {
    const tituloDialogLogin = document.getElementById('tituloDialogLogin');
    const formLogin = document.getElementById('form-login');
    const vistaPerfil = document.getElementById('vista-perfil');

    usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || null;

    if (usuarioActivo) {
        if (userNameNav) {
            userNameNav.textContent = `Hola, ${usuarioActivo.user}`;
            userNameNav.classList.remove('d-none');
        }
        tituloDialogLogin.innerHTML = `<i class="bi bi-person-check me-2"></i>Mi Perfil`;
        formLogin.classList.add('d-none');
        vistaPerfil.classList.remove('d-none');
        document.getElementById('perfil-nombre').textContent = `${usuarioActivo.nombre} (@${usuarioActivo.user})`;
        document.getElementById('perfil-email').textContent = usuarioActivo.email;
    } else {
        if (userNameNav) {
            userNameNav.textContent = '';
            userNameNav.classList.add('d-none');
        }
        tituloDialogLogin.innerHTML = `<i class="bi bi-person-circle me-2"></i>Iniciar Sesión`;
        vistaPerfil.classList.add('d-none');
        formLogin.classList.remove('d-none');
    }
}

// Verificaciones individuales de cada campo del registro
function validarNombreReg() {
    const input = document.getElementById('reg-nombre');
    const error = document.getElementById('error-reg-nombre');
    const valor = input.value.trim();
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;

    if (valor === "") {
        return marcarCampo(input, error, false, "El nombre y apellido es obligatorio.");
    }
    if (!regexNombre.test(valor)) {
        return marcarCampo(input, error, false, "Ingresá al menos 3 letras (sin números ni símbolos).");
    }
    return marcarCampo(input, error, true);
}

function validarEmailReg() {
    const input = document.getElementById('reg-email');
    const error = document.getElementById('error-reg-email');
    const valor = input.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === "") {
        return marcarCampo(input, error, false, "El correo electrónico es obligatorio.");
    }
    if (!regexEmail.test(valor)) {
        return marcarCampo(input, error, false, "El formato del correo no es válido (ej: nombre@gmail.com).");
    }
    const emailExiste = usuarios.some(u => u.email.toLowerCase() === valor.toLowerCase());
    if (emailExiste) {
        return marcarCampo(input, error, false, "Este correo electrónico ya está registrado.");
    }
    return marcarCampo(input, error, true);
}

function validarUserReg() {
    const input = document.getElementById('reg-user');
    const error = document.getElementById('error-reg-user');
    const valor = input.value.trim();
    const regexUser = /^[a-zA-Z0-9_.-]{4,}$/;

    if (valor === "") {
        return marcarCampo(input, error, false, "El nombre de usuario es obligatorio.");
    }
    if (!regexUser.test(valor)) {
        return marcarCampo(input, error, false, "Mínimo 4 caracteres, sin espacios.");
    }
    const userExiste = usuarios.some(u => u.user.toLowerCase() === valor.toLowerCase());
    if (userExiste) {
        return marcarCampo(input, error, false, "Ese nombre de usuario ya está en uso.");
    }
    return marcarCampo(input, error, true);
}

function validarPassReg() {
    const input = document.getElementById('reg-pass');
    const error = document.getElementById('error-reg-pass');
    const valor = input.value;
    const regexPass = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

    if (valor === "") {
        return marcarCampo(input, error, false, "La contraseña es obligatoria.");
    }
    if (!regexPass.test(valor)) {
        return marcarCampo(input, error, false, "Mínimo 6 caracteres, incluyendo al menos una letra y un número.");
    }
    return marcarCampo(input, error, true);
}

function validarPass2Reg() {
    const inputPass = document.getElementById('reg-pass');
    const inputPass2 = document.getElementById('reg-pass2');
    const error = document.getElementById('error-reg-pass2');

    if (inputPass2.value === "") {
        return marcarCampo(inputPass2, error, false, "Por favor, repetí la contraseña.");
    }
    if (inputPass2.value !== inputPass.value) {
        return marcarCampo(inputPass2, error, false, "Las contraseñas no coinciden.");
    }
    return marcarCampo(inputPass2, error, true);
}

function saveItem(nuevoProd){
    const itemExiste = carrito.find(item => item.nombre === nuevoProd.nombre);

    if (itemExiste){
        itemExiste.cantidad += nuevoProd.cantidad;
        itemExiste.categoria = nuevoProd.categoria;
    } else {
        carrito.push (nuevoProd);
    }

    guardarCarritoStorage();
}

function mostrarToast(articulo){
    mostrarNotificacion(`Agregaste ${articulo} al carrito.`);
}

function mostrarNotificacion(texto){
    mensajeToast.textContent = texto;

    toastCarrito.classList.add('show');
    clearTimeout(timerToast);

    timerToast = setTimeout(() => {
        toastCarrito.classList.remove('show');
    }, 3000);
}

function actualizarVistaCarrito(){
    guardarCarritoStorage();

    contenedorItemsCarrito.innerHTML = '';

    if(carrito.length === 0){
        contenedorItemsCarrito.innerHTML = `<p class="text-secondary text-center my-5">Tu carrito está vacío.</p>`;
        totalCarritoElemento.textContent = "$ 0";
        contCarritoElemento.textContent = "0";
        return;
    }

    let total = 0;
    let cant = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        cant += item.cantidad;

        const itemHTML = `<div class="d-flex gap-3 py-3 border-bottom border-secondary">
                            <!-- Imagen a la izquierda -->
                            <img src="${item.imagen}" alt="${item.nombre}" class="rounded" style="width: 80px; height: 80px; object-fit: cover;">
                            
                            <!-- Columna derecha con datos -->
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <small class="text-secondary text-uppercase" style="font-size: 0.75rem;">${item.categoria || (item.nombre.includes('hs)') ? 'Entrada' : 'Candybar')}</small>
                                        <h6 class="mb-2 fw-normal text-white">${item.nombre}</h6>
                                    </div>
                                    <!-- Papelera arriba a la derecha -->
                                    <button class="btn btn-sm text-secondary p-0 btn-eliminar-item" data-index="${index}" title="Eliminar">
                                        <i class="bi bi-trash fs-5"></i>
                                    </button>
                                </div>

                                <!-- Selector desplegable de cantidad (1, 2, 3...) -->
                                <select class="form-select form-select-sm bg-dark text-white border-secondary my-2 select-cantidad-item w-auto ps-2" style="min-width: 70px;" data-index="${index}">
                                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => 
                                        `<option value="${num}" ${item.cantidad === num ? 'selected' : ''}>${num}</option>`
                                    ).join('')}
                                </select>

                                <!-- Precio del item -->
                                <div class="fw-bold fs-6 mt-1">$ ${subtotal}</div>
                            </div>
                        </div>`;
        
        contenedorItemsCarrito.innerHTML += itemHTML;
    });

    totalCarritoElemento.textContent = `$${total}`;
    if (contCarritoElemento) contCarritoElemento.textContent = cant;

    contenedorItemsCarrito.querySelectorAll('.btn-eliminar-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = btn.getAttribute('data-index');
            carrito.splice(idx, 1);
            actualizarVistaCarrito();
        });
    });

    contenedorItemsCarrito.querySelectorAll('.select-cantidad-item').forEach(select => {
        select.addEventListener('change', (e) => {
            const idx = select.getAttribute('data-index');
            carrito[idx].cantidad = Number(e.target.value);
            actualizarVistaCarrito();
        });
    });
}
