'use client'
import React, {useState} from 'react'

const Ejercicio04 = () => {
    //Declaracion de estados
    const [archivo, setArchivo] = useState();
    const [texto, setTexto] = useState([]);
    const [cantidad, setCantidad] = useState('Cantidad de caracteres encontrados: 0');
    const [mensaje, setMensaje] = useState();

    //Funcion para leer el archivo y analizar su contenido
    const leerArchivo = (e)=>{
        e.preventDefault();// Prevenir la recarga de la página por defecto

        //Si se ha seleccionado un archivo
        if(archivo){
            const lectorArchivo = new FileReader(); // Crea una nueva instancia de FileReader.
            lectorArchivo.readAsText(archivo);//Lee el contenido del archivo seleccionado como texto.

            //Funcion para obtener el contenido del archivo y mostrarlo en el DOM
            lectorArchivo.onload = function(){

                const data = lectorArchivo.result;//Obtener el contenido del archivo
                const nuevoContenido = data.replace(/\/\/[^\n\r]|\/\[\s\S]?\\/g, '');//Expresion regular para quitar comentarios simples y comentarios de bloque
                const contenidoFiltrado = nuevoContenido.match(/[01]+/g);//Expresion regular para filtrar secuencias de caracteres binarios '01' del contenido.
                const caracteresNoValidos = nuevoContenido.match(/[^01\s]/g);//Se buscan caracteres no válidos fuera de los comentarios.
                
                //Si se encuentran caracteres no validos
                if(caracteresNoValidos){
                     //Se interrumpe el programama y muestra un mensaje de error con los caracteres no validos encontrados fuera de comentarios
                    setTexto('');
                    setCantidad('');
                    setMensaje(`Error: El archivo contiene caracteres no válidos fuera de comentarios. ${caracteresNoValidos}`);
                    return;
                    
                }else{
                    // Si no se encuentran caracteres no válidos, se establece el texto filtrado, la cantidad de caracteres y un mensaje de éxito.
                    setTexto(contenidoFiltrado.join('\n'))
                    setCantidad(`Se encontraron ${contenidoFiltrado.length} caracteres`)
                    setMensaje('Archivo leido correctamente')
                }
            }
        }else{
            setMensaje('Error'); // Si 'file' es falso, establece la variable de estado 'mensaje' en 'Error'.
        }
}

//Funcion para limpiar el contenido
const Limpiar = (e) =>{
    e.preventDefault();
    setTexto('');
    setCantidad('cantiadad de caracteres: 0')
    setMensaje('')
}
  return (
    <div className = 'max-w-lg mx-auto mt-5'>
        <h1 className = 'text-center font-bold uppercase'>Lector de archivos.txt que elimina comentarios y acepta cadenas de numeros binarios</h1>

        <form id = 'formulario'>
            <div className = 'mt-5 flex'>
                <input onChange = {e => setArchivo(e.target.files[0])} className = 'cursor-pointer' type="file" />
            </div>

            <div className = 'mt-5'>
                <textarea value = {texto} onChange = {e => setTexto(e.target.value)} className = 'border-double border-4 border-indigo-600' cols = "60" rows = "10"></textarea>
            </div>

            <button className = 'p-2 border border-solid rounded-md cursor-pointer hover:bg-slate-300' onClick={leerArchivo} >Ejecutar</button>
        </form>
        
        <button onClick={Limpiar} className = 'p-2 border border-solid rounded-md cursor-pointer hover:bg-slate-300'>Limpiar</button>
        
        <p onChange = {e => setCantidad(e.target.value)}>{cantidad}</p>
        <p onChange = {e => setCantidad(e.target.value)}>{mensaje}</p>
    </div>
  )
}

export default Ejercicio04