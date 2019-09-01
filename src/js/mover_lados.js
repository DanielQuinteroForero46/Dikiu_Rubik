const GIRO  = { //Ejes de rotación para el lado seleccionado:
	distancia: 25, //(°) Distancia mínima a recorrer a partir de un ángulo para posicionarse en el sig. ángulo
	positivo: 1, 
	negativo: -1,
    ANGULOS: [0, 90, 180, 270, 360],
    PIEZAS_EN_MOV: [],
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
		this.anguloInicial = parseInt(this.pieza.getAttribute('data-rotacion')); // Rotación inicial de la pieza (mousedown)
		this.anguloFinal = 0; // Rotación final de la pieza (mouseup)
		this.rotating = 0; //Rotación hecha a partir del angulo inicial
	}

	inicio(e) {
		GIRO.PIEZAS_EN_MOV = [];
		self.e = e; //Evento mousemove
		(!self.iniciar)? self.direccionRotacion() : self.obtenerAngulo();
	}

	detener(p) {
		self.iniciar = false;
	 	//Detener movimiento (mouseup)
	    space.removeEventListener('mousemove', self.inicio);
	    document.removeEventListener('mouseup', self.detener);
	    self.ubicar();
	}

/*---------------- DETERMINAR EJE DE ROTACIÓN EN EL DESPLAZAMIENTO INICIAL -------------------------*/
	direccionRotacion() {
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

/*------------------------------ OBTENER ÁNGULO PARA INICIAR ROTATE ---------------------------------------*/
	obtenerAngulo() { //Ángulo de rotación a partir del movimiento en el eje (x || y):
		this.rotating += (this.e[this.mov.space] / 2); //2 = Velocidad de rotación (0.5)
		document.getElementById('rotating').innerHTML = `${self.rotating}°`;
		this.anguloFinal = this.anguloInicial + this.rotating; //Áng. de rotación inicial + Rotación definida por cada desplazamiento
		this.movimiento(this.anguloFinal, 0); // 0 = segungos de transición de la rotación (inmediata)
	}


	rotar(angulo, pieza, seg) {
		pieza.pieza3D.style.transition = 'transform '+seg+'s'; //Definir transición de rotación (0 = mover || 0.2 = ubicar)
	    pieza.pieza3D.style.transform =
	    	'rotate'+this.eje+'('+angulo+'deg) '+
	    	'translate3d('+pieza.coor3D.x+'em, '+pieza.coor3D.y+'em, '+pieza.coor3D.z+'em)';
	}

/*-------------------------------------- MOVIMIENTO DE PIEZAS --------------------------------------------*/
	movimiento(angulo, seg) { //Iniciar || Detener rotación de piezas que tienen la misma coordenada en el eje de rotación estipulado
	    for(let pieza of CUBO.PIEZAS) {
	        if(pieza.coor[this.eje] == this.posEjePieza) {
        		this.rotar(angulo, pieza, seg);
        		this.giro360(angulo, pieza);
        		pieza.pieza3D.setAttribute('data-rotacion', angulo);
        		if(!self.iniciar) GIRO.PIEZAS_EN_MOV.push(pieza.pieza3D);
	        }
	    }
	}

	giro360(angulo, pieza) {
		if(Math.abs(angulo) == 360) {
			self.anguloFinal = 0;
			setTimeout(function(){
				pieza.pieza3D.setAttribute('data-rotacion', 0);
			}, 200);
		}
	}

/*------------------------------ DETENER ROTACIÓN Y UBICAR PIEZA -----------------------------------------*/
	ubicar() {
		let rotacion = self.anguloFinal;
		let direccion = (self.anguloFinal > 0) ? GIRO.positivo : GIRO.negativo;
		
		for(let ang of GIRO.ANGULOS) { //Recorrer ángulos para determinar el fin de la rotación:
			ang*=direccion; //Dirección positiva: ang * 1 || Dirección negatica: ang * -1

			//Determinar si el giro pasó por el ángulo:
			let recorrido = rotacion - ang;
			if( direccion === GIRO.positivo && recorrido > 0 )
				self.anguloFinal = (rotacion >= (ang+GIRO.distancia))? ang + 90 : ang; //POS

			else if( direccion === GIRO.negativo && recorrido < 0 )
				self.anguloFinal = (rotacion <= (ang-GIRO.distancia))? ang - 90 : ang; //NEG
		}
	 	self.movimiento(self.anguloFinal, 0.2);

	 	console.log(GIRO.PIEZAS_EN_MOV);
	}

}