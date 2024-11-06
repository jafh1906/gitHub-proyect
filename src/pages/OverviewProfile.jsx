import React from 'react'
import { TopBar } from '../components/TopBar'
import { User } from '../components/User'

export const OverviewProfile = () => {
  return (
    <>
    <div className='bg-[#0D1117]'>
        <header>
            <TopBar containerNav={true}/>
        </header>
        <main>
            <User/>
        </main>
    </div>
    </>
  )
}
