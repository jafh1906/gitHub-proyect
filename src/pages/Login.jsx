import React, { useState } from 'react'
import logoGitHub1 from "../assets/logoGitHubB.png";
import { supabase } from '../supabase/client';
import { Link, useNavigate } from 'react-router-dom';





export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const signInWithEmail = async (e)=>{
        e.preventDefault();

        if (!email || !password) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            })
    
            if (error) throw error;
    
            alert('Inicio de sesion con exito')

            if(!error){
                navigate('/Home')
            }
        } catch (e) {
            alert(e.message);
        }
      }
  return (
    <>
    <div className='flex flex-col justify-center items-center bg-[#0d1117] h-screen'>
        <div className='flex flex-col items-center gap-4'>
            <Link to='/'>
                <img className='w-[70px]' src={logoGitHub1} alt="" />
            </Link>
            <h1 className='text-white text-center text-2xl font-light mb-4'>Sign in to GitHub</h1>
        </div>
        <div className='bg-[#151b23] w-[280px] p-3 border-[#3d444d] border rounded-md'>
            <form onSubmit={signInWithEmail} className='flex flex-col items-center'>
                <div className='flex flex-col gap-2 mb-4'>
                    <div>
                        <label htmlFor="" className='text-white'>Username or email address</label>
                    </div>
                    <input className='w-[250px] pl-2.5 py-0.5 outline-none bg-[#0d1117] focus:ring focus:ring-blue-700 rounded-md text-white border-[#3d444d] border'
                     type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <label htmlFor="" className='text-white'>Password</label>
                        <label htmlFor="" className='text-blue-700 text-xs cursor-pointer'>Forgot password</label>
                    </div>
                    <input className='w-[250px] pl-2.5 py-0.5 outline-none bg-[#0d1117] focus:ring focus:ring-blue-700 rounded-md text-white border-[#3d444d] border'
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex w-[250px] justify-center mt-4 mb-2'>
                    <button type='submit' className='text-white w-full py-1 bg-[#238636] hover:bg-[#29903b] font-semibold rounded-md'>Sing in</button>
                </div>
            </form>
        </div>
        <div className='text-center border-[#3d444d] border rounded-md w-[280px] py-5 mt-4'>
            <p className='text-blue-500 hover:underline hover:text-blue-500 text-sm font-semibold cursor-pointer'>Sign in with a passkey</p>
            <p className='text-white text-sm'>New to GitHub? <Link to='/CreateAccount'className='text-blue-500 hover:underline hover:text-blue-500 text-sm cursor-pointer'>Create an account</Link>
            </p>
        </div>
        <div className='lg:flex flex flex-wrap gap-3 mt-12'>
            <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Terms</p>
            <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Privacy</p>
            <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Docs</p>
            <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Contact GitHub Support</p>
            <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Manage cookies</p>
            <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Do not share my personal information</p>
        </div>
    </div>
    </>
  )
}
