'use client'
import React, {useState} from 'react';
import FileSaver from 'file-saver';

const reservedWords = [
  { word: 'auto', tipo: 'PR' },
  { word: 'break', tipo: 'PR' },
  { word: 'case', tipo: 'PR' },
  { word: 'char', tipo: 'PR' },
  { word: 'const', tipo: 'PR' },
  { word: 'continue', tipo: 'PR' },
  { word: 'default', tipo: 'PR' },
  { word: 'do', tipo: 'PR' },
  { word: 'double', tipo: 'PR' },
  { word: 'else', tipo: 'PR' },
  { word: 'enum', tipo: 'PR' },
  { word: 'extern', tipo: 'PR' },
  { word: 'float', tipo: 'PR' },
  { word: 'for', tipo: 'PR' },
  { word: 'goto', tipo: 'PR' },
  { word: 'if', tipo: 'PR' },
  { word: 'int', tipo: 'PR' },
  { word: 'long', tipo: 'PR' },
  { word: 'main', tipo: 'PR' },
  { word: 'register', tipo: 'PR' },
  { word: 'return', tipo: 'PR' },
  { word: 'short', tipo: 'PR' },
  { word: 'signed', tipo: 'PR' },
  { word: 'sizeof', tipo: 'PR' },
  { word: 'static', tipo: 'PR' },
  { word: 'struct', tipo: 'PR' },
  { word: 'switch', tipo: 'PR' },
  { word: 'typedef', tipo: 'PR' },
  { word: 'union', tipo: 'PR' },
  { word: 'unsigned', tipo: 'PR' },
  { word: 'void', tipo: 'PR' },
  { word: 'volatile', tipo: 'PR' },
  { word: 'while', tipo: 'PR' },
  { word: 'include', tipo: 'PR' },
  { word: 'printf', tipo: 'PR' },
  { word: 'scanf', tipo: 'PR' },
  { word: 'fprintf', tipo: 'PR' },
  { word: 'fscanf', tipo: 'PR' },
  { word: 'sprintf', tipo: 'PR' },
  { word: 'fseek', tipo: 'PR' },
  { word: 'fopen', tipo: 'PR' },
  { word: 'fclose', tipo: 'PR' },
  { word: 'getch', tipo: 'PR' },

];

const mathOperators = [
    { word: "+", tipo: "OM" },
    { word: "-", tipo: "OM" },
    { word: "*", tipo: "OM" },
    { word: "/", tipo: "OM" },
    { word: "%", tipo: "OM" },
  ];
  
const relationalOperators = [
   { word: "==", tipo: "OR" },
   { word: "!=", tipo: "OR" },
   { word: "<", tipo: "OR" },
   { word: ">", tipo: "OR" },
   { word: "<=", tipo: "OR" },
   { word: ">=", tipo: "OR" },
   { word: "=", tipo: "OR"},
  ];
  
const logicalOperators = [
    { word: "|", tipo: "OL" },
    { word: "!", tipo: "OL" },
    { word: "&", tipo: "OL"},
  ];
  
const groupingOperators = [
    { word: "(", tipo: "OGA" },
    { word: ")", tipo: "OGA" },
    { word: "{", tipo: "OGA" },
    { word: "}", tipo: "OGA" },
    { word: "[", tipo: "OGA" },
    { word: "]", tipo: "OGA" },
  ];

const seperate = [
  { word: '.', tipo: 'NUM' },
  { word: ':', tipo: 'NUM' },
  { word: ';', tipo: 'NUM' },
  { word: ',', tipo: 'NUM' },
];

function removeCommentsFromCode(text) {
  // Elimina comentarios de bloque (/* ... */) usando una expresión regular
  text = text.replace(/\/\*[\s\S]*?\*\//g, '');

  // Elimina comentarios de línea (// ...) usando una expresión regular
  text = text.replace(/\/\/.*/g, '');

  return text;
}

function Examen() {
  const [ShowText, setShowText] = useState('');
  const [foundWords, setFoundWords] = useState([]);
  const [condicion, setCondicion] = useState(true)
  const [tokenC, setTokenC] = useState(0);
  const [caracterC, setCaracterC] = useState(0);
  const [reserved, setReserved] = useState(0);
  const [mathS, setMathS] = useState(0);
  const [relational, setRelational] = useState(0);
  const [logical, setLogical] = useState(0);
  const [group,setGroup] = useState(0);
  const [isNumbers, setNumbers] = useState(0);
  const [isSeparador, setSeparador] = useState(0);
  const [identifier, setIdentifier] = useState(0);
  const [cadena, setCadena] =useState(0);



  const changeText = (e) => {
    setShowText(e.target.value);
    setCaracterC(e.target.value.length);
  };
  
  const changeTextFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = (e) => { 
      const file = e.target.result;
      setShowText(file);
    }
  }
  
  
  const findReservedWords = () => {
    
    let reserved = 0;
    let mathS = 0;
    let relational = 0;
    let logical = 0;
    let group = 0;
    let isNumbers = 0;
    let separador = 0;
    let identifier = 0;
    let cadena =0;


    const codeWithOutComments = ShowText.replace(/(\/\/[^\n]*)|\/\*[\s\S]*?\*\//g, '');
    const words = codeWithOutComments.match(/(\.|,|\;|\:|=|(\{|\}|\[|\]|\(|\))|(\+|-|\*|\/|%)|(!|>|<|&|\|)|("[a-zA-Z ,!]+")|[a-zA-Z_]+([0-9]+)?|[0-9]+)/g);
    console.log(words);
    setTokenC(words.length);
    const found = words.map((word) => {
      if (reservedWords.some((rw) => rw.word === word)) {
        const rw = reservedWords.find((r) => r.word === word);
        reserved++
        return {
          word,
          tipo: rw.tipo,
        };
      } else if (logicalOperators.some((op) => op.word === word)) {
        logical++
        return {
          word,
          tipo: 'LO',
        };
      } else if (mathOperators.some((op) => op.word === word)) {
        mathS++
        return {
          word,
          tipo: 'MO',
        };
      } else if (relationalOperators.some((op) => op.word === word)) {
        relational++
        return {
          word,
          tipo: 'RO',
        };
      } else if (groupingOperators.some((op) => op.word === word)) {
        group++
        return {
          word,
          tipo: 'GO',
        };
      } else if (/^[0-9]+$/.test(word)) {
        isNumbers++
        console.log(word);
        return {
          word,
          tipo: 'NUM',
        };
      } else if(seperate.some((se)=>se.word===word)){
        separador++
        return{
          word,
          tipo: 'SEPARADOR',
        };
      }else if(/"('\\'"|.)*?"/.test(word)){
        cadena++
        return{
          word,
          tipo: 'CADENA',
        };
      } else {
        identifier++
        return {
          word,
          tipo: 'ID',
        };
      }
    });

    setFoundWords(found);;
    setReserved(reserved);
    setMathS(mathS);
    setLogical(logical);
    setRelational(relational);
    setGroup(group);
    setSeparador(separador);
    setIdentifier(identifier);
    setNumbers(isNumbers);
    setCadena(cadena);
  };

  const saveToTextFile = () => {
    const content = foundWords.map((item) => `${item.word} - ${item.tipo}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'palabras_analizadas.txt');
  };


  const clearArea = () => {
    setShowText('');
    setFoundWords([]);
    setTokenC(0);
  };
  const count = () => {
    if (ShowText) {
      const words = ShowText.split(/[a-zA-Z]+|[0-9]+/g).filter(word => word.trim() !== "");
      return words.length;
    } else {
      return 0;
    }
  }

  return (
    <div className="text-center h-screen w-screen bg-orange-100 font-mono mb-5 flex-col justify-center">
      {
          condicion ?  <textarea
          className="m-4 text-rose-950 font-mono text-2xl bg-orange-200 rounded-md p-1 pt-2 w-screen h-60 mt-5"
          value={ShowText}
          onChange={(e) => changeText(e)}
        /> 
        
        : 
        
        <div className='text-center w-screen bg-orange-100 font-mono mb-5 flex-col justify-center'>
          <input className='text-2xl font-bold text-rose-950' type="file" accept=".txt" onChange={e => changeTextFile(e)} />
          <div>
          <textarea className='m-4 text-rose-950 font-mono text-2xl bg-orange-200 rounded-md p-1 pt-2 w-full h-60 mt-5' value={ShowText} readOnly />
          </div>
        </div>
        
      }
     
      <div className=' w-screen bg-orange-100'>
        <button className="bg-sky-900 rounded-md p-3 shadow-lg hover-bg-orange-800" onClick={()=>findReservedWords()}>
          Analizar texto
        </button>
        <button className="bg-sky-900 rounded-md p-3 shadow-lg hover-bg-orange-800" onClick={saveToTextFile}>
          Guardar análisis
        </button>
        <button className="bg-sky-900 rounded-md p-3 shadow-lg hover-bg-orange-800" onClick={() => { setCondicion(!condicion) }}>
          Cargar Archivo
        </button>
        <button className="bg-sky-900 rounded-md p-3 shadow-lg hover-bg-orange-800" onClick={clearArea}>
          Limpiar
        </button>
        <div >
          <p className='text-2xl font-bold text-rose-950 m-2'>Tokens Encontrados Totales: {tokenC}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>Palabras Reservadas Totales: {reserved}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>Operadores Matematicos Totales: {mathS}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>Operadores Relacionales Totales: {relational}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>Operadores Lógicos Totales: {logical}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>Operadores de Agrupacion Totales: {group}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>Numeros Totales: {isNumbers}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>Separadores Totales: {isSeparador}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>ID's Totales: {identifier}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>Cadenas Totales: {cadena}</p>
        </div>
      </div>
    </div>
  );
}

export default Examen;