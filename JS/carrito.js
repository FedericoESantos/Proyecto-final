document.querySelector("h1").textContent = "Sección de Productos Tejidos";
document.querySelector("h2").textContent = "Productos";

const contenedorCarr = document.querySelector("#lista #tbody");
const vaciarCarrBoton = document.querySelector("#vaciar-carrito");

//  ----------------------------------------- ASIGNAR BOTONES A LOS BOTONES DE CANJE DE PUNTOS

const puntosDesBtn = document.querySelector("#uno");
const puntosAmiguBtn = document.querySelector("#dos");
const puntosProdBtn = document.querySelector("#tres");;

//  ----------------------------------------- ASIGNAR al ID de productos

const productosCon = document.querySelector("#productos");

let carrito = []
let puntosTotales = 0;

//cuando se termina de cargar el DOM actualiza el carrito 
document.addEventListener("DOMContentLoaded", ()=>{
    if(JSON.parse(localStorage.getItem("carrito")) == null){
        carrito=[];
    }else{
        carrito = JSON.parse(localStorage.getItem("carrito"));
    }
    dibujarCarrito();
})

const mostrarProductos = (data) =>{
	data.forEach(producto => {
		const cardProducto = document.createElement("div");
		cardProducto.setAttribute("id", "art");
		cardProducto.innerHTML=`
								<img class="prod-img" src="${producto?.img}"
								<div class="info">
									<h3 class="nombre">${producto?.nombre}</h3>
									<p class="precio">${producto?.precio}</p>
									<h4>Puntos: </h4>
									<p class="puntos">${producto?.puntos}</p>
									<button id="${producto.id}" class="btnCompra">Agregar al Carrito</button>
								</div>`
		productosCon.appendChild(cardProducto);
	});
	const btnComprar = document.querySelectorAll(".btnCompra");
	btnComprar.forEach(elem =>{
		elem.addEventListener("click", (evento)=>{
			agregarCarrito(evento.target.id)
		});
	})
}
mostrarProductos(productos);

//......................................... FUNCIONES PARA EL CARRITO

	function eliminarProd(evento){
		evento.preventDefault();
		if(evento.target.classList.contains("borrar-producto")){
			const prod = evento.target.parentElement.parentElement;
			const prodID = prod.querySelector("a").getAttribute("data-id");
			carrito = carrito.filter(producto => producto.id != prodID );
			dibujarCarrito();
			sincroStorage();
		}
	}

	function agregarCarrito(id){
		const produc = productos.find((producto)=> producto.id == id);
		//buscamos un prod solo por su id con 2 = para que busque el valor y no el tipo
		const produEnCarr = carrito.find((producto)=> producto.id == id);
		// hago lo mismo pero buscando en el carrito
			if(produEnCarr){
				produEnCarr.cantidad ++;
			}else{
				carrito.push(produc);
			}
			dibujarCarrito();
		}

	function dibujarCarrito(){
		limpiarCarr();
		carrito.forEach(producto => {
			const fila = document.createElement("tr");
			fila.innerHTML = `
			<td><img src="${producto.img}"></td>
			<td> ${producto.nombre}</td>
			<td> ${producto.precio}</td>
			<td> ${producto.cantidad}</td>
			<td> ${producto.puntos}</td>
			<td>
				<a href='#' class="borrar-producto" data-id="${producto.id}">❌</a>
			</td>
		`
		puntosTotales = CalculoPuntos();
		puntaje();
		contenedorCarr.appendChild(fila);
		})
		const puntosAcumul = document.getElementById("puntos");
		puntosAcumul.textContent = `Tus puntos son: ${puntosTotales}`;
		sincroStorage();
	}

	function limpiarCarr(){
		while(contenedorCarr.firstChild){
			contenedorCarr.removeChild(contenedorCarr.firstChild);
		}
	}
	
	function vaciarCarr(){
		while(contenedorCarr.firstChild){
			contenedorCarr.removeChild(contenedorCarr.firstChild);
		}
		carrito = [];
		sincroStorage();
	}

	vaciarCarrBoton.addEventListener("click", () => {
		puntosTotales = 0;
		CalculoPuntos();
		vaciarCarr()
	})
	
	function sincroStorage(){
		localStorage.setItem("carrito", JSON.stringify(carrito));
	}
	dibujarCarrito()
	contenedorCarr.addEventListener("click", eliminarProd);

// -------------------------------------- la lógica para canjear los puntos obtenidos por cada compra

function CalculoPuntos(){
	let puntosTotales = carrito.reduce((acumul, iter) => acumul + iter.puntos*iter.cantidad,0);
	return puntosTotales;
}
puntaje();

