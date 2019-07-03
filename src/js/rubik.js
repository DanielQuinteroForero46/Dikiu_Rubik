document.addEventListener('DOMContentLoaded', function () {

    crearPiezas();

    for (let l in CUBO.LADOS) { //try catch
        let pieza = CUBO.centros[l].pieza3D;
        document.getElementsByClassName('cube-' + CUBO.LADOS[l])[0].appendChild(pieza);

        let ubicar = setInterval(function () {
            pieza.classList.add('cara-centro');
            clearInterval(ubicar);
        }, 1000);

    }

    //FRONT - LEFT
    let pieza = CUBO.aristas[0].pieza3D;
    document.getElementsByClassName('cube-front')[0].appendChild(pieza); // 0 1 0
    //pieza.style.transform = 'translateX(-100%)';
    pieza.classList.add('cara-arista');

//    //BACK - LEFT
//    pieza = CUBO.aristas[1].pieza3D;
//    document.getElementsByClassName('cube-back')[0].appendChild(pieza); // 0 1 2
//    pieza.style.transform = 'translateX(100%)';

///*---------------------------------------------------------------------------*/

//    //FRONT - RIGHT
//    pieza = CUBO.aristas[2].pieza3D;
//    document.getElementsByClassName('cube-front')[0].appendChild(pieza); // 2 1 0
//    pieza.style.transform = 'translateX(100%)';

//    //BACK - RIGHT
//    pieza = CUBO.aristas[3].pieza3D;
//    document.getElementsByClassName('cube-back')[0].appendChild(pieza); // 2 1 2
//    pieza.style.transform = 'translateX(-100%)';

//    //TOP - FRONT
//    pieza = CUBO.aristas[4].pieza3D;
//    document.getElementsByClassName('cube-top')[0].appendChild(pieza); // 1 0 0
//    pieza.style.transform = 'translateY(100%)';

//    //TOP - BACK
//    pieza = CUBO.aristas[5].pieza3D;
//    document.getElementsByClassName('cube-top')[0].appendChild(pieza); // 1 0 2
//    pieza.style.transform = 'translateY(-100%)';

///*---------------------------------------------------------------------------*/

//    //BOTTOM - FRONT
//    pieza = CUBO.aristas[6].pieza3D;
//    document.getElementsByClassName('cube-bottom')[0].appendChild(pieza); // 1 2 0
//    pieza.style.transform = 'translateY(-100%)';

//    //BOTTOM - BACK
//    pieza = CUBO.aristas[7].pieza3D;
//    document.getElementsByClassName('cube-bottom')[0].appendChild(pieza); // 1 2 2
//    pieza.style.transform = 'translateY(100%)';


//    //LEFT - TOP
//    pieza = CUBO.aristas[8].pieza3D;
//    document.getElementsByClassName('cube-left')[0].appendChild(pieza); // 0 0 1
//    pieza.style.transform = 'translateY(-100%)';

//    //LEFT  - BOTTOM
//    pieza = CUBO.aristas[9].pieza3D;
//    document.getElementsByClassName('cube-left')[0].appendChild(pieza); // 0 2 1 
//    pieza.style.transform = 'translateY(100%)';

//    //RIGHT - TOP 
//    pieza = CUBO.aristas[10].pieza3D;
//    document.getElementsByClassName('cube-right')[0].appendChild(pieza); // 2 0 1
//    pieza.style.transform = 'translateY(-100%)';

//    //RIGHT- BOTTOM
//    pieza = CUBO.aristas[11].pieza3D;
//    document.getElementsByClassName('cube-right')[0].appendChild(pieza); // 2 2 1
//    pieza.style.transform = 'translateY(100%)';

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