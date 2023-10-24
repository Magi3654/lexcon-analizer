'use client'
import React, {useState} from 'react'


function Ejercicio01(){
  const [ShowText, setShowText]= useState(null);
  const changeImage = (e) => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0])
    reader.onload = (e) => {
      e.preventDefault();
      setShowText(e.target.result);
    }
  }
  return(
    <div className='text-center m-3'>
      <div className='image-upload-wrap'>
        <input className='file-upload-input' type='file' accept='.txt' multiple onChange={e=>{changeImage(e)}}/>
        <div className='text-information'>
          <h3>Inserta tu archivo</h3>
        </div>

        <div className='text-center'>
          <p  className='h-250 w-250' >
            {ShowText}
          </p> 
        </div>
      </div>
    </div> 
  )

}

export default Ejercicio01