/*---------------------------------------- ROTACIÓN DEL CUBO ----------------------------------------------*/
let space = document.querySelector('.space');
let cubo3D = document.querySelector('.cube');
let x = -30, y = 30; //Posición inicial del cubo (rotateX & rotateY)

/*--------------------------------------------------------*/
let girarCubo = (x,y) => {cubo3D.style.transform = "rotateX("+x+"deg) rotateY("+y+"deg)";}

let giroInicial = setInterval(function(){
	girarCubo(x,y);
	clearInterval(giroInicial);
}, /*1000*/);

let desplazar = e => {
	cubo3D.style.transition = 'transform 0s'; //Rotación inmediata
	x-= e.movementY; y+= e.movementX; //Desplazar el mouse en el eje "x" provoca la rotación del eje "y" y visceversa
	girarCubo(x,y);
}
/*---------------------------------------- Eventos de giro -------------------------------------------------*/
space.addEventListener( 'mousedown', e => {
	if(e.button === 0 && e.target == space) document.addEventListener('mousemove', desplazar);
});
document.addEventListener('mouseup', e => { document.removeEventListener('mousemove', desplazar); });


/*------------------------------ CREAR Y UBICAR PIEZAS EN LA INTERFAZ --------------------------------------*/

//Definir modelo 3D de la pieza:
function pieza3D(array_piezas, pos, color) {
    let pieza = crearElemento('span', { class:'pieza nucleo'});
	for(let l of CUBO.LADOS) { //Definir 6 lados para cada pieza
		let lado = crearElemento('span', {class:'pieza-face pieza-'+l});
		lado.style.background = color;
		pieza.appendChild(lado);
	}
	let posicion = pos.x+'-'+pos.y+'-'+pos.z;
	pieza.id = posicion;
	//Agregar pieza a la colección y a la matriz tridimensional
	array_piezas.push(new Pieza(pieza, color, pos));
	CUBO.RUBIK[pos.x][pos.y][pos.z] = new Pieza(pieza, color, pos);
}

//Ubicación inicial: p-central (nucleo) ¿Todas las piezas se ubican inicialmente al centro?

//function asignarColores() { //ASIGNAR COLORES AL AZAR AQUÍ????????
//	 let color = setInterval(function(){
//	 	lado.style.background = CUBO.centros[i].color;
//	 	clearInterval(color);
//	 }, 500);
//}