const M  = {
	GUIAS: cubo3D.getElementsByClassName('guia'),
	'front': ['x', 'y'],
	'back': ['x', 'y'],
	'top': ['x', 'z'],
	'bottom': ['x', 'z'],
	'left': ['z', 'y'],
	'right': ['z', 'y']
}

class Mover {
	constructor(click) {
		self = this;
		this.mov = {mX:0, mY:0}; //Desplazamiento a partir del evento click
		this.direccion = null;
		self.eje = null;
		this.iniciar = false;
		this.rotate = null;

		this.init(); //Desplazamiento (mousemove)
		this.stop(); //Detener movimiento (mouseup)
		this.pieza = click.target.parentElement;
		this.ladoSelec = click.target;
	}


	guiaPiezas() {
		let ePieza = self.pieza.getAttribute('data-'+self.eje);

	    for(let p of CUBO.PIEZAS) {
	        let e = p.getAttribute('data-'+self.eje);
	        if(e == ePieza) {
	            for(let g of M.GUIAS) {
	                if(g.getAttribute('data-'+self.eje) == e) {
	                    g.appendChild(p);
	                    self.rotar(ePieza);

	                    g.style.transform = 'rotateX('+self.rotate+'deg)'; //El eje del translate cambia de acuerdo a la rotación actual del guía
	                }
	            }
	        }
	    }
	}

	rotar(ePieza) {
		console.log(self.e.movementY);
		if(ePieza == 0) self.rotate-= self.e.movementY / 20;
		else self.rotate+= self.e.movementY / 20;
	}


	desplazar(e) {
		self.e = e; //Evento mousemove
		(!self.iniciar)? self.movInit() : self.guiaPiezas();
	}

	movInit() {
		self.mov.mX+= Math.abs(self.e.movementX);
		self.mov.mY+= Math.abs(self.e.movementY);
		self.mov.mX > 15 || self.mov.mY > 15? ( //Determinar dirección (x || y || z) una vez desplazados 15px en x o y (document)
			self.iniciar = true,
			self.defDireccion()) :0;
	}

	defDireccion() {
		self.mov.mX > self.mov.mY? self.direccion = 1 : self.direccion = 0;
		let lado = this.ladoSelec.classList[1];
		
		self.eje = M[lado][self.direccion];
		console.log('Rotación y cara en el eje: ',self.eje);
	}

	
	init() { document.addEventListener('mousemove', this.desplazar); }

	stop() {
		document.addEventListener('mouseup', e => {
		    document.removeEventListener('mousemove', this.desplazar);
		});
	}
}
