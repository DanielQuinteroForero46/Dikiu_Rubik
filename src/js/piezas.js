'use strict';
const PIEZA = {
    caras: { x:['left', 'right'], y:['top', 'bottom'], z:['back','front'] },
    MOV: {x:100, y:100, z:65} //Patrón de ubicación en cada eje: Se realiza un translate con CSS
}
/*------------------------------------- CREAR Y UBICAR PIEZAS EN EL CUBO -------------------------------------*/
class Pieza extends UbicacionMatriz {
    constructor(tipoPieza, eje) {
        super(tipoPieza, eje);
        this.pieza3D = crearElemento('span', { class:'pieza '+tipoPieza});
        this.posicion3D = {x:0, y:0, z:30}; //Punto de partida para ubicación de las piezas en el cubo
    }

    crear(mov1, mov2) {
        super.coordenadas(mov1, mov2); //Patrón de ubicación
        this.dimension3d();
        this.posicion(this.eje);
        
        switch(this.tipoPieza) { //La ubicacion de cada centro se define moviendo únicamente la posición del eje en iteración
            case 'centro':
                this.color = colorCentro();
                this.colorCentro();
                break;
            case 'arista':
                this.posicionArista();
                this.color = colores(CUBO.coloresAristas);
                break;
            case 'esquina':
                this.posicionEsquina();
                this.color = colores(CUBO.coloresEsquinas);
                break;
        }
        this.atributos();
        this.ubicarColores();
        this.ubicarPieza();
        this.moverLados();
    }


    dimension3d() {
        for(let eje of Object.values(PIEZA.caras)) { //Definir 6 lados para cada pieza
            for(let cara of eje) {
                let lado = crearElemento('span', {class:'pieza-face pieza-'+cara});
                this.pieza3D.appendChild(lado);
            }
        }
    }

/*---------------------------- PATRÓN DE UBICACIÓN EN EL CUBO --------------------------------*/
    posicion(e) {
        this.posicion3D[e]+= (this.pos[e] * PIEZA.MOV[e]) - PIEZA.MOV[e];
    }

    posicionArista() {
        if(this.eje == 'z') {
            this.posicion('y');
            this.posicion('x');
        } else this.posicion('z');
    }

    posicionEsquina() {
        if(this.eje == 'y') this.posicion('x');
        else this.posicion('y');
        this.posicion('z');
    }

/*------------------------------ UBICAR COLORES EN CADA CARA DE LA PIEZA ---------------------------- */
    colorCentro() {
        for(let cara of this.pieza3D.children) {
            cara.style.background = this.color;
        }
    }

    ubicarColores(c = 0) {
        for(let e of Object.keys(this.pos)) {
            if(this.pos[e] != 1) {
                let i = this.pos[e]/this.pos[e] || 0;
                let cara = this.pieza3D.getElementsByClassName('pieza-'+PIEZA.caras[e][i])[0];
                cara.style.background = this.color[c];
                c++;
            }
        }
    }

/*--------------------------------- Ubicar pieza en el cubo 3D y guardarla en matriz ----------------------------------------*/
    atributos() {
        this.pieza3D.setAttribute('data-x', this.pos.x);
        this.pieza3D.setAttribute('data-y', this.pos.y);
        this.pieza3D.setAttribute('data-z', this.pos.z);
        this.pieza3D.setAttribute('data-color', this.color);
    }

    ubicarPieza() {
    	let self=this, animation = setInterval(function(){
            self.pieza3D.style.transform = 'translate3d('+self.posicion3D.x+'%,'+self.posicion3D.y+'%,'+self.posicion3D.z+'px)';
            clearInterval(animation);
        }, 500);

        let pieza = {tipo: this.tipoPieza, pieza3D: this.pieza3D, coor: this.pos, coor3D: this.posicion3D};
        CUBO.RUBIK[this.pos.x][this.pos.y][this.pos.z] = pieza;
        cubo3D.appendChild(this.pieza3D);
    }

    moverLados() {
        if(this.tipoPieza == 'centro') {
            let guia = crearElemento('div', {class:'guia', 
                'data-x':this.pos.x, 'data-y':this.pos.y, 'data-z':this.pos.z});
            cubo3D.appendChild(guia);
        } 
        else
        	this.pieza3D.addEventListener('mousedown', e => { new Mover(e); });
    }
}