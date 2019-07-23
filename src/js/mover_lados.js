class Mover {
	constructor(e) {
		self = this; //Acceder a this en la función de moverLado (Invocada en el eventListener)
		this.piezaSelec = e.target.parentElement;
		this.mX = 0;
		this.mover(e);
		this.stop(); //Detener movimiento (mouseup)
	}

	moverLado(e) {
	    let piezas = cubo3D.getElementsByClassName('pieza');
	    let guias = cubo3D.getElementsByClassName('guia');

	    for(let p of piezas) {
	        let x = p.getAttribute('data-x'), y = p.getAttribute('data-y'), z = p.getAttribute('data-z');
	        let p_ejeX = self.piezaSelec.getAttribute('data-x');
	        if(x == p_ejeX) {
	            for(let g of guias) {
	                if(g.getAttribute('data-x') == x) {
	                    g.appendChild(p);
	                    self.mX-= e.movementY / 20;
	                    console.log(self.mX);
	                    g.style.transform = 'rotateX('+self.mX+'deg) translateZ(8px)'; //El eje del translate cambia de acuerdo a la rotación actual del guía
	                }
	            }
	        }
	    }
	}

	mover(e) {
		if(e.button == 0) document.addEventListener('mousemove', this.moverLado);
	}

	stop() {
		document.addEventListener('mouseup', e => {
		    document.removeEventListener('mousemove', this.moverLado);
		});
	}
}
