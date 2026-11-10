let horarioElegido = "";
let indiceDiaElegido = null;

const pelicula = JSON.parse(localStorage.getItem('peliElegida'));
const selectTickets = document.getElementById('cant-tickets');
const selecFecha = document.getElementById('contenedor-fechas');
const btnCarrito = document.getElementById('addTicket-carrito');

const fechasDisponibles = [
    { diaSemana: "Lunes", numero: 26, mes: "Octubre" },
    { diaSemana: "Martes", numero: 27, mes: "Octubre" },
    { diaSemana: "Miércoles", numero: 28, mes: "Octubre" },
    { diaSemana: "Jueves", numero: 29, mes: "Octubre" },
    { diaSemana: "Viernes", numero: 30, mes: "Octubre" },
    { diaSemana: "Sábado", numero: 31, mes: "Octubre" },
    { diaSemana: "Domingo", numero: 1, mes: "Noviembre" },
    { diaSemana: "Lunes", numero: 2, mes: "Noviembre" },
    { diaSemana: "Martes", numero: 3, mes: "Noviembre" },
    { diaSemana: "Miércoles", numero: 4, mes: "Noviembre" },
    { diaSemana: "Jueves", numero: 5, mes: "Noviembre" },
    { diaSemana: "Viernes", numero: 6, mes: "Noviembre" },
    { diaSemana: "Sábado", numero: 7, mes: "Noviembre" }
]

actualizarSubtotal();
mostrarFechas();

selectTickets.addEventListener('change', actualizarSubtotal);

if (pelicula){
    //img y titulo columna izq
    document.getElementById('img-peli').src = pelicula.imagen;
    document.getElementById('img-peli').alt = pelicula.nombre;
    document.getElementById('titulo-peli').textContent = pelicula.nombre;

    //datos de la pelicula
    document.getElementById('genero-peli').textContent = `${pelicula.genero[0] + " - " + pelicula.genero[1]}`;
    document.getElementById('calif-peli').textContent = pelicula.calificacion;
    document.getElementById('idioma-peli').textContent = pelicula.idioma;
    document.getElementById('formato-peli').textContent = pelicula.formatos;

    //formato y precio para seleccion de cant. tickets
    document.getElementById('formato-ticket').textContent = `${"General " + pelicula.formatos}`;
    document.getElementById('precio').textContent = `${"$ " + pelicula.precio}`;

    //nombre y subtotal columna resumen de reserva
    document.getElementById('nomPeli').textContent = `${"Película: " + pelicula.nombre}`;

    //botones de horarios
    const contenedorHorarios = document.getElementById('contenedor-horarios');
    contenedorHorarios.innerHTML = "";

    pelicula.horarios.forEach(hora => {
        contenedorHorarios.innerHTML += `<button type="button" class="btn-solid rounded-3 bg-neon fg-black border-0 px-3 py-2 mx-3" onclick="seleccionarHorario('${hora}')">
                                            ${hora}
                                        </button>`
    });
}

function seleccionarHorario(hora) {
    horarioElegido = hora;
    document.getElementById('horaSelec').textContent = `Horario seleccionado: ${hora} hs.`;
}

function actualizarSubtotal (){
    const cantTickets = Number(selectTickets.value);
    const subtotal = pelicula.precio * cantTickets;

    document.getElementById('cantTickets').textContent = `Cantidad de tickets: ${cantTickets}`;
    document.getElementById('subtotal').textContent = `Subtotal: $${subtotal}`;
}

function mostrarFechas() {
    selecFecha.innerHTML = "";

    fechasDisponibles.forEach((fecha, index) => {
        const claseBorde = (index === indiceDiaElegido) ? "border-warning border-2" : "border-0"; //borde amarillo al seleccionado
        const claseNumero = (index === indiceDiaElegido) ? "fw-bold" : "";

        const cardFecha = `<div class="card text-center ${claseBorde} shadow-sm flex-shrink-0 rounded-4 pe-auto" 
                                style="width: 110px; cursor: pointer;" 
                                onclick="seleccionarDia(${index})">
                                <div class="card-body p-2">
                                    <small class="d-block text-secondary">${fecha.diaSemana}</small>
                                    <span class="d-block fs-3 text-success ${claseNumero}">${fecha.numero}</span>
                                    <small class="d-block text-secondary">${fecha.mes}</small>
                                </div>
                            </div>`;

        selecFecha.innerHTML += cardFecha;
    });

    // Actualizamos el texto en el Resumen de reserva con el día activo
    const diaActual = fechasDisponibles[indiceDiaElegido];
    document.getElementById('diaSelec').textContent = `Día seleccionado: ${diaActual.diaSemana} ${diaActual.numero} de ${diaActual.mes}`;
}

function seleccionarDia(index) {
    indiceDiaElegido = index;
    mostrarFechas(); 
}

//scroll de fechas
function moverFechas(distancia) {
    selecFecha.scrollLeft += distancia;
}

function addReserva(){
    if(indiceDiaElegido === null || horarioElegido === ""){
        alert("Por favor, seleccione un día y un horario para tu función.");
        btnCarrito.disabled = true;
        return;
    } else {
        btnCarrito.disabled = false;
    }

    const cantidad = Number(selectTickets.value);
    const diaObj = fechasDisponibles[indiceDiaElegido];

    saveItem({
        nombre: `${pelicula.nombre} (${diaObj.diaSemana} ${diaObj.numero} - ${horarioElegido}hs)`,
        precio: pelicula.precio,
        imagen: pelicula.imagen,
        categoria: "Entrada",
        cantidad: cantidadElegida
    });
    
}

