'use strict';

class CrearPiezas extends UbicacionMatriz {
    /*------------------------------ CREAR Y UBICAR PIEZAS EN LA INTERFAZ --------------------------------------*/
    constructor(tipoPieza, eje, grupoColores) {
        super(eje);
        this.tipoPieza = tipoPieza;
        this.grupoColores = grupoColores;

        this.coordenadas();
    }

    //Definir posición de dos piezas (Cara - Contracara)
    coordenadas() {
        for (let lado of Object.values(CUBO.MOV)) { //Cara - Contracara. Por cada iteración: 2 centros,  4 aristas, 4 esquinas
            this.moverEje(this.eje, lado);

            switch(this.tipoPieza) {
                case 'centro': this.crear(); break;

                case 'arista':
                    for (let pos of Object.values(CUBO.MOV)) {
                        super.ubic_Arista(lado, pos);
                        this.crear();
                    }
                    break;
                case 'esquina':
                    let updown = Object.keys(CUBO.NUCLEO).indexOf(this.eje) * 2; //Esquinas superiores: 0 | Esquinas inferiores: 1
                    for (let posZ of Object.values(CUBO.MOV)) { //Posición del eje z (FRONT || BACK)
                        super.ubic_Esquina(lado, posZ, updown);
                        this.crear();
                    } 
                    break;
            }
        }
    }

    crear() {
        if(this.grupoColores == CUBO.colorCentros) var color = colorCentro(this.grupoColores);
        else var color = colores(this.grupoColores);

        let spanPieza = crearElemento('span', { class:'pieza '+this.tipoPieza});
        for(let l of PIEZA.LADOS) { //Definir 6 lados para cada pieza
            let lado = crearElemento('span', {class:'pieza-face pieza-'+l});
            lado.style.background = color;
            spanPieza.appendChild(lado);
        }

        spanPieza.setAttribute('data-x', this.pos.x);
        spanPieza.setAttribute('data-y', this.pos.y);
        spanPieza.setAttribute('data-z', this.pos.z);
        
        cubo3D.appendChild(spanPieza);
        let pieza = new Pieza(spanPieza, this.pos, color);
        pieza.ubicarCentro(this.eje);
        //Agregar pieza a la colección y a la matriz tridimensional
        CUBO.RUBIK[this.pos.x][this.pos.y][this.pos.z] = pieza;
    }

}