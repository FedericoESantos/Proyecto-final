function puntaje(){
	if(puntosTotales >= 2000){
		puntosDesBtn.style.display = "block";
		puntosDesBtn.addEventListener("click", ()=>{
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				imageUrl: './ASSETS/IMG/desc.jpg',
				title: 'Imprime esta etiqueta para poder canjear tu elección',
				text: 'Clic derecho => Guardar imagen como... => y guarda esta etiqueta para luego canjearla',
				showConfirmButton: true,
			})
		})
	}
	if(puntosTotales >= 4000){
		puntosAmiguBtn.style.display = "block";
		puntosAmiguBtn.addEventListener("click", ()=>{
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				imageUrl: './ASSETS/IMG/amiguru.jpg',
				title: 'Imprime esta etiqueta para poder canjear tu elección',
				text: 'Clic derecho => Guardar imagen como... => y guarda esta etiqueta para luego canjearla',
				showConfirmButton: true,
			})
		})
	}
	if(puntosTotales >= 6000){
		puntosProdBtn.style.display = "block";
		puntosProdBtn.addEventListener("click", ()=>{
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				imageUrl: './ASSETS/IMG/prod.jpg',
				title: 'Imprime esta etiqueta para poder canjear tu elección',
				text: 'Clic derecho => Guardar imagen como... => y guarda esta etiqueta para luego canjearla',
				showConfirmButton: true,
			})
		})
	}
}