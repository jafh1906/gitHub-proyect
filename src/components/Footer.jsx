import React from 'react'
// import { VscGithub } from "react-icons/vsc";
import { AiOutlineGithub } from "react-icons/ai";

export const Footer = () => {
  return (
    <>
    <div className='lg:flex flex flex-wrap justify-center lg:justify-normal ml-2 items-center text-[#9198a1] text-xs gap-3 pt-14 pb-4'>
        <div className='flex items-center gap-2'>
            <AiOutlineGithub className='bg-[#0d1117] hover:text-[#424850] cursor-pointer rounded-full text-2xl'/>
            <p>© 2024 GitHub, Inc</p>
        </div>
        <p className='hover:text-blue-600 hover:underline cursor-pointer'>Terms</p>
        <p className='hover:text-blue-600 hover:underline cursor-pointer'>Privacy</p>
        <p className='hover:text-blue-600 hover:underline cursor-pointer'>Security</p>
        <p className='hover:text-blue-600 hover:underline cursor-pointer'>Status</p>
        <p className='hover:text-blue-600 hover:underline cursor-pointer'>Docs</p>
        <p className='hover:text-blue-600 hover:underline cursor-pointer'>Contact</p>
        <p className='hover:text-blue-600 hover:underline cursor-pointer'>Manage cookies</p>
        <p className='hover:text-blue-600 hover:underline cursor-pointer'>Do not share my personal information</p>
    </div>
    </>
  )
}
