'use strict'
/*------------------------------------------------------------------------------------------------------*/
class UbicacionMatriz {

    constructor(eje) {
        this.eje = eje;
        this.pos = Object.assign({}, CUBO.NUCLEO); //Punto de partida para la ubicación de cada piezas
	    this.moverEje = function(eje, lado) { //Asignar el movimiento del eje que se encuentra en iteración: -1 || 1
	        this.pos = Object.assign({}, CUBO.NUCLEO);
	        this.pos[eje]+= parseInt(lado);
	    }
    }

    //Determinar coordenadas de cada pieza, partiendo desde el nucleo del cubo (1,1,1) y ubicándose en un lado correspondiente
    ubic_Arista(lado, pos) {
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

    ubic_Esquina(lado, posZ, updown) {
        this.moverEje('x', lado); //Unificar enviando los tres valores (lado - updown - pos)
        this.pos['y'] = updown;
        this.pos['z'] += posZ;
    }
}