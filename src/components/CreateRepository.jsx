import React, { useEffect, useState } from 'react'
import { getUserName } from '../helpers/getuser';
import { createBucket } from '../helpers/storage'
import { VscGithub } from "react-icons/vsc";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { RiGitRepositoryLine } from "react-icons/ri";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export const CreateRepository = () => {

    const navigate = useNavigate();
    const [bucketName, setBucketName] = useState('');
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const nameUser = async () => {
            const name = await getUserName();
            if (name) {
                setUserName(name);
            } else {
                setUserName('User not found');
            }
        };

        nameUser();
    }, []);

    const handleCreateBucket = async () => {
        if (!bucketName) {
            alert('Por favor ingresa un nombre del bucket');
            return;
        }
    
        const { data, error } = await createBucket(bucketName, description);
    
        if (error) {
            alert(`Error al crear el bucket: ${error.message}`);
        } else {
            alert(`Bucket creado con éxito: ${bucketName}`);
            navigate(`/Repositorys/${data?.id}`);
            setBucketName('');
            setDescription(''); // Limpiar descripción
        }
    }
    

  return (
    <>
    <div className='bg-[#0d1117] px-4 lg:px-0 flex flex-col justify-center items-center'>
        <div className='mt-10'>
            <div className='border-b border-[#9198a1] py-4'>
                <h1 className='text-[24px] text-white font-semibold'>Create a new repository</h1>
                <p className='text-[#9198a1] text-sm'>A repository contains all project files, including the revision history. Already have a project repository elsewhere?</p>
                <p className='text-blue-600 underline text-xs mb-2'>Import a repository.</p>
            </div>
            <div className='mt-2 border-b border-[#9198a1] py-4'>
                <h3 className='italic text-white text-sm'>Required fields are marked with an asterisk (*).</h3>
                <div className='flex items-center gap-3 mt-4 mb-4'>
                    <div>
                        <h2 className='text-white font-medium text-sm mb-1'>Owner*</h2>
                        <button className='flex items-center gap-2 bg-[#212830] hover:bg-[#262c36] px-2 py-1 rounded-md border border-[#3d444d]'>
                            <VscGithub className='text-[#2b2e36] bg-black rounded-full text-[22px]'/>
                            <span className='text-white font-medium'>{userName}</span>
                        </button>
                    </div>
                    <h1 className='text-white text-2xl font-semibold mt-4'>/</h1>
                    <div className='flex flex-col'>
                        <label className='text-white font-medium text-sm mb-1' htmlFor="">Repository name*</label>
                        <input className='bg-[#0d1117] pl-2 text-white outline-none focus:ring focus:ring-blue-500 border-[#3d444d] border w-[180px] py-1 rounded-md'
                         type="text"
                         value={bucketName}
                         onChange={(e)=>setBucketName(e.target.value)}
                        />
                    </div>
                </div>
                <p className='text-sm text-white'>Great repository names are short and memorable. Need inspiration? How about <span className='cursor-pointer text-green-400 font-medium'>turbo-engine</span>?</p>
                <div className='mt-3 flex flex-col'>
                    <label htmlFor="" className='text-white text-sm font-medium mb-1'>Description <span className='text-xs text-[#9198a1]'>(optional)</span></label>
                    <input className='bg-[#0d1117] text-white pl-2 outline-none focus:ring focus:ring-blue-500 border-[#3d444d] border py-1 rounded-md mb-4'
                     type="text"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
            <div className='border-b border-[#9198a1] py-4'>
                <div className='flex items-center gap-2'>
                    <input name='estado' type="radio" />
                    <RiGitRepositoryLine className='text-[#9198a1] text-2xl'/>
                    <div>
                        <h1 className='text-white font-semibold text-sm'>Public</h1>
                        <p className='text-[#9198a1] text-xs'>Anyone on the internet can see this repository. You choose who can commit.</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <input name='estado' type="radio" />
                    <RiGitRepositoryPrivateLine  className='text-[#9198a1] text-2xl'/>
                    <div>
                        <h1 className='text-white font-semibold text-sm'>Private</h1>
                        <p className='text-[#9198a1] text-xs'>You choose who can see and commit to this repository.</p>
                    </div>
                </div>
            </div>
            <div className='border-b border-[#9198a1] py-4 space-y-4'>
                <h1 className='text-white text-sm font-medium'>Initialize this repository with:</h1>
                <div className='flex gap-2'>
                    <input className='w-4 mt-[-15px]'type="checkbox"/>
                    <div>
                        <h1 className='text-white text-sm font-medium'>Add a README file</h1>
                        <p className='text-[#9198a1] text-xs'>This is where you can write a long description for your project. <span className='text-blue-600 underline text-xs cursor-pointer'>Learn more about READMEs.</span></p>
                    </div>
                </div>
                <div className='space-y-2'>
                    <h1 className='text-white text-sm font-medium'>Add .gitignore</h1>
                    <button className='bg-[#212830] hover:bg-[#262C36] px-5 py-0.5 border-[#3d444d] border rounded-md'>
                        <span className='text-[#9198a1] text-xs'>.gitignore template: </span>
                        <span className='text-white text-xs'>None</span>
                    </button>
                    <p className='text-[#9198a1] text-xs'>Choose which files not to track from a list of templates. <span className='text-blue-600 underline text-xs cursor-pointer'>Learn more about ignoring files.</span></p>
                </div>
                <div className='space-y-2'>
                    <h1 className='text-white text-sm font-medium'>Choose a license</h1>
                    <button className='bg-[#212830] hover:bg-[#262C36] px-5 py-0.5 border-[#3d444d] border rounded-md'>
                        <span className='text-[#9198a1] text-xs'>License: </span>
                        <span className='text-white text-xs'>None</span>
                    </button>
                    <p className='text-[#9198a1] text-xs'>A license tells others what they can and can't do with your code. <span className='text-blue-600 underline text-xs cursor-pointer'>Learn more about licenses.</span></p>
                </div>
            </div>
            <div className='border-b border-[#9198a1] flex items-center py-4'>
                <IoInformationCircleOutline  className='text-[#9198a1] text-xl'/>
                <p className='text-[#9198a1] text-sm'>You are creating a public repository in your personal account.</p>
            </div>
            <div className='py-4 relative'>
                <button className='text-white absolute right-0 bg-[#29903b] text-sm font-medium px-2 py-1.5 rounded-md' onClick={handleCreateBucket}>Create repository</button>
            </div>
        </div>
    </div>
    </>
  )
}
