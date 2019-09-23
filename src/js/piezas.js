'use strict';
const PIEZA = {
    caras: { x:['left', 'right'], y:['top', 'bottom'], z:['back','front'] },
    mov: 4 //Patrón de ubicación en cada eje: Se realiza un translate con CSS
}
/*------------------------------------- CREAR Y UBICAR PIEZAS EN EL CUBO -------------------------------------*/
class Pieza extends UbicacionMatriz {
    constructor(tipoPieza, eje) {
        super(tipoPieza, eje);
        this.pieza3D = crearElemento('span', { class:'pieza '+tipoPieza});
        this.rotacion = {x:0, y:0, z:0}; //Punto de partida para rotación de piezas
    }

    crear(mov1, mov2) {
        super.coordenadas(mov1, mov2); //Patrón de ubicación
        this.dimension3d();
        
        switch(this.tipoPieza) { //La ubicacion de cada centro se define moviendo únicamente la posición del eje en iteración
            case 'centro':
                this.color = colorCentro();
                this.colorCentro();
                break;
            case 'arista':
                this.color = colores(CUBO.coloresAristas);
                break;
            case 'esquina':
                this.color = colores(CUBO.coloresEsquinas);
                break;
        }
        this.ubicarColores();
        this.ubicarPieza();
        this.atributos();
        this.moverLados();
    }


    dimension3d() {
        for(let caras of Object.values(PIEZA.caras)) { //Definir 6 lados para cada pieza
            for(let c of caras) {
                let lado = crearElemento('span', {class:'pieza-face '+c});
                this.pieza3D.appendChild(lado);
            }
        }
    }


/*------------------------------ UBICAR COLORES EN CADA CARA DE LA PIEZA ---------------------------- */
    colorCentro() {
        for(let cara of this.pieza3D.children) {
            cara.style.background = this.color;
        }
    }

    ubicarColores() {
        let c = 0;
        for(let e of Object.keys(this.pos)) {
            if((this.pos[e]+1) != 1) {
                let i = (this.pos[e]+1)/(this.pos[e]+1) || 0;
                let cara = this.pieza3D.getElementsByClassName(PIEZA.caras[e][i])[0];
                cara.style.background = this.color[c];
                c++;
            }
        }
    }

/*--------------------------------- Ubicar pieza en el cubo 3D y guardarla en array ----------------------------------------*/
    atributos() {
        this.pieza3D.setAttribute('data-x', this.pos.x);
        this.pieza3D.setAttribute('data-y', (this.pos.y * -1));
        this.pieza3D.setAttribute('data-z', this.pos.z);
        this.pieza3D.setAttribute('data-rotacion-x', 0);
        this.pieza3D.setAttribute('data-rotacion-y', 0);
        this.pieza3D.setAttribute('data-rotacion-z', 0);
    }

    ubicarPieza() {
    	let self=this, animation = setInterval(function(){
            self.pieza3D.style.transform = 'translate3d('+(self.pos.x*PIEZA.mov)+'em,'+(self.pos.y*PIEZA.mov)+'em,'+((self.pos.z+.5)*PIEZA.mov)+'em)';
            self.pos.y*=-1; //Invertir "y" para establecer el movimiento con base en el plano cartesiano
            clearInterval(animation);
        }, 500);        
        
        let pieza = {tipo: this.tipoPieza, pieza3D: this.pieza3D, coor: this.pos, rotacion: this.rotacion};
        CUBO.PIEZAS.push(pieza);
        cubo3D.appendChild(this.pieza3D);
    }

    moverLados() {
        if(this.tipoPieza != 'centro')
            this.pieza3D.addEventListener('mousedown', e => { if(e.button == 0) new Mover(e); });
    }
}