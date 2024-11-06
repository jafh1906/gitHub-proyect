import React from 'react';
import { Link } from 'react-router-dom';
import logoGitHub1 from "../assets/logoGitHubB.png";
import line1 from '../assets/line1.png';
import line2 from '../assets/line2.png';
import icon from '../assets/icon.png';
import PyG from '../assets/P&G.png';
import Telus from '../assets/Telus.png';
import mercedes from '../assets/Mercedes Benz.png';
import kpmg from '../assets/Mask group.png';
import tresM from '../assets/3M.png';
import sap from '../assets/sap.png';
import { FaChevronDown } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { ImMenu } from "react-icons/im";

export const HomePage = () => {
  return (
    <>
    <div className='px-4 lg:px-8 pt-5'>
        <div className='flex justify-between'>
            <div className='block lg:hidden text-white'>
                <ImMenu className='text-3xl text-[#8283a0]'/>
            </div>
            <div className='hidden lg:flex gap-3'>
                <img className='w-10' src={logoGitHub1} alt="" />
                <p className='flex items-center gap-2'>
                    <span className='text-white'>Product</span>
                    <FaChevronDown className='text-white'/>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='text-white'>Solutions</span>
                    <FaChevronDown className='text-white'/>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='text-white'>Resources</span>
                    <FaChevronDown className='text-white'/>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='text-white'>Open Sources</span>
                    <FaChevronDown className='text-white'/>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='text-white'>Enterprise</span>
                    <FaChevronDown className='text-white'/>
                </p>
                <p className='flex items-center'>
                    <span className='text-white'>Pricing</span>
                </p>
            </div>
            <div className='block lg:hidden'>
                <img className='w-10' src={logoGitHub1} alt="" />
            </div>
            <div className='flex gap-4 items-center'>
                <input
                 className='hidden lg:block outline-none focus:ring focus:ring-[#5931a4] rounded-md w-[200px] py-1.5 pl-2 bg-[#57606A] bg-opacity-50 border-[#6b6f7c] border text-white text-sm'
                 type="text" 
                 placeholder='Search GitHub' 
                />
                <Link to="/Login">
                    <button className='border rounded-md py-1 px-1.5 lg:border-none text-white'>Sing in</button>
                </Link>
                <Link to="/CreateAccount">
                    <button className='hidden lg:block text-white border border-white py-1 px-1.5 rounded-md'>Sing up</button>
                </Link>
            </div>
        </div>
        <div className='mt-14 flex'>
            <div className='flex flex-col items-start'>
                <FaRegCircle className='text-[#56595d] ml-[5px] lg:ml-[10px]'/>
                <img src={line1} className='ml-[5px] lg:' alt="" />
                <img src={icon} className='ml-[-25px] lg:' alt="" />
                <img src={line2} className='ml-[14px] lg:ml-[17px]' alt="" />
            </div>
            <div>
                <h1 className='text-white lg:text-[80px] text-[50px] font-semibold ml-[-70px]'>Let’s build from here</h1>
                <p className='text-white text-[20px] opacity-60 ml-[-70px]'>The world’s leading AI-powered developer platform.</p>
                <div className='lg:flex lg:flex-row space-y-4 lg:-space-y-0 flex-col ml-[-70px] mt-32 lg:items-center'>
                    <input className='outline-none pl-3 p-3 rounded-md lg:rounded-l-md lg:rounded-r-none w-full lg:w-auto' type="text" placeholder='you@company.com' />
                    <div className='bg-[#763ec6] px-3 py-3 text-white font-medium rounded-md lg:rounded-r-md lg:rounded-l-none text-center'>
                        <Link to='/CreateAccount' className=''>Sign up for GitHub</Link>
                    </div>
                </div>
                <p className='text-white text-[18px] opacity-60 ml-[-70px] mt-16'>Trusted by the world’s leading organizations ↘︎</p>
                <div className='lg:flex lg:flex-row ml-[-70px] mt-5 gap-10  lg:gap-16'>
                    <div className='flex items-center gap-10 lg:gap-16 mb-5'>
                        <img className='w-[50px] lg:w-auto' src={tresM} alt="" />
                        <img className='w-[65px] lg:w-auto' src={kpmg} alt="" />
                        <img className='w-[100px] lg:w-auto' src={mercedes} alt="" />
                    </div>
                    <div className='flex items-center gap-10 lg:gap-16'>
                        <img className='w-[60px] lg:w-auto' src={sap} alt="" />
                        <img className='w-[65px] lg:w-auto' src={PyG} alt="" />
                        <img className='w-[100px] lg:w-auto' src={Telus} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
