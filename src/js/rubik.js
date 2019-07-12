document.addEventListener('DOMContentLoaded', function () {
    crear('centros'); 
    crear('aristas');
    crear('esquinas');

    console.log(CUBO.RUBIK);
});

function crear(tipoPieza) {
    for (let eje in CUBO.NUCLEO) {
        if (eje == 'z' && tipoPieza == 'esquinas') break; //Las 8 esquinas se ubican en las dos primeras iteraciones (4 por cada iteración)
        
        for (let movEje1 of Object.values(CUBO.MOV)) {
            for (let movEje2 of Object.values(CUBO.MOV)) {
                let pieza = new Pieza(tipoPieza, eje);
                pieza.crear(movEje1, movEje2);
                if(tipoPieza == 'centros') break;
            }

        }
    }
}