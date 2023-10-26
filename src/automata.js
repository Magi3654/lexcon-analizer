const automata = (text) => {

	const matriz = [
		[0, 0, 1, 4, 0, 4],
		[4, 4, 2, 3, 4, 4],
		[2, 2, 2, 2, 0, 2],
		[3, 3, 0, 3, 3, 3],
		[4, 4, 4, 4, 4, 4]
	]
	
	
	let newText = "";
	let i = 0;
	let estado = 0
	let caracter = 0

	while (i < text.length){
		let actualChar = text[i]
		console.log(`Caracter: ${actualChar}`)
		console.log(`Estado: ${estado}`)
		console.log(`car: ${caracter}`)
		// if(regex1.test(palabra[i])){
		// 	console.log(0)
		// 	caracter = 0
		// }
		// else if(regex0.test(palabra[i])){
		// 	console.log(1)
		// 	caracter = 1
		// }
		// else{
		// 	console.log(2)
		// 	caracter = 2
		// }

		if (estado === 0){
			if (["0", "1", "\n"].includes(actualChar)){
				caracter = 0;
				newText += actualChar;
			} else if (actualChar == "/"){
				caracter = 2;
			} else {
				caracter = 5
			}
		}

		if (estado === 1){
			if (actualChar == "/"){
				caracter = 2;
			}

			if (actualChar == "*"){
				caracter = 3;
			}
		}
		
		if (estado === 2){
			if (actualChar == "\n"){
				caracter = 4;
			}
		}

		if (estado === 3){
			if (actualChar+text[i+1] == "*/"){
				caracter = 2;
				i++
				console.log("AQUI")
			}
		}

		estado = matriz[estado][caracter]
		if (estado === 4){
			return "Se encontró un error en el archivo, corríjalo.";
		}
		i++;
	}

	return newText
}

export default automata;