/*---------------------------------- PROPIEDADES DEL CUBO -----------------------------------------------*/'use strict';
const CUBO = {
    PIEZAS: [], //Almacenar cada pieza como un objeto.
    NUCLEO: {x:1, y:1, z:1}, //Eje central del cubo, a partir del cual se ubicarán las piezas.
    MOV: {uno:-1, dos:1}, //MOVIMIENTO: Dirección de movimiento de cada eje con respecto al nucleo
    COLORES: { x: ['#FFF809', '#FFFFFF'], y: ['#7FEA1A', '#4052FF'], z: ['#ff8000', '#EE2929'] }, /*  Amarillo, Blanco  |  Verde, Azul  | Naranja, Rojo */
    colorCentros: [],
    coloresAristas: [],
    coloresEsquinas: []
}
/*---------------------------------------- ROTACIÓN DEL CUBO ----------------------------------------------*/
let space = document.querySelector('.space');
let cubo3D = document.querySelector('.cube');
let x = -30, y = 30; //Posición inicial del cubo (rotateX & rotateY)

/*--------------------------------------------------------*/
let girarCubo = (x,y) => {cubo3D.style.transform = "rotateX("+x+"deg) rotateY("+y+"deg)";}

let giroInicial = setInterval(function(){
    girarCubo(x,y);
    clearInterval(giroInicial);
}, 300);

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