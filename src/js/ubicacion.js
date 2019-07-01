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
const CUBO3D {
	
}
let CENTROS = [];

for(let i = 0; i < 6; i++) {
	let ladosPieza = [];
	for(let l of CUBO.LADOS) {
		let lado = crearElemento('span', {class:'pieza-face pieza-'+l});
		let color = setInterval(function(){
			lado.style.background = CUBO.centros[i].color;
			let x = CUBO.centros[i].posicion.x,
				y = CUBO.centros[i].posicion.y,
				z = CUBO.centros[i].posicion.z;
			let posicion = x+'-'+y+'-'+z;
			lado.id = posicion; //ASIGNAR ID A LA PIEZA CENTRAL (p_central)
			clearInterval(color);
		}, 500);
		
		ladosPieza.push(lado);
	}

	var p_central = crearElemento('span', {class:'pieza p-central'}, ladosPieza);
	document.getElementsByClassName('cube-face')[i].appendChild(p_central);
	CENTROS.push(p_central);
}

for(let p_central of CENTROS) {
	let ubicar = setInterval(function(){
		p_central.style.transform = 'translateX(100%) translateY(100%) translateZ(4px)';
		clearInterval(ubicar);
	}, 500);
}