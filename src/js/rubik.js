document.addEventListener('DOMContentLoaded', function () {

    for(let p of CUBO.tipoPiezas) {  //Crear y ubicar piezas en el cubo rubik
        crearPiezas(p); /*Por cada llamada se crean: 2 centros | 4 aristas | 4 esquinas*/
    }

    console.log(CUBO.RUBIK);
});

function crearPiezas(tipoPieza) {
    for (let eje in CUBO.NUCLEO) { /*Por cada eje en iteración se crean: 2 centros | 4 aristas | 4 esquinas*/
        if (eje == 'z' && tipoPieza == 'esquina') break; //Las 8 esquinas se ubican en las dos primeras iteraciones (4 por cada iteración)
        
        for (let movEje1 of Object.values(CUBO.MOV)) { //Cara - Contracara. Por cada iteración: 2 centros,  4 aristas, 4 esquinas
            for (let movEje2 of Object.values(CUBO.MOV)) {
                let pieza = new Pieza(tipoPieza, eje);
                
                pieza.moverEje(eje, movEje1);
                pieza.crear(movEje1, movEje2);
                if(tipoPieza == 'centro') break;
            }

        }
    }
}