import React from 'react'
import { TopBar } from '../components/TopBar'
import { CreateRepository } from '../components/CreateRepository'
import { Footer } from '../components/Footer'


export const NewRepository = () => {
  return (
    <>
    <div>
        <header>
            <TopBar/>
        </header>
        <main className='bg-[#0d1117]'>
            <CreateRepository/>
        </main>
        <footer className='bg-[#0d1117]'>
            <Footer/>
        </footer>
    </div>
    </>
  )
}
