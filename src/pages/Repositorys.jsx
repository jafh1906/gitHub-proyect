import React from 'react'
import { useParams } from 'react-router-dom';
import { TopBar } from '../components/TopBar'
import { Files } from '../components/Files'
import { Footer } from '../components/Footer';

export const Repositorys = () => {
    const { bucketId } = useParams();
    const {userId} = useParams();

  return (
    <>
    <header>
        <TopBar/>
    </header>
    <main>
        <Files bucketId={ bucketId } userId={userId}/>
    </main>
    <footer className='bg-[#0d1117] flex justify-center'>
      <Footer/>
    </footer>
    </>
  )
}
