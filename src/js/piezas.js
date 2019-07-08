'use strict';
const PIEZA = {
    LADOS: ['front','back', 'right', 'left', 'top', 'bottom'],
    MOV: {x:100, y:100, z:65} //Patrón de movimiento en cada eje
}
/*------------------------------------- CREAR Y UBICAR PIEZAS EN EL CUBO -------------------------------------*/
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
        this.posicion(this.eje);
        
        switch(this.tipoPieza) { //La ubicacion de cada centro se define moviendo únicamente la posición del eje en iteración
            case 'arista':
                this.posicionArista(); break;
                break;
            case 'esquina':
                this.posicionEsquina(); break;
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
            lado.style.background = this.color; //Se aplica a todas la piezas, pero se reasignará para las aristas y las esquinas
            this.pieza3D.appendChild(lado);
        }
    }

    
/*---------------------------- PATRÓN DE UBICACIÓN EN EL CUBO --------------------------------*/
    posicion(e) {
        this.posicion3D[e]+= (this.pos[e] * PIEZA.MOV[e] ) - PIEZA.MOV[e];
    }

    posicionArista() {
        if(this.eje == 'x' || this.eje == 'y') this.posicion('z');
        else if(this.eje == 'z') {
            this.posicion('y');
            this.posicion('x');
        }
    }

    posicionEsquina() {
        if(this.eje == 'y') this.posicion('x');
        else this.posicion('y');
        this.posicion('z');
    }

/*---------------------------------------------------------------------------------------------*/
    guardarPieza() {
        CUBO.RUBIK[this.pos.x][this.pos.y][this.pos.z] = this;
        cubo3D.appendChild(this.pieza3D);
    }

    ubicarPieza() {
        let p = this.pieza3D, x = this.posicion3D.x, y = this.posicion3D.y, z = this.posicion3D.z;
        let animation = setInterval(function(){
            p.style.transform = 'translate3d('+x+'%,'+y+'%,'+z+'px)';
            clearInterval(animation);
        }, 1000);
    }
}