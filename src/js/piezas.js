const PIEZA = {
    LADOS: ['front','back', 'right', 'left', 'top', 'bottom'],
    MOV: {x:100, y:100, z:65} //Patrón de movimiento en cada eje
}

class Pieza {
    constructor(pieza3D, coordenadas, color) {
        this.pieza3D = pieza3D;
        this.coordenadas = coordenadas, //Punto de partida para ubicación de las piezas en el cubo
        this.posicion3D = {x:0, y:0, z:30}, //Punto de partida para ubicación de las piezas en el cubo
        this.color = color;
    }


    ubicarCentro(eje) {
        this.posicion3D[eje]+= 
            (parseInt(this.pieza3D.getAttribute('data-'+eje)) * PIEZA.MOV[eje] ) - PIEZA.MOV[eje];
        this.pieza3D.style.transform = 
            'translate3d(' + this.posicion3D.x + '%, ' + this.posicion3D.y + '%, ' + this.posicion3D.z + 'px)';
    }

}