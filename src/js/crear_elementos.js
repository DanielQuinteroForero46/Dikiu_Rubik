//CREAR ELEMENTOS PERSONALIZADOS EN JS:
const crearElemento = (elemento, atributos, hijos) => { //Recibe el un String del elemento y dos objetos: los atributos y los hijos
	let miElemento = document.createElement(elemento); //Crear elemento
	
	if(hijos !== undefined) hijos.forEach(elm => { //Si se enviaron elementos hijos se recorre el objeto para agregarlos a la etiqueta
		if(elm.nodeType) {
			if(elm.nodeType === 1 || elm.nodeType === 11) miElemento.appendChild(elm);	
		} else {
			miElemento.innerHTML+= elm;
		}
	});
	miElemento = agregarAtributos(miElemento, atributos); //Función para agregar atributos enviados

	return miElemento;
}


const agregarAtributos = (miElemento, atributosObj) => {//Añadir el objeto de atributos al elemento
	for(let atr in atributosObj) {
		// Preguntar si el objeto tiene en sí mismo ese atributo (Podría estar heredando el atributo y genere un problema)
		if(atributosObj.hasOwnProperty(atr)) miElemento.setAttribute(atr, atributosObj[atr]);
	}
	return miElemento;
};