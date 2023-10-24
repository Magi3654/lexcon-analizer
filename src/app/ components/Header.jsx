import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <header className='p-8 bg-violet-200 space-y-5'>
        <div>
            <h1 className='text-4xl text-center text-violet-500'>UNIDAD 5</h1>
        </div>
        

        <nav>
            <ul className='flex justify-evenly uppercase'>
                <li className='bg-fuchsia-400 rounded-md p-3 shadow-lg hover:bg-amber-200'>
                  <Link href={'/'}>Inicio</Link>
                </li>
                <li className='bg-fuchsia-400 rounded-md p-3 shadow-lg hover:bg-amber-200'>
                  <Link href={'/ejercicio1'}>Ejercicio 1</Link>
                </li>
            </ul> 
        </nav>
    </header>
    
  )
}