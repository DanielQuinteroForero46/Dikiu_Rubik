'use strict'
/*------------------------------------- PATRONES DE UBICACIÓN ---------------------------------------------*/
class UbicacionMatriz {    
    //Determinar coordenadas de cada pieza, partiendo desde el nucleo del cubo (1,1,1) y ubicándose en un lado correspondiente
    constructor(tipoPieza, eje) {
        this.tipoPieza = tipoPieza;
        this.eje = eje;
        this.pos = Object.assign({}, CUBO.NUCLEO); //Punto de partida para la ubicación de cada pieza
	    this.moverEje = function(eje, lado) { //Asignar el movimiento del eje que se encuentra en iteración: -1 || 1
	        this.pos = Object.assign({}, CUBO.NUCLEO);
	        this.pos[eje]+= parseInt(lado);
	    }
    }

    coordenadas(movEje1, movEje2) {
        switch(this.tipoPieza) {        
            case 'arista':
                this.coorArista(movEje1, movEje2);
                break;
            case 'esquina':
                this.coorEsquina(movEje1, movEje2); //Patrón de ubicación
                break;
        }
    }

    coorArista(lado, pos) {
        this.moverEje(this.eje, lado);
        var rest = Object.keys(this.pos);  //Descartar eje de la iteración, guardar ejes restantes
        rest.splice(rest.indexOf(this.eje), 1); //Al segundo eje (Descartando el eje de la iteración), se le aplica el patrón -1 & 1:
        this.pos[rest[1]]+= pos;
        if(this.eje == 'z') { //Invertir posiciones
            let temp = this.pos.x;
            this.pos.x = this.pos.z;
            this.pos.z = temp;
        }
    }

    coorEsquina(posX, posZ) {
        this.moverEje('x', posX);
        let posY = Object.keys(CUBO.NUCLEO).indexOf(this.eje) * 2; //Esquinas superiores: 0 | Esquinas inferiores: 1
        this.pos.y = posY;
        this.pos.z += posZ;
    }
}