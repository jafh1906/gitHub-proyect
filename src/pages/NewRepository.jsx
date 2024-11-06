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
        <main>
            <CreateRepository/>
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
    </>
  )
}
