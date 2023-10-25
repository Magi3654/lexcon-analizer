'use client'
import React, {useState} from 'react'


function Ejercicio01(){
  const [ShowText, setShowText]= useState(null);
  const changeText = (e) => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0])
    reader.onload = (e) => {
      e.preventDefault();
      const file = e.target.result;
      const onlyLetters = file.replace(/[^a-zA-Z]/g, '');
      const letters = onlyLetters.split('')
      setShowText(letters);
    }
  }
  const changeTextArea =(e)=>{
    const newFile = e.target.value;
    setShowText(newFile);
  }

  const clearArea = ()=>{
    setShowText(' ')
  }
  
  return(
    <div className='text-center h-screen w-screen bg-lime-200 
      font-mono mb-5 flex-col justify-center'>
        <div className='text-information p-4'>
          <h3 className=' font-bold text-4xl text-violet-950'>Inserta tu archivo</h3>
          <input className='file-upload-input font-bold text-2xl text-violet-950 m-2 p-4' type='file' accept='.txt' multiple onChange={e=>{changeText(e)}}/>
        </div>
        <div>
          <p className='text-2xl font-bold text-violet-950'>Letras escritas: {ShowText ? ShowText.length : 0}</p>
        </div>
        
        <div className='text-center'>
          <textarea  className='m-4 text-slate-950 font-mono text-2xl bg-violet-200 rounded-md p-1 pt-2 w-full h-60 mt-5' value={ShowText || ''} 
            onChange={changeTextArea} rows="15" >
            {ShowText}
          </textarea> 
          <button onClick={clearArea}>Limpiar</button>
        </div>
    </div> 
  )

}

export default Ejercicio01