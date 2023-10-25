import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <header className='p-8 bg-violet-950 space-y-5 w-screen'>
        <div className='font-mono'>
            <h1 className='text-5xl text-violet-200 font-bold'>Lexcon-Analizer </h1>
        </div> 

        <nav>
            <ul className='flex justify-evenly uppercase font-mono'>
                <li className='bg-lime-400 rounded-md p-3 shadow-lg hover:bg-violet-600'>
                  <Link href={'/'}>Inicio</Link>
                </li>
                <li className='bg-lime-400 rounded-md p-3 shadow-lg hover:bg-violet-600'>
                  <Link href={'/ejercicio1'}>Ejercicio 1</Link>
                </li>
            </ul> 
        </nav>
    </header>
    
  )
}