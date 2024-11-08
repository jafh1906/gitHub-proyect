import React from 'react'
import { TopBar } from '../components/TopBar'
import { TopRepositories } from '../components/TopRepositories'
import { PostRepositorys } from '../components/PostRepositorys'
import { News } from '../components/News'
import { Footer } from '../components/Footer'

export const Home = () => {
  return (
    <>
    <div className=''>
      <header>
          <TopBar containerNav={false}/>
      </header>
      <main className='lg:flex lg:flex-row flex-col'>
        <div>
          <TopRepositories/>
        </div>
        <div className='lg:flex lg:flex-row flex-col w-full'>
          <div className='lg:w-[65%]'>
            <PostRepositorys/>
          </div>
          <div className='lg:w-[35%] hidden lg:block'>
            <News/>
          </div>
        </div>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
    </>
  )
}
