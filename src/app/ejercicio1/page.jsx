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
      const letters = onlyLetters.split('').join(',')
      setShowText(letters);
    }
  }
  
  return(
    <div className='text-center bg-lime-200'>
        <div className='text-information'>
          <h3 className=' font-bold text-4xl text-black'>Inserta tu archivo</h3>
        </div>
        <input className='file-upload-input font-bold text-2xl text-black' type='file' accept='.txt' multiple onChange={e=>{changeText(e)}}/>
        <div className='text-center'>
          <textarea  className='h-5000 w-5000 m-3 text-slate-950 font-sans' value={ShowText} rows="35" cols="105" >
            {ShowText}
          </textarea> 
        </div>
    </div> 
  )

}

export default Ejercicio01