document.addEventListener('DOMContentLoaded', function () {
    // crear('centro', 6); //Tipo de pieza | cantidad
    // crear('arista', 12);
    crear('esquina', 8);
    
});

function crear(tipoPieza, cant) {
    for (let eje in CUBO.NUCLEO) {
        if (eje == 'z' && tipoPieza == 'esquina') break; //Las 8 esquinas se ubican en las dos primeras iteraciones (4 por cada iteración)
        
        for (let mov1 of Object.values(CUBO.MOV)) {
        	for(let i = 0; i < (cant/6); i++) { //Para los centros solo se realiza una iteración
        		let mov2 = Object.values(CUBO.MOV)[i];
        		let pieza = new Pieza(tipoPieza, eje);
            	pieza.crear(mov1, mov2);
        	}
        }
    }
}