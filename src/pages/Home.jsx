import React from 'react'
import { TopBar } from '../components/TopBar'
import { TopRepositories } from '../components/TopRepositories'
import { PostRepositorys } from '../components/PostRepositorys'
import { News } from '../components/News'

export const Home = () => {
  return (
    <>
    <header>
        <TopBar containerNav={false}/>
    </header>
    <main className='flex'>
        <TopRepositories/>
        <PostRepositorys/>
        {/* <News/> */}
    </main>
    </>
  )
}
