/*------------------------- Generar combinación al azar para las aristas y las esquinas -------------------------------*/
function colores(grupoColores) {
    let i = Math.floor(Math.random() * grupoColores.length);
    let colores = grupoColores[i];
    grupoColores.splice(i, 1); //Una vez tomados los colores para la pieza, se eliminan del array 

    return colores;
}
/*------------------------------------- GUARDAR COLORES PARA CADA PIZA ------------------------------------------------*/
const colorCentro = () => { let color = CUBO.colorCentros[0]; CUBO.colorCentros.shift(); return color;  }

const coloresCentros = () => {
    for(let eje of Object.values(CUBO.COLORES)) {
        for(let color of eje) {
            CUBO.colorCentros.push(color);
        }
    }
}

const coloresAristas = (eje) => { //Combinar cada color color con los demás, exceptuando el que se encuentra en el mismo eje (Contracara)
    let idx = Object.keys(CUBO.COLORES).indexOf(eje) + 1; //index del eje y || z
    for(let c = idx; c <= 2; c++) { //Se combina con los colores del eje siguiente
        for(let color1 of CUBO.COLORES[eje]) { //Tomar cada color de cada eje (2 colores por eje)
            let eje2 = Object.keys(CUBO.COLORES)[c];
            for(let color2 of CUBO.COLORES[eje2]) {
                CUBO.coloresAristas.push([color1,color2]); //2 colores por cada arista
            }
        }
    }
}

const coloresEsquinas = () => {
    for (let color1 of CUBO.COLORES.x) {
        for (let color2 of CUBO.COLORES.y) {
            for (let color3 of CUBO.COLORES.z) {
                CUBO.coloresEsquinas.push([color1, color2,color3]);
            }
        }
    }
}

coloresCentros();
coloresAristas('x'); //La combinación de colores para cada aristas se ubican tomando como referencia únicamente los ejes "x" y "y"
coloresAristas('y'); 
coloresEsquinas();