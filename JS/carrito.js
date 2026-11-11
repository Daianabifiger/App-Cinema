let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let timerToast;

const toastCarrito = document.getElementById("toast-carrito");
const mensajeToast = document.getElementById("mensaje-toast");
const contenedorItemsCarrito = document.getElementById('items-carrito');
const totalCarritoElemento = document.getElementById('total-carrito');
const contCarritoElemento = document.getElementById('contador-carrito');

function saveItem(nuevoProd){
    const itemExiste = carrito.find(item => item.nombre === nuevoProd.nombre);

    if (itemExiste){
        itemExiste.cantidad += nuevoProd.cantidad;
        itemExiste.categoria = nuevoProd.categoria;
    } else {
        carrito.push (nuevoProd);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarToast(articulo){
    mensajeToast.textContent = `Agregaste ${articulo} al carrito.`;

    toastCarrito.classList.add('show');
    clearTimeout(timerToast);

    timerToast = setTimeout(() => {
        toastCarrito.classList.remove('show');
    }, 3000);
}

function actualizarVistaCarrito(){
    localStorage.setItem('carrito', JSON.stringify(carrito));

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
                                <select class="form-select form-select-sm bg-dark text-white justify-content-center border-secondary my-2 select-cantidad-item w-3 ps-2" data-index="${index}">
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

actualizarVistaCarrito();

//para cuando vuelvo atras con window.history.back() me guarde la peli agregada
window.addEventListener('pageshow', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarVistaCarrito();
});