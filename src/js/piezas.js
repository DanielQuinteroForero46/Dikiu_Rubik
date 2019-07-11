'use strict';
const PIEZA = {
    LADOS: ['front','back', 'right', 'left', 'top', 'bottom'],
    CARAS: { x:['left', 'right'], y:['top', 'bottom'], z:['back','front'] },
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
        this.propiedades();
        this.dimension3d();
        this.posicion(this.eje);
        
        switch(this.tipoPieza) { //La ubicacion de cada centro se define moviendo únicamente la posición del eje en iteración
            case 'centros':
                this.color = colorCentro();
                this.ubicarColorCent();
            case 'aristas':
                this.posicionArista();
                this.color = colores(CUBO.coloresAristas);
                this.ubicarColoresAris();
                break;
            case 'esquinas':
                this.posicionEsquina();
                this.color = colores(CUBO.coloresEsquinas);
                this.ubicarColoresEsq();
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
            //lado.style.background = this.color; //Se aplica a todas la piezas, pero se reasignará para las aristas y las esquinas
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


    ubicarColorCent() {
        for(let cara of this.pieza3D.children) {
            cara.style.background = this.color;
        }
    }

    ubicarColoresAris() {
        let c = 0;
        for(let e of Object.keys(this.pos)) {
            if(this.pos[e] != 1) {
                let i = this.pos[e]/this.pos[e] || 0;
                let cara = this.pieza3D.getElementsByClassName('pieza-'+PIEZA.CARAS[e][i])[0];
                cara.style.background = this.color[c];
                c++;
            }
        }
    }

    ubicarColoresEsq() {
        for(let e of Object.keys(this.pos)) {
            let i = this.pos[e]/this.pos[e] || 0;
            let cara = this.pieza3D.getElementsByClassName('pieza-'+PIEZA.CARAS[e][i])[0];
            cara.style.background = this.color[ Object.keys(this.pos).indexOf(e) ];
        }
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