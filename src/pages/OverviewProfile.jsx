import React from 'react'
import { useParams } from 'react-router-dom';
import { TopBar } from '../components/TopBar'
import { User } from '../components/User'

export const OverviewProfile = () => {
  const { userId } = useParams();

  return (
    <>
    <div className='bg-[#0D1117]'>
        <header>
            <TopBar containerNav={true}/>
        </header>
        <main>
            <User userId={userId}/>
        </main>
    </div>
    </>
  )
}
