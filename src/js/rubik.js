document.addEventListener('DOMContentLoaded', function () {

    crearPiezas();

    for (let l in CUBO.LADOS) { //try catch
        let pieza = CUBO.centros[l].pieza3D;

        document.getElementsByClassName('cube-' + CUBO.LADOS[l])[0].appendChild(pieza);
        let ubicar = setInterval(function () {
            pieza.classList.add('p-ubicar');
            clearInterval(ubicar);
        }, 1000);

    }

    ////FRONT
    //let pieza = CUBO.aristas[0].pieza3D;
    //document.getElementsByClassName('cube-front')[0].appendChild(pieza);
    //pieza.style.transform = 'translate3d(0, 100%, 4px)'; // 0 1 0

    //pieza = CUBO.aristas[2].pieza3D;
    //document.getElementsByClassName('cube-front')[0].appendChild(pieza);
    //pieza.style.transform = 'translate3d(200%, 100%, 4px)'; // 2 1 0

    ////BACK
    //pieza = CUBO.aristas[1].pieza3D;
    //document.getElementsByClassName('cube-back')[0].appendChild(pieza);
    //pieza.style.transform = 'translate3d(200%, 100%, 4px)'; // 0 1 2 

    //pieza = CUBO.aristas[3].pieza3D;
    //document.getElementsByClassName('cube-back')[0].appendChild(pieza);
    //pieza.style.transform = 'translate3d(0, 100%, 4px)'; // 2 1 2

});


function crearPiezas() { /*Por cada eje en iteración se crean: 2 centros | 4 aristas | 4 esquinas*/
    for (let eje in CUBO.NUCLEO) {
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