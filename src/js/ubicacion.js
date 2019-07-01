let space = document.querySelector('.space');
let cubo = document.querySelector('.cube');
/*--------------------------------------------------------*/
let rotarX = -30, rotarY = 30;


let giroInicial = setInterval(function(){
	cubo.style.transform = "rotateX("+rotarX+"deg) rotateY("+rotarY+"deg)";
	clearInterval(giroInicial);
});


function mover(e) { //Desplazar mouse en el eje "x"  provoca la rotación del eje "y" y visceversa
	rotarX-= e.movementY;
	rotarY+= e.movementX;
	cubo.style.transform = "rotateX("+rotarX+"deg) rotateY("+rotarY+"deg)";
}

space.addEventListener( 'mousedown', e => {
	cubo.style.transition = 'transform 0s';
	if(e.button === 0 && e.target == space) document.addEventListener('mousemove', mover);
});

document.addEventListener( 'mouseup', e => {
	document.removeEventListener('mousemove', mover);
});

/*------------------------------------------------------------------------------------------------*/

let cube_sides = ['front','back', 'right', 'left', 'top', 'bottom' ];
let CENTROS = [];

for(let i = 0; i < 6; i++) {
	let piece_sides = [];
	for(let side of cube_sides) {
		let p_side = crearElemento('span', {class:'pieza-face pieza-'+side});
		let color = setInterval(function(){
			p_side.style.background = CUBO.centros[i].color;
			let x = CUBO.centros[i].posicion.x,
				y = CUBO.centros[i].posicion.y,
				z = CUBO.centros[i].posicion.z;
			let posicion = x+'-'+y+'-'+z;
			p_side.id = posicion; //ASIGNAR ID A LA PIEZA CENTRAL (p_central)
			clearInterval(color);
		}, 500);
		
		piece_sides.push(p_side);
	}

	var p_central = crearElemento('span', {class:'pieza p-central'}, piece_sides);
	document.getElementsByClassName('cube-face')[i].appendChild(p_central);
	CENTROS.push(p_central);
}

for(let p_central of CENTROS) {
	let ubicar = setInterval(function(){
		p_central.style.transform = 'translateX(100%) translateY(100%) translateZ(4px)';
		clearInterval(ubicar);
	}, 500);
}