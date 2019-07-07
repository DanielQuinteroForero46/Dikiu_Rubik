document.addEventListener('DOMContentLoaded', function () {
    Piezas(); //Crear y ubicar piezas en el cubo rubik
});

function Piezas() { /*Por cada eje en iteración se crean: 2 centros | 4 aristas | 4 esquinas*/
    for (let eje in CUBO.NUCLEO) {
        let centros = new CrearPiezas('centro', eje, CUBO.colorCentros); /*2 centros opuestos (CARA - CONTRACARA)*/
        var aristas = new CrearPiezas('arista', eje, CUBO.coloresAristas); /*4 aristas opuestas (CARA - CONTRACARA)*/
        if (eje == 'z') break; //Las 8 esquinas se ubican en las dos primeras iteraciones (4 por cada iteración)
        var esquinas = new CrearPiezas('esquina', eje, CUBO.coloresEsquinas); /*4 esquinas opuestas (CARA - CONTRACARA)*/
    }
    console.log(CUBO.RUBIK);
}

//FRONT - LEFT
    //let pieza = CUBO.aristas[0].pieza3D;
    //document.getElementsByClassName('cube-front')[0].appendChild(pieza); // 0 1 0
    ////pieza.style.transform = 'translateX(-100%)';
    //pieza.classList.add('cara-arista');

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