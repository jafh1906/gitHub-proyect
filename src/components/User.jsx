import React from 'react'
import fotoUser from '../assets/logoGitHubN.png'
import { GoPeople } from "react-icons/go";

export const User = () => {
  return (
    <>
    <div className='mt-10 px-6'>
        <div className='w-[250px]'>
            <div>
                <img className='object-contain border border-[#6d737a] rounded-full' src={fotoUser} alt="" />
            </div>
            <div className='flex flex-col gap-3'>
                <h1 className='text-[#6d737a] text-[20px]'>nameUser</h1>
                <button className='text-white font-semibold text-sm w-full bg-[#212830] hover:bg-[#262c36] border-[#6d737a] border py-2 rounded-md'>Edit profile</button>
                <div className='flex gap-3'>
                    <div className='flex items-center gap-3'>
                        <GoPeople className='text-[#9198a1] hover:text-blue-600'/>
                        <p className='text-white font-bold text-sm hover:text-blue-600'>0 <span className='text-[#9198a1] font-normal hover:text-blue-600'>followers</span></p>
                    </div>
                    <p className='text-white font-bold text-sm hover:text-blue-600'>0 <span className='text-[#9198a1] font-normal hover:text-blue-600'>following</span></p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
