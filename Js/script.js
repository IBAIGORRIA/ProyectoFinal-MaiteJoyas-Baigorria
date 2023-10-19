// PRODUCTOS
let productos =[];

// DOM elements
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let numerito = document.querySelector("#numerito");
let botonAgregar= ""; // Es let porque se modifica cada vez que se filtra.
let productosEnCarrito;
//reviso si el local tiene algo guardado
let productosEnCarritoEnLS =localStorage.getItem("carrito");

//si tiene guardado lo traigo, sino lo inicio en vacio
if (productosEnCarritoEnLS){
    productosEnCarrito = JSON.parse(productosEnCarritoEnLS);
    actualizarCantidadCarrito();
}else{
    productosEnCarrito = [];
}
//llenar el HTML de los productos que tenga en el array de productos

function cargarProductos(productosACargar) {
    contenedorProductos.innerHTML = "";
    productosACargar.forEach( producto => {

            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-detalles">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            `;
            contenedorProductos.append(div);
            actualizarBttnAgregar();
    });
};

// Inicialización base de la página
fetch('/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarProductos(productos);
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });


//Filtro de productos

function filtrarProductosPorCategoria(categoriaId) {
    if (categoriaId === "todos") {
        cargarProductos(productos);
        tituloPrincipal.innerText = "Todos los productos";
    } else {
        const filtro = productos.filter(producto => producto.categoria.nombre === categoriaId);
        cargarProductos(filtro);
        const categoriaSeleccionada =  categoriaId;
        tituloPrincipal.innerText = categoriaSeleccionada[0].toUpperCase() + categoriaSeleccionada.substring(1);
    };
};


//Cambiar productos entre botones
botonesCategorias.forEach( boton => {
    boton.addEventListener("click",(e)=>{
        botonesCategorias.forEach( boton => {boton.parentNode.classList.remove("active");
        e.currentTarget.parentNode.classList.add("active"); // currentTarget evita que la clase active se le ponga a algun hijo del boton.
        const categoriaId = e.currentTarget.id;
        filtrarProductosPorCategoria(categoriaId)
        });
        });
});

//Toma nuevamente todos los botones "Agregar" que fueron creados por "cargarProductos"
function actualizarBttnAgregar() {
    botonAgregar= document.querySelectorAll(".producto-agregar");
   
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
});
};

//Lleva los productos agregados con el boton a un array "productosEnCarrito"
function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(item => item.id === idBoton);
    let control = productosEnCarrito.some(item => item.id === idBoton);
    if (control){
        const indice = productosEnCarrito.findIndex(item => item.id === idBoton);
        productosEnCarrito[indice].cantidad++;
    }else{
        productoAgregado.cantidad=1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarCantidadCarrito();
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
};

//Actualiza el numerito al lado del carrito para que el/la usuario/a pueda ver cuantos productos tiene.
function actualizarCantidadCarrito(){
    let numeroCantidad = productosEnCarrito.reduce((acum,item) => acum + item.cantidad,0);
    numerito.innerText = numeroCantidad;
};