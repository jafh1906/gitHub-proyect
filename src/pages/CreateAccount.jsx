import React, { useState } from 'react';
import logoGitHub1 from "../assets/logoGitHubB.png";
import { supabase } from '../supabase/client';
import { Link, useNavigate } from 'react-router-dom';

export const CreateAccount = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const signUpNewUser = async (e) => {
        e.preventDefault();

        if (!email || !password || !username) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const { data: existingUsernames, error } = await supabase
                .from('profiles')
                .select('username')
                .eq('username', username);

            if (error || existingUsernames.length > 0) {
                throw new Error(error ? error.message : 'El nombre de usuario ya está en uso, elige otro.');
            }

            const { data: { user }, error: signUpError } = await supabase.auth.signUp({
                email,
                password
            });

            if (signUpError) throw signUpError;
            if (!user) throw new Error('El usuario no se creó correctamente');

            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: user.id, username }]);

            if (profileError) throw profileError;

            alert('Cuenta creada exitosamente');
            navigate('/Home');
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center bg-[#0d1117] h-screen'>
            <div className='flex flex-col items-center gap-4'>
                <Link to='/'>
                    <img className='w-[70px]' src={logoGitHub1} alt="GitHub Logo" />
                </Link>
                <h1 className='text-white text-center text-2xl font-light mb-4'>Create your GitHub account</h1>
            </div>

            <div className='bg-[#151b23] w-[280px] p-3 border-[#3d444d] border rounded-md'>
                <form onSubmit={signUpNewUser} className='flex flex-col items-center'>
                    <div className='flex flex-col gap-2 mb-4'>
                        <label className='text-white'>Email</label>
                        <input
                            className='w-[250px] pl-2.5 py-0.5 outline-none bg-[#0d1117] focus:ring focus:ring-blue-700 rounded-md text-white border-[#3d444d] border'
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-2 mb-4'>
                        <label className='text-white'>Username</label>
                        <input
                            className='w-[250px] pl-2.5 py-0.5 outline-none bg-[#0d1117] focus:ring focus:ring-blue-700 rounded-md text-white border-[#3d444d] border'
                            type="text"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-white'>Create password</label>
                        <input
                            className='w-[250px] pl-2.5 py-0.5 outline-none bg-[#0d1117] focus:ring focus:ring-blue-700 rounded-md text-white border-[#3d444d] border'
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className='flex w-[250px] justify-center mt-4 mb-2'>
                        <button type="submit" className='text-white w-full py-1 bg-[#238636] hover:bg-[#29903b] font-semibold rounded-md'>
                            Create account
                        </button>
                    </div>
                </form>
            </div>

            <div className='text-center border-[#3d444d] border rounded-md w-[280px] py-5 mt-4'>
                <p className='text-blue-500 hover:underline hover:text-blue-500 text-sm font-semibold'>Sign in with a passkey</p>
                <p className='text-white text-sm'>
                    You have an account? <Link to='/Login' className='text-blue-500 hover:underline hover:text-blue-500 text-sm'>Sign in</Link>
                </p>
            </div>
            <div className='lg:flex flex justify-center flex-wrap gap-3 mt-12'>
                <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Terms</p>
                <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Privacy</p>
                <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Docs</p>
                <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Contact GitHub Support</p>
                <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Manage cookies</p>
                <p className='text-xs text-[#9198a1] cursor-pointer hover:underline hover:text-blue-500'>Do not share my personal information</p>
            </div>
        </div>
    );
};
