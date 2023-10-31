'use client'
import React, {useState} from 'react';
import FileSaver from 'file-saver';

const reservedWords =[
    'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
    'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int',
    'long','main', 'register', 'return', 'short', 'signed', 'sizeof', 'static',
    'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while' 
];
/*
function isReserved(word){
    return reservedWords.includes(word) ? 'palabra reservada' : 'ID';
}*/
function removeCommentsFromCode(text) {
    // Elimina comentarios de bloque (/* ... */) usando una expresión regular
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');
  
    // Elimina comentarios de línea (// ...) usando una expresión uregular
    text = text.replace(/\/\/.*/g, '');
  
    return text;
  }

function Ejercicio4() {
    const [ShowText, setShowText] = useState('');
    const [foundWords, setFoundWords] = useState([]);

    const changeText = (e) => {
        e.preventDefault()
        const reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.onload = (e) => {
          const file = e.target.result;
          const codeWithOutComments = removeCommentsFromCode(file)
          setShowText(codeWithOutComments);
        }
      }

    const findReservedWords = () =>{
      const words = ShowText.match(/\w+/g) || [];
      const found = words.map((word) => {
        if (reservedWords.includes(word)) {
          return {
            word,
            tipo: 'PR',
          };
        } else if (/[a-zA-Z]+/.test(word)) {
          return {
            word,
            tipo: 'ID',
          };
        } else {
          return {
            word,
            tipo: 'simbolo',
          };
        }
      });
      
        setFoundWords (found);
        saveToTextFile(found);
    }

    const saveToTextFile = (data) => {
        const content = data.map(item => item.word +"-"+ item.tipo).join('\n');
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, 'palabras_analizadas.txt');
    }
    
    const clearArea = ()=>{
        setShowText(' ')
      } 

    const count = () =>{
      if (ShowText) {
        const words = ShowText.split(/[a-zA-Z]+|[0-9]+/g).filter(word => word.trim() !== "");
        return words.length;
      } else {
        return 0;
      }
}
  return (
    <div className='text-center h-screen w-screen bg-orange-100 
    font-mono mb-5 flex-col justify-center'>
        
      <input className='text-2xl font-bold text-rose-950' type="file" accept=".txt" onChange={e => changeText(e)} />
      
      <div>
        <textarea className='m-4 text-rose-950 font-mono text-2xl bg-orange-200 rounded-md p-1 pt-2 w-full h-60 mt-5'  value={ShowText} readOnly />
      </div>
      <div>
            <p className='text-2xl font-bold text-rose-950'>Palabras escritas: {count()}</p>
      </div>
      <div>
      <button className='bg-sky-900 rounded-md p-3 shadow-lg hover:bg-orange-800' onClick={findReservedWords}>Buscar palabras reservadas</button>
      </div>
      <div>
        <h3 className='text-2xl font-bold text-rose-950' >Palabras reservadas encontradas:</h3>
        <ul>
          {foundWords.map((palabra, index) => (
            <li className='text-2xl font-bold text-rose-950' key={index}>{palabra}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}

export default Ejercicio4