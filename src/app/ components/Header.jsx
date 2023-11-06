import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <header className='p-8 bg-pink-950 space-y-5 w-screen'>
        <div className='font-mono'>
            <h1 className='text-6xl text-orange-100 font-bold'>Lexcon-Analizer </h1>
        </div> 

        <nav>
            <ul className='flex justify-evenly uppercase font-mono'>
                <li className='bg-sky-900 rounded-md p-3 shadow-lg hover:bg-orange-800 text-2xl'>
                  <Link href={'/'}>Inicio</Link>
                </li>
                <li className='bg-sky-900 rounded-md p-3 shadow-lg hover:bg-orange-800 text-2xl'>
                  <Link href={'/ejercicio1'}>Ejercicio 1</Link>
                </li>
                <li className='bg-sky-900 rounded-md p-3 shadow-lg hover:bg-orange-800 text-2xl'>
                  <Link href={'/ejercicio2'}>Ejercicio2 </Link>
                </li>
                <li className='bg-sky-900 rounded-md p-3 shadow-lg hover:bg-orange-800 text-2xl'>
                  <Link href={'/ejercicio3'}>Ejercicio3 </Link>
                </li>
                <li className='bg-sky-900 rounded-md p-3 shadow-lg hover:bg-orange-800 text-2xl'>
                  <Link href={'/ejercicio4'}>Ejercicio4 </Link>
                </li>
                <li className='bg-sky-900 rounded-md p-3 shadow-lg hover:bg-orange-800 text-2xl'>
                  <Link href={'/ejercicio5'}>Ejercicio5 </Link>
                </li>
                <li className='bg-sky-900 rounded-md p-3 shadow-lg hover:bg-orange-800 text-2xl'>
                  <Link href={'/examen'}>Examen </Link>
                </li>
            </ul> 
        </nav>
    </header>
    
  )
}