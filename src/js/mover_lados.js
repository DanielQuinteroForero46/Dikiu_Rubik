const GIRO  = { //Ejes de rotación para el lado seleccionado:
	'left': ['z', 'y'],
	'right': ['z', 'y'],
	'top': ['x', 'z'],
	'bottom': ['x', 'z'],
	'back': ['x', 'y'],
	'front': ['x', 'y']
}

class Mover {
	constructor(click) { self = this;
		this.init = space.addEventListener('mousemove', this.inicio); //Desplazamiento (mousemove)
		this.stop = document.addEventListener('mouseup', this.detener);
	/*--------------------------------------------------------------------------------------------*/
		this.mov = {mX:0, mY:0, space:0}; //Desplazamiento inicial a partir del evento click
		this.eje = null;
		this.iniciar = false;
		this.pieza = click.target.parentElement;
		this.ladoSelec = click.target;
		this.posEjePieza = null; //Posición del eje de rotación de la pieza seleccionada
		this.grados = 0; // Rotación final de la pieza (mouseup)
		this.rotating = 0; //Rotación hecha a partir de la rotación actual de la pieza
	}

	inicio(e) {
		self.e = e; //Evento mousemove
		(!self.iniciar)? self.desplazamientoInicial() : self.rotacion();
	}

	detener(p) {
	 	//Detener movimiento (mouseup)
	    space.removeEventListener('mousemove', self.inicio);
	    document.removeEventListener('mouseup', self.detener);
	    self.movimiento('fin');
	}

	movimiento(f) { //Iniciar || Detener rotación de piezas que tienen la misma coordenada en el eje de rotación estipulado
	    for(let pieza of CUBO.PIEZAS) {
	        if(pieza.coor[this.eje] == this.posEjePieza) {
	        	switch(f) {
	        		case 'rotar': this.rotar(pieza); break;
	        		case 'fin': this.reUbicar(pieza); break;
	        	}
	        }
	    }
	}

/*---------------- DETERMINAR EJE DE ROTACIÓN EN EL DESPLAZAMIENTO INICIAL -------------------------*/
	desplazamientoInicial() {
		self.mov.mX+= Math.abs(self.e.movementX);
		self.mov.mY+= Math.abs(self.e.movementY);
		self.mov.mX > 10 || self.mov.mY > 10? ( //Determinar dirección (x || y || z) una vez desplazados 10px en x || y (mousemove)
			self.iniciar = true,
			self.ejeRotacion()) :0;
	}

	ejeRotacion() {
		let direccion = 0;
		if(self.mov.mX > self.mov.mY)  {
			self.mov.space = 'movementX';
			direccion = 1;

		} else self.mov.space = 'movementY';

		let lado = this.ladoSelec.classList[1];
		self.eje = GIRO[lado][direccion];
		this.posEjePieza = self.pieza.getAttribute('data-'+self.eje);
		
		console.log('EJE DE ROTACIÓN: '+self.eje);
	}

/*------------------------------ OBTENER PIEZAS E INICIAR ROTACIÓN -----------------------------------------*/
	rotacion() {
		//Grados de rotación del lado a partir del movimiento en el eje (x || y):
		this.rotating += (this.e[this.mov.space] / 2); //Velocidad de rotación (0.5)
		this.movimiento('rotar');
	}


	rotar(pieza) {
		this.grados = pieza.rotacion + this.rotating; //Posición rotate actual de la pieza + rotate de desplazamiento

		pieza.pieza3D.style.transition = 'transform 0s'; //Rotación inmediata
	    pieza.pieza3D.style.transform = 
	    	'rotate'+this.eje+'('+this.grados+'deg) '+
	    	'translate3d('+pieza.coor3D.x+'em, '+pieza.coor3D.y+'em, '+pieza.coor3D.z+'em)';
	}


	reUbicar(pieza) { //Determinar nueva ubicación y rotación:
		pieza.rotacion = (this.grados >= 360)? Math.abs(360 - this.grados) : this.grados;
		console.log(`Rotación: ${pieza.rotacion} grados`);
	}
}