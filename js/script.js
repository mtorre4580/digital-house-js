document.addEventListener('DOMContentLoaded',()=>loadContent());

const API_PROVINCIAS = 'http://dry-dawn-651.getsandbox.com/provincias';

const getProvincias = () =>
	new Promise((resolve,reject) => {
		fetch(API_PROVINCIAS)
			.then(r => r.json())
			.then(data => resolve(data))
			.catch(err => reject('Se produjo un error al obtener las provincias'))
	});
	
const loadContent = () => {
	getProvincias().then(provincias=>loadSelectProvincias(provincias));
	setSubmitFormProvincias();
}

const loadSelectProvincias = provincias => {
	for(let i in provincias){
		let option = document.createElement('option');
  		option.innerHTML = provincias[i].state;
		provinciasSelect.appendChild(option);
	}
}

const setSubmitFormProvincias = () =>{
	let form = document.querySelector('form');
	form.onsubmit = ()=>{
		let importe = getValueInput('importe');
		let interes = getValueInput('interes');
		let resultado = calculatePrestamo(importe,interes);
		setResultado(resultado);
		return false;
	}
}

const getValueInput = nombre => parseInt(document.querySelector(`input[name=${nombre}]`).value);

const calculatePrestamo = (importe,interes) => {
	let res = {};
	res.totalAPagar = interes/100*importe + importe;
	res.cuotaMensual = res.totalAPagar/12;
	return res;
}

const setResultado = resultado => {
	let cuotaMensualInput = document.querySelector('input[name="cuotaMensual"]');
	let totalAPagarInput = document.querySelector('input[name="totalAPagar"]');
	cuotaMensualInput.value = resultado.cuotaMensual;
	totalAPagarInput.value = resultado.totalAPagar;
}
