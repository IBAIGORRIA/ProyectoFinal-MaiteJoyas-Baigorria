//DOM

const carritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoProductos = document.querySelector('#carrito-contenedor-productos');
const accionesCarrito = document.querySelector('#carrito-acciones');
const carritoConfirmado = document.querySelector('#carrito-confimado');
const totalCompra = document.querySelector('#total-compra');
const botonVacCarrito = document.querySelector('#carrito-acciones-vaciar');
const comprarCarrito = document.querySelector('#carrito-acciones-comprar');
const msjConfirmacion = document.querySelector('#carrito-confimado');

let carritoBotonEliminar= document.querySelectorAll(".carrito-producto-eliminar");
let historialCompras = [0];
let compraNumero = 1;

const carrito = JSON.parse(localStorage.getItem("carrito"));


function carritoCargarProductos(){
    if (carrito && carrito.length > 0) {
        
        //acomodo los Css para que se muestproductosEnCarrito.reduce((acum,item) => acum + item.cantidad,0); los productos si es que se agregó alguno
        carritoVacio.classList.add("disabled");
        carritoConfirmado.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        accionesCarrito.classList.remove("disabled");
        //VAcio todo para que cuando elimine un producto, quite lo que ya creó para volver a crearlo
        contenedorCarritoProductos.innerHTML = "";
        //funcion para mostrar cuadricula
        carrito.forEach(producto => {
            const div= document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-producto-nombre">
                    <small>Nombre</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <h3>${producto.cantidad}</h3>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <h3>${producto.precio}</h3>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>  
                    <h3 id="subtotal">${producto.precio * producto.cantidad}</h3>
                </div>
                <button class="carrito-producto-eliminar" id=${producto.id}>
                    <i class="bi bi-trash3-fill"></i>
                </button>
                <template id="my-template">
                    <swal-title>
                        Seguro que desea eliminar el producto?
                    </swal-title>
                    <swal-icon type="warning" color="red"></swal-icon>
                    <swal-button type="confirm">
                        Sí
                    </swal-button>
                    <swal-button type="cancel">
                        Cancel
                    </swal-button>
                    <swal-button type="deny">
                        No
                    </swal-button>
                    <swal-param name="allowEscapeKey" value="false" />
                    <swal-param name="customClass" value='{ "popup": "my-popup" }' />
                    <swal-function-param name="didOpen" value="popup => console.log(popup)" />
                    </template>
`;
            contenedorCarritoProductos.append(div);
            actualizarTotal();
            actualizarBttnEliminar();

        });
    } else {
        carritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        accionesCarrito.classList.add("disabled");
    };
};
    
//inicializo 
carritoCargarProductos();

function actualizarBttnEliminar() {
    carritoBotonEliminar= document.querySelectorAll(".carrito-producto-eliminar");
    carritoBotonEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            // Muestra el SweetAlert personalizado cuando se hace clic en el botón
            Swal.fire({
                template: '#my-template',
                showCancelButton: true,
                allowEscapeKey: false,
                didOpen: (popup) => {
                  console.log(popup);
                },
                customClass: {
                  popup: 'my-sweetalert',
                  confirmButton: 'my-sweetalert-confirm-button',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Aquí puedes realizar acciones adicionales si se confirma el SweetAlert.
                    // Por ejemplo, eliminar el producto del carrito.
                    eliminarDelCarrito(boton);
                }
            });
        });
    });
};

function eliminarDelCarrito(boton){
    //reconozco el boton que borro
    const idBoton = boton.id;
    // busco en el carrito el item con el mismo id
    const indiceCarrito = carrito.findIndex(producto => producto.id === idBoton)
    // elimino todo el producto del array
    carrito.splice(indiceCarrito,1);
    carritoCargarProductos();
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
botonVacCarrito.addEventListener('click', emptyCarrito);
function emptyCarrito(){
    carrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoCargarProductos();
};

function actualizarTotal(){
    totalCompra.innerText = carrito.reduce((acum,producto) => acum + (producto.precio * producto.cantidad),0);
};


comprarCarrito.addEventListener('click', confirmarCompra);
function confirmarCompra() {
    // Esto es situacional y manteniendo el uso de local Storage, podemos guardar las ventas realizadas para un futuro uso
    if (localStorage.getItem("historialCompras")) {
        historialCompras = JSON.parse(localStorage.getItem("historialCompras"));
    };
    const compraActual = {
        numeroCompra: compraNumero,
        productos: carrito,
        total: carrito.reduce((acum, producto) => acum + (producto.precio * producto.cantidad), 0)
    };
    historialCompras.push(compraActual);
    localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
    
    msjConfirmacion.textContent = `Compra nº ${compraNumero}: Muchas gracias por elegirnos! Vuelva Pronto!! `
    compraNumero+=1;
    // Vovemos a la programacion habitual, llevando todo a 0 y modificando el DOM
    carrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    contenedorCarritoProductos.classList.add("disabled");
    accionesCarrito.classList.add("disabled");
    carritoConfirmado.classList.remove("disabled");
};