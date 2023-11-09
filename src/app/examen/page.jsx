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
    { word: "&&", tipo: "OL" },
    { word: "||", tipo: "OL" },
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

const numbers = [
  { word: '0', tipo: 'NUM' },
  { word: '1', tipo: 'NUM' },
  { word: '2', tipo: 'NUM' },
  { word: '3', tipo: 'NUM' },
  { word: '4', tipo: 'NUM' },
  { word: '5', tipo: 'NUM' },
  { word: '6', tipo: 'NUM' },
  { word: '7', tipo: 'NUM' },
  { word: '8', tipo: 'NUM' },
  { word: '9', tipo: 'NUM' },
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
  const [coma, setComa] = useState(0);
  const [puntoComa, setPuntoComa] = useState(0);
  const [identifier, setIdentifier] = useState(0);



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
    let coma = 0;
    let puntoComa = 0;
    let identifier = 0;


    const codeWithOutComments = ShowText.replace(/(\/\/[^\n]*)|\/\*[\s\S]*?\*\//g, '');
    const words = codeWithOutComments.match(/,|\;|&|((=)|(\{|\}|\[|\])|(\+|-|\*|\/|%)|(!|>|<|&&|\|\|)|("[a-zA-Z ,!]+")|[a-zA-Z_]+|[0-9]+|\(|\))/g) || [];
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
        return {
          word,
          tipo: 'NUM',
        };
      } else if(/,/.test(word)){
        coma++
        return{
          word,
          tipo: 'COMA',
        };
      } else if (/;/.test(word)){
        puntoComa++
        return{
          word,
          tipo: 'PUNTO Y COMA'
        };
      } else {
        identifier++
        return {
          word,
          tipo: 'ID',
        };
      }
    });

    setFoundWords(found);
    saveToTextFile(found);
    setReserved(reserved);
    setMathS(mathS);
    setLogical(logical);
    setRelational(relational);
    setGroup(group);
    setComa(coma);
    setNumbers(isNumbers);
    setPuntoComa(puntoComa);
    setIdentifier(identifier)
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
          <p className='text-2xl font-bold text-rose-950 m-2'>Punto y coma Totales: {puntoComa}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>Comas Totales: {coma}</p>
          <p className='text-2xl font-bold text-rose-950 m-2'>ID's Totales: {identifier}</p>
          <h3 className='text-2xl font-bold text-rose-950 m-2'>Palabras y operadores encontrados:</h3>
          <ul>
            {foundWords.map((palabra, index) => (
              <li className='text-2xl font-bold text-rose-950' key={index}>{palabra.word} - {palabra.tipo}</li> 
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Examen;