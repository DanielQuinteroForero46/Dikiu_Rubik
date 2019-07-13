/*------------------------------------- PATRONES DE UBICACIÓN ---------------------------------------------*/'use strict'
class UbicacionMatriz {    
    //Determinar coordenadas de cada pieza, partiendo desde el nucleo del cubo (1,1,1) y ubicándose en un lado correspondiente
    constructor(tipoPieza, eje) {
        this.tipoPieza = tipoPieza;
        this.eje = eje;
        this.pos = Object.assign({}, CUBO.NUCLEO); //Punto de partida para la ubicación de cada pieza
	    this.moverEje = function(init, eje, lado) { //Asignar el movimiento del eje que se encuentra en iteración: -1 || 1
	        if(init) this.pos = Object.assign({}, CUBO.NUCLEO); //init = true: Reniciar ubicación de los 3 ejes (NUCLEO)
	        this.pos[eje]+= parseInt(lado);
	    }
    }

    coordenadas(mov1, mov2) {
        this.moverEje(true, this.eje, mov1); //Mover eje en iteración, inicializando los demás ejes en 1 (nucleo)
        switch(this.tipoPieza) {        
            case 'arista': this.coorArista(mov2);
                break;
            case 'esquina': this.coorEsquina(mov1, mov2); //Patrón de ubicación
                break;
        }
    }

    coorArista(mov2) {
        var rest = Object.keys(this.pos);  //Descartar eje de la iteración, guardar ejes restantes
        rest.splice(rest.indexOf(this.eje), 1); //Al segundo eje (Descartando el eje de la iteración), se le aplica el patrón -1 & 1:
        this.moverEje(false, rest[1], mov2);
        if(this.eje == 'z') { //Invertir posiciones
            let temp = this.pos.x;
            this.pos.x = this.pos.z;
            this.pos.z = temp;
        }
    }

    coorEsquina(mov1, mov2) {
        this.moverEje(true, 'x', mov1);
        let posY = Object.keys(CUBO.NUCLEO).indexOf(this.eje);
        this.moverEje(false, 'y', Object.values(CUBO.MOV)[posY]);
        this.pos.z += mov2;
    }
}