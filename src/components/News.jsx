import React from 'react'
import aniversary from '../assets/aniversary.png'
import { IoClose } from "react-icons/io5";

export const News = () => {
  return (
    <>
    <div className='pr-6 space-y-6 mb-4'>
      <div className="bg-black flex items-center justify-center mt-10 w-auto">
        <div 
          className="w-full rounded-lg p-4 space-y-7 text-white"
          style={{
            background: `url(${aniversary})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className='flex justify-between items-center'>
            <h2 className="text-2xl font-bold tracking-tight">UNIVERSE<span className='text-[#8b949e]'>'24</span></h2>

            <button>
              <IoClose />
            </button>
          </div>
          <div className="space-y-7">
            
            <p className="text-sm/relaxed text-white/90">
              <span className='font-semibold'>Get 30+ hours of free content</span> when you watch all the virtual sessions you may have missed at GitHub Universe.
            </p>

            <button className="w-full bg-white text-black font-medium rounded-md text-sm hover:bg-white/90 py-1 ">Watch now</button>
          </div>
        </div>
      </div>
      <div className='bg-[#0d1117] p-4 rounded-md border border-[#3d444d]'>
        <h1 className='text-white text-sm font-semibold'>Latest changes</h1>
        <div className='space-y-2 pl-4 mt-4'>
          <p className='text-[#6e7074] text-xs'>12 hours ago</p>
          <p className='text-white text-sm hover:underline hover:text-blue-500 cursor-pointer'>EMU OIDC CAP support is now enhanced to protect web sessions...</p>
        </div>
        <div className='space-y-2 pl-4 mt-4'>
          <p className='text-[#6e7074] text-xs'>17 hours ago</p>
          <p className='text-white text-sm hover:underline hover:text-blue-500 cursor-pointer'>Notice of breaking changes for GitHub Actions</p>
        </div>
        <div className='space-y-2 pl-4 mt-4'>
          <p className='text-[#6e7074] text-xs'>2 days ago</p>
          <p className='text-white text-sm hover:underline hover:text-blue-500 cursor-pointer'>Copilot subscription-based network routing is now enforced</p>
        </div>
        <div className='space-y-2 pl-4 mt-4'>
          <p className='text-[#6e7074] text-xs'>5 days ago</p>
          <p className='text-white text-sm hover:underline hover:text-blue-500 cursor-pointer'>Claude 3.5 Sonnet is now available to all Copilot users in public preview
          </p>
        </div>
        <p className='text-[#6e7074] hover:underline hover:text-blue-500 cursor-pointer mt-4 pl-4 text-xs'>View changelog →</p>
      </div>
    </div>
    </>
  )
}
