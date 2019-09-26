const GIRO  = { //Ejes de rotación para el lado seleccionado:
	distancia: 25, //(°) Distancia mínima a recorrer a partir de un ángulo para posicionarse en el sig. ángulo
	direccion: 0, // 1 = giro positivo || -2 = giro negativo
    ANGULOS: [0, 90, 180, 270, 360],
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
		this.ejeRotacion = null; //Posición del eje de rotación de la pieza seleccionada
		this.anguloInicial = null; // Rotación inicial de la pieza (mousedown)
		this.anguloFinal = 0; // Rotación final de la pieza (mouseup)
		this.rotating = 0; //Rotación hecha a partir del angulo inicial
	}

	inicio(e) {
		self.e = e; //Evento mousemove
		(!self.iniciar)? self.direccionRotacion() : self.obtenerAngulo();
	}

	detener(p) {
		self.iniciar = false;
	 	//Detener movimiento (mouseup)
	    space.removeEventListener('mousemove', self.inicio);
	    document.removeEventListener('mouseup', self.detener);
	    self.ubicar();
	    self.defNuevaPosicion();
	}

/*---------------- DETERMINAR EJE DE ROTACIÓN EN EL DESPLAZAMIENTO INICIAL -------------------------*/
	direccionRotacion() {
		self.mov.mX+= Math.abs(self.e.movementX);
		self.mov.mY+= Math.abs(self.e.movementY);
		self.mov.mX > 10 || self.mov.mY > 10? ( //Determinar dirección (x || y || z) una vez desplazados 10px en x || y (mousemove)
			self.iniciar = true,
			self.defEjeRotacion()) :0;
	}

	defEjeRotacion() {
		let direccion = 0;
		if(self.mov.mX > self.mov.mY)  {
			self.mov.space = 'movementX';
			direccion = 1;

		} else self.mov.space = 'movementY';

		let lado = this.ladoSelec.classList[1];
		self.eje = GIRO[lado][direccion];
		this.anguloInicial = parseInt(this.pieza.getAttribute('data-rotacion-'+self.eje));
		this.ejeRotacion = self.pieza.getAttribute('data-'+self.eje);
		
		console.log('EJE DE ROTACIÓN: '+self.eje);
	}

/*------------------------------ OBTENER ÁNGULO PARA INICIAR ROTATE ---------------------------------------*/
	obtenerAngulo() { //Ángulo de rotación a partir del movimiento en el eje (x || y):
		this.rotating += (this.e[this.mov.space] / 2); //2 = Velocidad de rotación (0.5)
		document.getElementById('rotating').innerHTML = `${self.rotating}°`;
		this.anguloFinal = this.anguloInicial + this.rotating; //Áng. de rotación inicial + Rotación definida por cada desplazamiento
		this.movimiento(this.anguloFinal, 0); // 0 = segungos de transición de la rotación (inmediata)
	}


	rotar(pieza, seg) {
		pieza.pieza3D.style.transition = 'transform '+seg+'s'; //Definir transición de rotación (0 = mover || 0.2 = ubicar)
	    pieza.pieza3D.style.transform =
	    	'rotateX('+pieza.rotacion.x+'deg) rotateY('+pieza.rotacion.y+'deg) rotateZ('+pieza.rotacion.z+'deg) '+
	    	'translate3d('+(pieza.coor.x*PIEZA.mov)+'em, '+(pieza.coor.y*PIEZA.mov*-1)+'em, '+((pieza.coor.z+.5)*PIEZA.mov)+'em)';
	}

/*-------------------------------------- MOVIMIENTO DE PIEZAS --------------------------------------------*/
	movimiento(angulo, seg) { //Iniciar || Detener rotación de piezas que tienen la misma coordenada en el eje de rotación estipulado
	    for(let pieza of CUBO.PIEZAS) {
	        if(pieza.coor[this.eje] == this.ejeRotacion) {
        		let angAnterior = pieza.pieza3D.getAttribute('data-rotacion-'+this.eje);
	        	pieza.rotacion[this.eje] = angulo;
        		this.rotar(pieza, seg);
        		this.giro360(angulo, pieza);

        		if(!this.iniciar && angulo != angAnterior){
        			pieza.pieza3D.setAttribute('data-rotacion-'+this.eje, angulo);
        		}
	        }
	    }
	}

	giro360(angulo, pieza) {
		if(Math.abs(angulo) == 360) {
			self.anguloFinal = 0;
			setTimeout(function(){
				pieza.rotacion[self.eje] = 0;
				pieza.pieza3D.setAttribute('data-rotacion-'+self.eje, 0);
			}, 200);
		}
	}

/*------------------------------ DETENER ROTACIÓN Y UBICAR PIEZA -----------------------------------------*/
	ubicar() {
		let rotacion = self.anguloFinal;
		GIRO.direccion = (self.rotating > 0) ? 1 : -1;
		
		for(let ang of GIRO.ANGULOS) { //Recorrer ángulos para determinar el fin de la rotación:
			ang*=GIRO.direccion; //Dirección positiva: ang * 1 || Dirección negatica: ang * -1

			//Determinar si el giro pasó por el ángulo:
			let recorrido = rotacion - ang;
			if( GIRO.direccion > 0 && recorrido > 0 )
				self.anguloFinal = (rotacion >= (ang+GIRO.distancia))? ang + 90 : ang; //POS

			else if( GIRO.direccion < 0 && recorrido < 0 )
				self.anguloFinal = (rotacion <= (ang-GIRO.distancia))? ang - 90 : ang; //NEG
		}
	 	self.movimiento(self.anguloFinal, 0.2);
	 	document.getElementById('rotating').innerHTML = `${self.anguloFinal}°`;
	}


	defNuevaPosicion() {
		let seno = Math.round(Math.sin(self.anguloFinal * (Math.PI/180)));
		let coseno = Math.round(Math.cos(self.anguloFinal * (Math.PI/180)));
		let ejesMov = []; //Ejes (2) que cambiarán su posición
		console.log(`${self.anguloFinal}° en radianes: ${self.anguloFinal * (Math.PI/180) } | Sen: ${seno} - Cos: ${coseno}`);

		//Operación para definir el cambio de posición:
		for(let pieza of CUBO.PIEZAS) {
	        if(pieza.coor[this.eje] == this.ejeRotacion) {
	        	for(let e of Object.keys(pieza.coor)) {
					if(this.eje != e) //El eje de rotación mantiene la posición
						ejesMov.push({eje: e, valor: pieza.coor[e]});
				}
				// console.log(ejesMov);
				/*==================== x' = x * cos(ß) + y * sen(ß) | y' = y * cos(ß) - x * sen(ß) ====================*/
				let eje1 = (ejesMov[0].valor * coseno) + (ejesMov[1].valor * seno),
					eje2 = (ejesMov[1].valor * coseno) - (ejesMov[0].valor * seno);
				// console.log(pieza.pieza3D);
				pieza.coor[ejesMov[0].eje] = eje1;
				pieza.coor[ejesMov[1].eje] = eje2;
				pieza.pieza3D.setAttribute('data-'+ejesMov[0].eje, eje1);
				pieza.pieza3D.setAttribute('data-'+ejesMov[1].eje, eje2);
				
				ejesMov = [];
	        }
	    }
	}
}