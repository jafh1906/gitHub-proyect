import React, { useState, useRef, useEffect } from 'react';
import { CgMenu } from "react-icons/cg";
import { VscAdd, VscTriangleDown, VscIssues, VscGithub, VscGitPullRequest, VscInbox } from "react-icons/vsc";
import logoGitHub1 from "../assets/logoGitHubB.png";
import { FiSearch, FiBookOpen } from "react-icons/fi";
import { RiGitRepositoryLine } from "react-icons/ri";
import { VscGithubProject } from "react-icons/vsc";
import { GoPackage } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../helpers/fuctions';

export const TopBar = ({ containerNav }) => {
  const [visible, setIsVisible] = useState(false);
  const refContainInput = useRef(null);

  const navigate = useNavigate();

  const Logout = async () => {
    const success = await signOut();
    if (success) {
      navigate('/');
    } else {
      alert('Error al cerrar sesión');
    }
  };

  const showEntry = () => {
    setIsVisible(true);
  };

  const clickFuera = (event) => {
    if (
      refContainInput.current && !refContainInput.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickFuera);
    return () => {
      document.removeEventListener('mousedown', clickFuera);
    };
  }, []);

  return (
    <>
      <div className='border-b border-[#9198a1] bg-[#010409] px-3'>
        <div className='py-2.5 flex items-center justify-between'>

          <div ref={refContainInput} className={`absolute w-[70%] left-[8rem] p-2.5 bg-[#0d1117] mt-2.5 border-2 rounded-xl border-[#3d444d] ${visible ? 'block' : 'hidden'}`}>
            <div className='flex items-center p-1 bg-[#0d1117] relative'>
              <label htmlFor="" className='absolute left-3'>
                <FiSearch className='text-[#9198a1]' />
              </label>
              <input className='outline-none w-full focus:ring focus:ring-blue-700 rounded-lg p-1 pl-8 text-white bg-[#0d1117]  border-[#3d444d] border' type="text" />
            </div>
          </div>

          <button className='flex items-center'>
            <CgMenu className='text-[#9198a1] text-4xl rounded-lg border border-[#9198a1] p-1.5 mr-2' />
            <Link to='/Home' className='flex items-center gap-2'>
              <img className='w-[50px]' src={logoGitHub1} alt="" />
              <h3 className='text-white font-bold text-sm'>Dashboard</h3>
            </Link>
          </button>

          <div className='flex gap-2'>
            <button onClick={showEntry} className='hidden lg:block border border-[#9198a1] rounded-lg bg-[#010409] w-[320px] px-2 mr-4'>
              <span className='text-[#9198a1] text-sm flex items-center'>
                <FiSearch className='mr-2' />
                Type
                <span className='border border-[#9198a1] rounded-md px-1 text-center mx-1.5'>/</span>
                to search
              </span>
            </button>
            <div className='hidden lg:flex items-center gap-2'>
              <button className='flex items-center gap-2 p-1.5 border border-[#9198a1] rounded-lg'>
                <VscAdd className='text-[#9198a1]' />
                <VscTriangleDown className='text-[#9198a1] text-sm' />
              </button>
              <button className='flex md:hidden lg:block items-center justify-center'>
                <VscIssues className='text-[#9198a1] text-3xl p-1 border border-[#9198a1] rounded-lg' />
              </button>
              <button>
                <VscGitPullRequest className='text-[#9198a1] text-3xl p-1 border border-[#9198a1] rounded-lg' />
              </button>
              <button>
                <VscInbox className='text-[#9198a1] text-3xl p-1 border border-[#9198a1] rounded-lg' />
              </button>
            </div>
                <button>
                  <VscGithub className='text-[#3b3e44] text-3xl' />
                </button>
                <button
                  onClick={Logout}
                  className='text-white font-bold bg-slate-700 py-1.5 px-2 text-sm rounded-md'
                >log out
                </button>
          </div>
        </div>

        {containerNav && (
          <div>
            <nav className='flex gap-3'>
              <div>
                <button className='flex gap-2 items-center'>
                  <FiBookOpen  className='text-[#9198a1] text-lg'/>
                  <p className='text-white'>Overview</p>
                </button>
              </div>
              <div>
                <button className='flex gap-2 items-center'>
                  <RiGitRepositoryLine  className='text-[#9198a1] text-lg'/>
                  <p className='text-white'>Repositories</p>
                </button>
              </div>
              <div>
                <button className='flex gap-2 items-center'>
                  <VscGithubProject  className='text-[#9198a1] text-lg'/>
                  <p className='text-white'>Projects</p>
                </button>
              </div>
              <div>
                <button className='flex gap-2 items-center'>
                  <GoPackage  className='text-[#9198a1] text-lg'/>
                  <p className='text-white'>Packages</p>
                </button>
              </div>
              <div>
                <button className='flex gap-2 items-center'>
                  <FaRegStar  className='text-[#9198a1] text-lg'/>
                  <p className='text-white'>Stars</p>
                </button>
              </div>
            </nav>
          </div>
        )}

      </div>
    </>
  );
};
