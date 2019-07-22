let moverLado = e => { 
    let mX = 0;
    console.log('Moviendo lado...');

    let piezas = cubo3D.getElementsByClassName('pieza');
    let guias = cubo3D.getElementsByClassName('guia');
    for(let p of piezas) {
        let x = p.getAttribute('data-x'), y = p.getAttribute('data-y'), z = p.getAttribute('data-z');
        let piezaX = e.target.parentElement.getAttribute('data-x');
        if(x == piezaX) {
            for(let g of guias) {
                if(g.getAttribute('data-x') == x) {
                    g.appendChild(p);
                    console.log(e);
                    mX+= e.movementY;
                    g.style.transform = 'rotateX(-'+mX+'deg)';
                }
            }
        }
    }
}

document.addEventListener('mouseup', e => {
    document.removeEventListener('mousemove', moverLado); 
});