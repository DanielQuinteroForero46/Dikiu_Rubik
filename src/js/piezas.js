const PIEZA = {
    LADOS: ['front','back', 'right', 'left', 'top', 'bottom'],
    MOV: {x:100, y:100, z:65} //Patrón de movimiento en cada eje
}
/*------------------------------------- CREAR Y UBICAR PIEZAS EN EL CUBO -------------------------------------*/ 'use strict';
class Pieza extends UbicacionMatriz {
    constructor(tipoPieza, eje) {
        super(tipoPieza, eje);
        this.pieza3D = crearElemento('span', { class:'pieza '+tipoPieza});
        this.posicion3D = {x:0, y:0, z:30}; //Punto de partida para ubicación de las piezas en el cubo
    }

    crear(movEje1, movEje2) {
        super.coordenadas(movEje1, movEje2); //Patrón de ubicación
        this.color = colores(this.tipoPieza);
        this.propiedades();
        this.dimension3d();
        
        switch(this.tipoPieza) {
            case 'centro':
                this.pieza3D.childNodes[0].style.background = this.color;
                this.posicionCentro(); break;
            case 'arista':
                this.posicionArista(); break;
                break;
            case 'esquina':
                //lado.style.background = this.color;
                break;
        }
        this.guardarPieza();
        this.ubicarPieza();
    }

    propiedades() {
        this.pieza3D.setAttribute('data-x', this.pos.x);
        this.pieza3D.setAttribute('data-y', this.pos.y);
        this.pieza3D.setAttribute('data-z', this.pos.z);
        this.pieza3D.setAttribute('data-color', this.color);
    }

    dimension3d() {
        for(let l of PIEZA.LADOS) { //Definir 6 lados para cada pieza
            let lado = crearElemento('span', {class:'pieza-face pieza-'+l});
            this.pieza3D.appendChild(lado);
        }
    }

    guardarPieza() {
        CUBO.RUBIK[this.pos.x][this.pos.y][this.pos.z] = this;
        cubo3D.appendChild(this.pieza3D);
    }


    /*UBICAR PIEZAS EN EL CUBO*/
    posicionCentro() {
        this.posicion3D[this.eje]+= 
            (this.pos[this.eje] * PIEZA.MOV[this.eje] ) - PIEZA.MOV[this.eje];
    }

    posicionArista() {
        this.posicion3D.x+= 100;
        this.posicion3D.y+= -100;
        this.posicion3D.z+= 65;
    }

    ubicarPieza() {
        let pieza = this.pieza3D, x = this.posicion3D.x, y = this.posicion3D.y, z = this.posicion3D.z;
        let animation = setInterval(function(){
            pieza.style.transform = 'translate3d(' + x + '%, ' + y + '%, ' + z + 'px)';
            clearInterval(animation);
        }, 1000);
    }
}