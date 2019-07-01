/*---------------------------------- PROPIEDADES DEL CUBO -----------------------------------------------*/'use strict';
const CUBO = {
    RUBIK: new Array(3), //Matriz multidimensional en la cual se almacenará cada pieza representada como un objeto.
    NUCLEO: {x:1, y:1, z:1}, //Eje central del cubo, a partir del cual se ubicarán las piezas.
    MOV: {uno:-1, dos:1}, //MOVIMIENTO: Dirección de movimiento de cada eje con respecto al nucleo
    LADOS: ['front','back', 'right', 'left', 'top', 'bottom'],
    COLORES: { x: ['#FFD500', '#FFFFFF'], y: ['#009B48', '#0045AD'], z: ['#B90000', '#FF5900'] }, /*  Amarillo, Blanco  |  Verde, Azul  |  Rojo, Naranja */
    centros: [],
    aristas: [],
    esquinas: [],
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
/*PIEZAS (27):*/
class Pieza {
    constructor(pieza3D, color, posicion) {
        this.pieza3D = pieza3D;
        this.color = color;
        this.posicion = posicion;
    }
}

coloresAristas('x'); //Las 12 combinaciones de colores se ubican tomando como referencia únicamente los ejes "x" y "y"
coloresAristas('y');
coloresEsquinas();

function coloresAristas(eje) { //Combinar cada color color con los demás, exceptuando el que se encuentra en el mismo eje (Contracara)
    let idx = Object.keys(CUBO.COLORES).indexOf(eje) + 1; //index del eje (y || z)
    for(let c = idx; c <= 2; c++) { //Se combina con los colores del eje siguiente
        for(let color1 of CUBO.COLORES[eje]) { //Tomar cada color de cada eje (2 colores por eje)
            let eje2 = Object.keys(CUBO.COLORES)[c];
            for(let color2 of CUBO.COLORES[eje2]) {
                CUBO.coloresAristas.push(color1+"-"+color2); //2 colores por cada arista
            }
        }
    }
}

function coloresEsquinas() {
    for (let color1 of CUBO.COLORES.x) {
        for (let color2 of CUBO.COLORES.y) {
            for (let color3 of CUBO.COLORES.z) {
                CUBO.coloresEsquinas.push(color1 + '-' + color2 + '-' + color3);
            }
        }
    }
}


function coloresAzar(colores_pieza) {
    let i = Math.floor(Math.random() * colores_pieza.length);
    let colores = colores_pieza[i];
    colores_pieza.splice(i, 1); //Una vez tomados los colores para la pieza, se eliminan del array 
    return colores;
}