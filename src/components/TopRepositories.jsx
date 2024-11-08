import React, { useEffect, useState } from 'react';
import { RiGitRepositoryLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { getUserBuckets } from '../helpers/storage';
import { getUserName } from '../helpers/getuser';
import { VscGithub } from "react-icons/vsc";

export const TopRepositories = () => {
    const [buckets, setBuckets] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchBuckets = async () => {
            const { data, error } = await getUserBuckets();
            if (!error) {
                setBuckets(data);
            }
        };

        const nameUser = async () => {
          const name = await getUserName();
          setUserName(name || 'User not found');
        };

        nameUser();
        fetchBuckets();
    }, []);

    return (
        <div className='lg:h-full h-auto pb-5 px-6 bg-[#0d1117] lg:border-r border-b border-[#9198a1]'>
            <div className='flex items-center justify-between lg:pt-10 pt-5'>
                <h1 className='text-white font-semibold text-sm'>Top repositories</h1>
                <Link to='/NewRepository' className='bg-[#29903b] flex items-center justify-center gap-1 py-1 w-[60px] rounded-md'>
                    <RiGitRepositoryLine className='text-white'/>
                    <p className='text-white text-sm font-semibold'>New</p>
                </Link>
            </div>
            <div className='mt-2'>
                <input className='outline-none w-[270px] h-[30px] focus:ring focus:ring-blue-700 rounded-lg text-white bg-[#151b23] border-[#3d444d] border pl-3' type="text" placeholder='Find a repository…' />
            </div>
            <div id='repositorios' className='mt-5'>
                {buckets.map((bucket) => (
                    <Link to={`/Repositorys/${bucket.id}`} key={bucket.id} className='text-white flex gap-3 items-center'>
                      <VscGithub className='text-[#2b2e36] bg-black rounded-full text-2xl'/>
                      <div className='flex'>
                        <p>{userName}<span className='font-extralight text-zinc-400'>/</span></p>
                        {bucket.name}
                      </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
