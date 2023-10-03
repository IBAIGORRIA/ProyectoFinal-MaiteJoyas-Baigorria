// PRODUCTOS
const productos = [
    // Collares
    {
        id: "CO-01",
        nombre: "Collar 01",
        imagen: "./Imgs/CollarDigeNinixAzul.jpeg",
        categoria: {
            nombre: "collares",
            id: "collar 01"
        },
        precio: 1000
    },
    {
        id: "CO-02",
        nombre: "Collar 02",
        imagen: "./Imgs/CollarDigeNinixAzul+Corazon.jpeg",
        categoria: {
            nombre: "collares",
            id: "collar 02"
        },
        precio: 1000
    },
    {
        id: "CO-03",
        nombre: "Collar 03",
        imagen: "./Imgs/CollarDijeNinixRosa.jpeg",
        categoria: {
            nombre: "collares",
            id: "collar 03"
        },
        precio: 1000
    },
    {
        id: "CO-04",
        nombre: "Collar 04",
        imagen: "./Imgs/CollarDigeNinixRosa+Corazon.jpeg",
        categoria: {
            nombre: "collares",
            id: "collar 04"
        },
        precio: 1000
    },

//Promo Collares y Aros

    {
    id: "COAR-01",
    nombre: "Collar y Aros 01",
    imagen: "./Imgs/Collar+AroCorazonDobleDige.jpeg",
    categoria: {
            nombre: "promos",
            id: "promo 01"
        },
    precio: 12000
    },
    {
    id: "COAR-02",
    nombre: "Collar y Aros 02",
    imagen: "./Imgs/Collar+ArosCorazon.jpeg",
    categoria: {
            nombre: "promos",
            id: "promo 02"
        },
    precio: 11000
    },
    {
    id: "COAR-03",
    nombre: "Collar y Aros 03",
    imagen: "./Imgs/CollarColganteStrella+AroEstrella.jpeg",
    categoria: {
            nombre: "promos",
            id: "promo 03"
        },
    precio: 12000
    },
    {
        id: "COAR-04",
        nombre: "Collar y Aros 04",
        imagen: "./Imgs/CollarDobleOjoManos+AroManos.jpeg",
        categoria: {
            nombre: "promos",
            id: "promo 04"
        },
        precio: 1000
    },
    {
        id: "COAR-05",
        nombre: "Collar y Aros 05",
        imagen: "./Imgs/CollarMalDOjo+AroArgo.jpeg",
        categoria: {
            nombre: "promos",
            id: "promo 05"
        },
        precio: 1000
    },
    {
        id: "COAR-06",
        nombre: "Collar y Aros 06",
        imagen: "./Imgs/CollarMama+AroArgo.jpeg",
        categoria: {
            nombre: "promos",
            id: "promo 06"
        },
        precio: 1000
    },

    //Combos Pulseras y Aros
    {
        id: "PUAR-01",
        nombre: "Pulsera y Aros 01",
        imagen: "./Imgs/Pulsera+AritosArbol.jpeg",
        categoria: {
            nombre: "pulseras",
            id: "pulsera 01"
        },
        precio: 1000
    },
    {
        id: "PUAR-02",
        nombre: "Pulsera y Aros 02",
        imagen: "./Imgs/Pulsera+AritosBolon.jpeg",
        categoria: {
            nombre: "pulseras",
            id: "pulsera 02"
        },
        precio: 1000
    },
    {
        id: "PUAR-03",
        nombre: "Pulsera y Aros 03",
        imagen: "./Imgs/Pulsera+AritosCorazon.jpeg",
        categoria: {
            nombre: "pulseras",
            id: "pulsera 03"
        },
        precio: 1000
    },
    {
        id: "PUAR-04",
        nombre: "Pulsera y Aros 04",
        imagen: "./Imgs/Pulsera+AritosFlor.jpeg",
        categoria: {
            nombre: "pulseras",
            id: "pulsera 04"
        },
        precio: 1000
    },
    {
        id: "PUAR-05",
        nombre: "Pulsera y Aros 05",
        imagen: "./Imgs/Pulsera+AritosOjoBlanco.jpeg",
        categoria: {
            nombre: "pulseras",
            id: "pulsera 05"
        },
        precio: 1000
    },
    {
        id: "PUAR-06",
        nombre: "Pulsera y Aros 06",
        imagen: "./Imgs/Pulsera+AritosOjoNegroMano.jpeg",
        categoria: {
            nombre: "pulseras",
            id: "pulsera 06"
        },
        precio: 1000
    },
    {
        id: "PUAR-07",
        nombre: "Pulsera y Aros 07",
        imagen: "./Imgs/Pulsera+AroEstrella.jpeg",
        categoria: {
            nombre: "pulseras",
            id: "pulsera 07"
        },
        precio: 1000
    },
    {
        id: "PUAR-08",
        nombre: "Pulsera y Aros 08",
        imagen: "./Imgs/PulseraCereStrella+AroEstrella.jpeg",
        categoria: {
            nombre: "pulseras",
            id: "pulsera 08"
        },
        precio: 1000
    },
    {
        id: "PUAR-09",
        nombre: "Pulsera y Aros 09",
        imagen: "./Imgs/PulseraHuesitos+AroSemilla.jpeg",
        categoria: {
            nombre: "pulseras",
            id: "pulsera 09"
        },
        precio: 1000
    },
];

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
cargarProductos(productos);

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

