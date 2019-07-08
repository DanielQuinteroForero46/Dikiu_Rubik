/*--------------------------------Generar combinación de colores para cada tipo de pieza-----------------------------------*/
function colores(tipoPieza) {
    switch(tipoPieza){
        case 'centro':
            return colorCentro();
        case 'arista':
            var grupoColores = CUBO.coloresAristas;
            break;
        case 'esquina':
            var grupoColores = CUBO.coloresEsquinas;
            break;
    }
    let i = Math.floor(Math.random() * grupoColores.length);
    let colores = grupoColores[i];
    grupoColores.splice(i, 1); //Una vez tomados los colores para la pieza, se eliminan del array 

    return colores;
}

const colorCentro = () => { let color = CUBO.colorCentros[0]; CUBO.colorCentros.shift(); return color;  }

const coloresAristas = (eje) => { //Combinar cada color color con los demás, exceptuando el que se encuentra en el mismo eje (Contracara)
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

const coloresEsquinas = () => {
    for (let color1 of CUBO.COLORES.x) {
        for (let color2 of CUBO.COLORES.y) {
            for (let color3 of CUBO.COLORES.z) {
                CUBO.coloresEsquinas.push(color1 + '-' + color2 + '-' + color3);
            }
        }
    }
}

coloresAristas('x'); coloresAristas('y'); //Las 12 combinaciones de colores se ubican tomando como referencia únicamente los ejes "x" y "y"
coloresEsquinas();