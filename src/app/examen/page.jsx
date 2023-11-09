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
  ];
  
const logicalOperators = [
    { word: "&&", tipo: "OL" },
    { word: "||", tipo: "OL" },
    { word: "!", tipo: "OL" },
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
  const [ShowTextFile, setShowTextFile] = useState('');
  const [tokenC, setTokenC] = useState(0);
  const [caracterC, setCaracterC] = useState(0);



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
    console.log(ShowText);
    const codeWithOutComments = ShowText.replace(/(\/\/[^\n]*)|\/\*[\s\S]*?\*\//g, '');
    const words = codeWithOutComments.match(/,|\;|((.=)|(\{|\}|\[|\])|(\+|-|\*|\/|%)|(!|>|<|&&|\|\|)|("[a-zA-Z ,!]+")|[a-zA-Z_]+|[0-9]+)/g) || [];
    setTokenC(words.length);
    const found = words.map((word) => {
      if (reservedWords.some((rw) => rw.word === word)) {
        const rw = reservedWords.find((r) => r.word === word);
        return {
          word,
          tipo: rw.tipo,
        };
      } else if (logicalOperators.some((op) => op.word === word)) {
        return {
          word,
          tipo: 'LO',
        };
      } else if (mathOperators.some((op) => op.word === word)) {
        return {
          word,
          tipo: 'MO',
        };
      } else if (relationalOperators.some((op) => op.word === word)) {
        return {
          word,
          tipo: 'RO',
        };
      } else if (groupingOperators.some((op) => op.word === word)) {
        return {
          word,
          tipo: 'GO',
        };
      } else if (numbers.some((num) => num.word === word)) {
        return {
          word,
          tipo: 'NUM',
        };
      } else if(/,/.test(word)){
        return{
          word,
          tipo: 'COMA',
        };
      } else if (/;/.test(word)){
        return{
          word,
          tipo: 'PUNTO Y COMA'
        };
      } else {
        return {
          word,
          tipo: 'ID',
        };
      }
    });

    setFoundWords(found);
    saveToTextFile(found);
  };

  const saveToTextFile = () => {
    const content = foundWords.map((item) => `${item.word} - ${item.tipo}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'palabras_analizadas.txt');
  };

  const clearArea = () => {
    setShowText('');
    setFoundWords([]);
    setCaracterC(0);
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
          <p className='text-2xl font-bold text-rose-950'>Tokens Encontrados: {tokenC}</p>
          <h3 className='text-2xl font-bold text-rose-950 '>Palabras y operadores encontrados:</h3>
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