let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function saveItem(nuevoProd){
    const itemExiste = carrito.find(item => item.nombre === producto.nombre);

    if (itemExiste){
        itemExiste.cantidad += nuevoProd.cantidad;
    } else {
        carrito.push (nuevoProd);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}