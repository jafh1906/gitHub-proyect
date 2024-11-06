import React from 'react'
import { useParams } from 'react-router-dom';
import { TopBar } from '../components/TopBar'
import { Files } from '../components/Files'

export const Repositorys = () => {
    const { bucketId } = useParams();

  return (
    <>
    <header>
        <TopBar/>
    </header>
    <main className='flex'>
        <Files bucketId={ bucketId }/>
    </main>
    </>
  )
}
