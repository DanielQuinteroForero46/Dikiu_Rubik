'use strict'; window.onload = crearPiezas;
/*------------------------------------------------------------------------------------------------------*/
class CrearPiezas {
    constructor(pieza, eje) {
        this.pieza = pieza;
        this.eje = eje;
	    this.moverEje = function(eje, lado) { //Asignar el movimiento del eje que se encuentra en iteración: -1 || 1
	        this.posicion = Object.assign({}, CUBO.NUCLEO);
	        this.posicion[eje]+= parseInt(lado);
	    }
    }

    //Determinar coordenadas y color(es) de cada pieza, partiendo desde el nucleo del cubo (1,1,1) y ubicándose en un lado correspondiente
    crear() {
        for (let lado of Object.values(CUBO.MOV)) { //Cara - Contracara. Por cada iteración: 2 centros,  4 aristas, 4 esquinas
            this.moverEje(this.eje, lado);

            switch(this.pieza) {
                case 'centro':
                    let c = Object.values(CUBO.MOV).indexOf(lado); //Ubicación del color de acuerdo al lado: -1 -> cara, 1: contracara
                    var color = CUBO.COLORES[this.eje][c];
                    this.crearModelo(CUBO.centros, color);
                    break;
                case 'arista':
                	var rest = Object.keys(this.posicion);  //Descartar eje de la iteración, guardar ejes restantes
            		rest.splice(rest.indexOf(this.eje), 1); //Al segundo eje (Descartando el eje de la iteración), se le aplica el patrón -1 & 1:
                	for (let pos of Object.values(CUBO.MOV)) {
                        this.moverEje(this.eje, lado);
                        this.posicion[rest[1]]+= pos;
                        if(this.eje == 'z') { //Invertir posiciones
                            let temp = this.posicion.x;
                            this.posicion.x = this.posicion.z;
                            this.posicion.z = temp;
                        }
                        this.crearModelo(CUBO.aristas, coloresAzar(CUBO.coloresAristas));
                    } 
                    break;
                case 'esquina':
                	let updown = Object.keys(CUBO.NUCLEO).indexOf(this.eje) * 2; //Esquinas superiores: 0 | Esquinas inferiores: 1
                	for (let posZ of Object.values(CUBO.MOV)) { //Posición del eje z (FRONT || BACK)
	                    this.moverEje('x', lado); //Unificar enviando los tres valores (lado - updown - pos)
	                    this.posicion['y'] = updown;
                        this.posicion['z'] += posZ;
                        this.crearModelo(CUBO.esquinas, coloresAzar(CUBO.coloresEsquinas));
                	} 
                	break;
            }
      	}
    }

    crearModelo(array_piezas, color) {
        pieza3D(array_piezas, {x:this.posicion.x, y:this.posicion.y, z:this.posicion.z}, color);
    }
}

function crearPiezas() { /*Por cada eje se crea: 2 centros | 4 aristas | 4 esquinas*/
  	for(let eje in CUBO.NUCLEO) {
  		var centros = new CrearPiezas('centro', eje); /*2 centros opuestos (CARA - CONTRACARA)*/
  		centros.crear();

  		var aristas = new CrearPiezas('arista', eje); /*4 aristas opuestas (CARA - CONTRACARA)*/
  		aristas.crear();

        if (eje == 'z') break; //Las esquinas se ubican en las dos primeras iteraciones (4 por cada iteración)

  		var esquinas = new CrearPiezas('esquina', eje); /*4 esquinas opuestas (CARA - CONTRACARA)*/
  		esquinas.crear();
  	}
    console.log(CUBO.centros); console.log(CUBO.aristas); console.log(CUBO.esquinas); console.log(CUBO.RUBIK);
}