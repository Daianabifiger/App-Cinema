const btnToggle = document.getElementById ("btnToggleSidebar");
const sidebar = document.getElementById("sidebarMenu");
const promos = document.getElementById("contenedor-promos"); //lo hice con lo de clase
const secCartelera = document.getElementById("lista-cartelera");
const secCombos = document.getElementById("lista-combos");

const promociones = [
    {
        id: 1,
        titulo: "2x1 Mes del Terror",
        descripcion: "2x1 en entradas para todas las películas de terror por el mes de octubre.",
        tipoDescuento: "2x1",
        aplicaA: "entradas",
        diasValidos: ["martes", "jueves"],
        condiciones: {
            mes: "octubre",
            genero: "Terror"
        },
        requiereCodigo: false,
        codigoOpcional: null,
        activa: true,
        imagen: "./assets/promo-terror.png"
    },
    {
        id: 2,
        titulo: "2x1 con Billeteras Virtuales",
        descripcion: "Llevate 2 entradas al precio de 1 pagando con MODO o Cuenta DNI.",
        tipoDescuento: "2x1",
        aplicaA: "entradas",
        diasValidos: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        condiciones: {
            metodoPago: ["MODO", "Cuenta DNI"]
        },
        requiereCodigo: false,
        codigoOpcional: null,
        activa: true,
        imagen: "./assets/promo-modo.png"
    },
    {
        id: 3,
        titulo: "Combo Web Anticipado",
        descripcion: "15% de descuento en el Candy Bar comprando tu combo junto con las entradas online.",
        tipoDescuento: "porcentaje",
        valorDescuento: 15,
        aplicaA: "candy_bar",
        diasValidos: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
        condiciones: {
            ventaExclusiva: "online"
        },
        requiereCodigo: true,
        codigoOpcional: "COMBOWEB15",
        activa: true,
        imagen: "./assets/promo-15off.png"
    },
    {
        id: 4,
        titulo: "Miércoles de Cine",
        descripcion: "Los días miércoles, todas las funciones a mitad de precio.",
        tipoDescuento: "porcentaje",
        valorDescuento: 50,
        aplicaA: "entradas",
        diasValidos: ["miercoles"],
        condiciones: null,
        requiereCodigo: false,
        codigoOpcional: null,
        activa: true,
        imagen: "./assets/promo-mierc.png"
    },
    {
        id: 5,
        titulo: "Pack Familiar 4x3",
        descripcion: "Llevan 4 y pagan 3. Válido para películas ATP antes de las 17:00 hs.",
        tipoDescuento: "4x3",
        aplicaA: "entradas",
        diasValidos: ["sabado", "domingo"],
        condiciones: {
            calificacion: "ATP",
            horarioTope: "17:00"
        },
        requiereCodigo: false,
        codigoOpcional: null,
        activa: true,
        imagen: "./assets/promo-fam.png"
    },
    {
        id: 6,
        titulo: "Promo Estudiantes",
        descripcion: "50% off presentando certificado de alumno regular en boletería.",
        tipoDescuento: "porcentaje",
        valorDescuento: 50,
        aplicaA: "entradas",
        diasValidos: ["lunes", "martes", "miercoles", "jueves"],
        condiciones: {
            requiereValidacionPresencial: true
        },
        requiereCodigo: false,
        codigoOpcional: null,
        activa: true,
        imagen: "./assets/promo-estud.png"
    },
    {
        id: 7,
        titulo: "Locura de Trasnoche",
        descripcion: "30% de descuento en funciones después de las 23:00 hs.",
        tipoDescuento: "porcentaje",
        valorDescuento: 30,
        aplicaA: "entradas",
        diasValidos: ["viernes", "sabado"],
        condiciones: {
            horarioInicioMinimo: "23:00"
        },
        requiereCodigo: false,
        codigoOpcional: null,
        activa: true,
        imagen: "./assets/promo-trasnoche"
    }
];
const peliculas = [
    {
        id: 1,
        nombre: "La caja del demonio",
        duracion: 95,
        horarios: ["18:30 ", " 23:15"],
        genero: ["Terror", "Suspenso"],
        calificacion: "+16",
        idioma: "Subtitulada",
        formatos: ["2D"],
        imagen: "./assets/caja-demonio.webp"
    },
    {
        id: 2,
        nombre: "La caja del demonio",
        duracion: 95,
        horarios: ["20:45"],
        genero: ["Terror", "Suspenso"],
        calificacion: "+16",
        idioma: "Doblada al Español",
        formatos: ["2D"],
        imagen: "./assets/caja-demonio.webp"
    },
    {
        id: 3,
        nombre: "Godzilla Minus Zero",
        duracion: 125,
        horarios: ["17:00 ", " 22:15"],
        genero: ["Acción", "Ciencia Ficción"],
        calificacion: "+13",
        idioma: "Subtitulada",
        formatos: ["2D", "IMAX"],
        imagen: "./assets/godzilla.webp"
    },
    {
        id: 4,
        nombre: "Godzilla Minus Zero",
        duracion: 125,
        horarios: ["19:30"],
        genero: ["Acción", "Ciencia Ficción"],
        calificacion: "+13",
        idioma: "Doblada al Español",
        formatos: ["2D", "IMAX"],
        imagen: "./assets/godzilla.webp"
    },
    {
        id: 5,
        nombre: "El gato con sombrero",
        duracion: 82,
        horarios: ["14:00", " 16:15", " 18:30"],
        genero: ["Animación", "Familiar"],
        calificacion: "ATP",
        idioma: "Doblada al Español",
        formatos: ["2D", "3D"],
        imagen: "./assets/gato-sombrero.webp"
    },
    {
        id: 6,
        nombre: "Wildwood: El bosque salvaje",
        duracion: 110,
        horarios: ["18:00"],
        genero: ["Animación", "Aventura"],
        calificacion: "ATP",
        idioma: "Doblada al Español",
        formatos: ["2D"],
        imagen: "./assets/wildwood.webp"
    },
    {
        id: 7,
        nombre: "Wildwood: El bosque salvaje",
        duracion: 110,
        horarios: ["15:30", " 20:30"],
        genero: ["Animación", "Aventura"],
        calificacion: "ATP",
        idioma: "Subtitulada",
        formatos: ["2D"],
        imagen: "./assets/wildwood.webp"
    },
    {
        id: 8,
        nombre: "La caída de la ballena",
        duracion: 106,
        horarios: ["19:00", " 21:30", " 23:45"],
        genero: ["Thriller", "Drama"],
        calificacion: "+13",
        idioma: "Subtitulada",
        formatos: ["2D"],
        imagen: "./assets/ballena.webp"
    }
];
const combosCandyBar = [
    {
        id: 1,
        nombre: "Combo Mega Clásico",
        precio: 8500,
        descripcion: "Para compartir: 1 Balde de pochoclos gigante (salados o dulces) y 2 vasos de gaseosa grandes. (No incluye entradas)",
        imagen: "./assets/combo-mega.jpg",
        incluyeEntradas: 0,
        aplicaPeliculasId: null, // Aplica para comprar suelto, sin atarlo a una peli específica
        stock: 50
    },
    {
        id: 2,
        nombre: "Combo Terror para Dos",
        precio: 18000,
        descripcion: "1 Balde de pochoclos grande, 2 gaseosas, nachos con cheddar y 2 entradas para 'La caja del demonio'.",
        imagen: "./assets/combo-terror.jpg",
        incluyeEntradas: 2,
        aplicaPeliculasId: [1, 2], // IDs de las versiones subtitulada y doblada de La caja del demonio
        stock: 30
    },
    {
        id: 3,
        nombre: "Combo Kaiju - Edición Godzilla",
        precio: 15000,
        descripcion: "1 Balde de pochoclos edición especial Godzilla, 1 vaso coleccionable y 1 entrada para 'Godzilla Minus Zero'.",
        imagen: "./assets/combo-godzilla.jpg",
        incluyeEntradas: 1,
        aplicaPeliculasId: [3, 4], // IDs de Godzilla Minus Zero
        stock: 15 // Stock más bajo porque incluye merchandising coleccionable
    },
    {
        id: 4,
        nombre: "Super Pack Familiar ATP",
        precio: 25000,
        descripcion: "2 Baldes de pochoclos grandes, 4 gaseosas, 2 golosinas a elección y 4 entradas para películas ATP.",
        imagen: "./assets/combo-family.jpg",
        incluyeEntradas: 4,
        aplicaPeliculasId: [5, 6, 7], // IDs de El gato con sombrero y Wildwood
        stock: 20
    }
];

btnToggle.addEventListener('click', () => {
    sidebar.classList.toggle('expandido');
});

promociones.forEach( (promo) => {
    const card = `<div class="carousel-item active">
                    <div class="card">
                        <img src="${promo.imagen}" class="card-img-top" alt="${promo.titulo}">
                        <div class="card-body">
                            <h4 class="card-title fw-bold">${promo.titulo}</h4>
                            <p class="card-text">${promo.descripcion}</p>
                        </div>
                    </div>
                </div>`

    promos.innerHTML += card;
})

peliculas.forEach( (peliculas) => {
    const cardCart = `<div class="card card-row mb-4 mx-4" style="max-width: 540px;">
                            <img src="${peliculas.imagen}" class="card-img-start" alt="${peliculas.nombre}">
                            <div class="card-body">
                                <h4 class="card-title">${peliculas.nombre}</h4>
                                <p class="card-text">${'Horarios: ' + peliculas.horarios} </p>
                                <p class="card-text"> ${'Idioma: ' + peliculas.idioma} </p>
                                <p class="card-text"><small class="fg-2">${peliculas.formatos + ' ' + peliculas.calificacion}</small></p>
                                <a href="#" class="btn-solid bg-neon fg-black">Ver más</a>
                            </div>
                        </div>`

    secCartelera.innerHTML += cardCart;
})

combosCandyBar.forEach( (combo) => {
    const cardCombo = `<div class="card card-row mb-4 mx-4" style="max-width: 620px;">
                            <img src="${combo.imagen}" class="card-img-start" alt="${combo.nombre}">
                            <div class="card-body">
                                <h4 class="card-title">${combo.nombre}</h4>
                                <p class="card-text">${combo.descripcion} </p>
                                <p class="card-text">${'Precio: $' + combo.precio}</p>
                                <a href="#" class="btn-solid bg-neon fg-black"> Agregar al carrito</a>
                            </div>
                        </div>`

    secCombos.innerHTML += cardCombo;
})

