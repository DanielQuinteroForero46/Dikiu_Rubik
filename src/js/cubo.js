/*---------------------------------- PROPIEDADES DEL CUBO -----------------------------------------------*/'use strict';
const CUBO = {
    RUBIK: new Array(3), //Matriz multidimensional en la cual se almacenará cada pieza representada como un objeto.
    NUCLEO: {x:1, y:1, z:1}, //Eje central del cubo, a partir del cual se ubicarán las piezas.
    MOV: {uno:-1, dos:1}, //MOVIMIENTO: Dirección de movimiento de cada eje con respecto al nucleo
    COLORES: { x: ['#FFD500', '#FFFFFF'], y: ['#009B48', '#0045AD'], z: ['#FF5900', '#B90000'] }, /*  Amarillo, Blanco  |  Verde, Azul  |  Rojo, Naranja */
    colorCentros: ['#FFD500', '#FFFFFF', '#009B48', '#0045AD', '#FF5900', '#B90000'],
    coloresAristas: [],
    coloresEsquinas: []
}
/*----------- MATRIZ DEL CUBO -----------*/
for(let x = 0; x < CUBO.RUBIK.length; x++) {
  CUBO.RUBIK[x] = new Array(3); //Agregar 3 posiciones del eje "x" a cada posición del eje "y"
  for(let z = 0; z < CUBO.RUBIK.length; z++) {
    CUBO.RUBIK[x][z] = new Array(3); //Agregar 3 posiciones del eje "z" a cada posición del eje "x"
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------*/

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