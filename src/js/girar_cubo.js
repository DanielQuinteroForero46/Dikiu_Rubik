let cubo = document.querySelector('.cube');
let radioGroup = document.querySelector('.radio-group');
let ladoActual ='';

function girarCubo() {
  	let checkedRadio = radioGroup.querySelector(':checked');
  	let showClass = 'show-' + checkedRadio.value;

  	if(ladoActual) cubo.classList.remove(ladoActual);
  	cubo.classList.add(showClass);
  	ladoActual = showClass;
}
girarCubo(); //Giro inicial

radioGroup.addEventListener( 'change', girarCubo);