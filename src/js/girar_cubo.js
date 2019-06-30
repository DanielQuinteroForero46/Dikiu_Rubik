let scene = document.querySelector('.scene');
let cubo = document.querySelector('.cube');
/*--------------------------------------------------------*/
let rotarX = 0, rotarY = 0;
function mover(e) { //Desplazar mouse en el eje "x"  provoca la rotación del eje "y" y visceversa
	rotarX-= e.movementY;
	rotarY+= e.movementX;
	cubo.style.transform = "rotateX("+rotarX+"deg) rotateY("+rotarY+"deg)";

}

scene.addEventListener( 'mousedown', e => {
	if(e.button === 0 && e.target == scene) scene.addEventListener('mousemove', mover);
});

scene.addEventListener( 'mouseup', e => {
	scene.removeEventListener('mousemove', mover);
});