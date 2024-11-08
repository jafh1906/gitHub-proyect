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
      <header className=''>
          <TopBar containerNav={false}/>
      </header>
      <main className='lg:flex lg:flex-row flex-col'>
        <div className='lg:sticky lg:top-0 lg:h-screen lg:overflow-auto'>
          <TopRepositories/>
        </div>
        <div>
          <div className='lg:flex lg:flex-row flex-col w-full'>
            <div className='lg:w-[65%]'>
              <PostRepositorys/>
            </div>
            <div className='lg:w-[35%] hidden lg:block'>
              <News/>
            </div>
          </div>
          <div className=''>
            <Footer/>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
