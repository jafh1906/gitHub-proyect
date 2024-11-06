import React, { useEffect, useState } from 'react';
import { IoFilter } from "react-icons/io5";
import { getOtherUserBuckets } from '../helpers/storage';
import { Link } from 'react-router-dom';
import { VscGithub } from "react-icons/vsc";

export const PostRepositorys = () => {
    const [buckets, setBuckets] = useState([]);

    useEffect(() => {
        const fetchBuckets = async () => {
            const { data, error } = await getOtherUserBuckets();
            if (!error) {
                setBuckets(data);
            }
        };

        fetchBuckets();
    }, []);

    return (
        <div className='w-screen px-10 mt-10'>
            <div className='flex justify-between'>
                <h1 className='text-white text-[24px] font-medium'>Home</h1>
                <div className='flex items-center gap-5'>
                    <p className='text-blue-500 hover:underline cursor-pointer text-sm'>Send feedback</p>
                    <button className='flex items-center gap-2 bg-[#212830] hover:bg-[#262c36] py-1 px-2 rounded-md border border-[#3d444d]'>
                        <IoFilter className='text-[#5c626c] text-xl'/>
                        <span className='text-white font-medium'>Filter</span>
                    </button>
                </div>
            </div>
            <div id='post' className='bg-[#0d1117] border-[#3d444d] border rounded-md p-4 mt-5'>
                {buckets.map((bucket) => (
                    <div key={bucket.id} className='mb-4'>
                        <div className='flex items-center gap-2'>
                            <VscGithub className='text-[#2b2e36] bg-black rounded-full text-2xl'/>
                            <p className='text-white'>{bucket.username}</p>
                        </div>
                        <div className='bg-[#151B23] p-3 mt-3 rounded-md'>
                            <Link to={`/Repositorys/${bucket.id}`}>
                                <p className='text-white font-semibold hover:underline hover:text-blue-500'>{bucket.name}</p>
                            </Link>
                            <p className='text-white text-sm mt-1'>
                                {bucket.description || "No description available"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
