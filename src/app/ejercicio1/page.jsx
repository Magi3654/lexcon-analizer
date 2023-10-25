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
  
  return(
    <div className='text-center bg-lime-200'>
        <div className='text-information'>
          <h3 className=' font-bold text-4xl text-black'>Inserta tu archivo</h3>
          <input className='file-upload-input font-bold text-2xl text-black' type='file' accept='.txt' multiple onChange={e=>{changeText(e)}}/>
        </div>
        <div>
          <p className='text-2xl font-bold text-black'>Número de caracteres escritos: {ShowText ? ShowText.length : 0}</p>
        </div>
        
        <div className='text-center'>
          <textarea  className='h-500 w-500 m-3 text-slate-950 font-sans text-2xl' value={ShowText || ''} onChange={changeTextArea} rows="30" cols="105" >
            {ShowText}
          </textarea> 
        </div>
    </div> 
  )

}

export default Ejercicio01