// import React from 'react'
// import fotoUser from '../assets/logoGitHubN.png'
// import { GoPeople } from "react-icons/go";
// import { getUserData } from '../helpers/getuser';
// import { useParams } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';

// export const User = () => {
//     const { userId } = useParams();
//     const [userData, setUserData] = useState(null);
  
//     useEffect(() => {
//       const fetchUserData = async () => {
//         const data = await getUserData(userId);
//         setUserData(data);
//       };
//       fetchUserData();
//     }, [userId]);
  
//     if (!userData) return <p>Cargando información del usuario...</p>;
//     if (userData.error) return <p>Error al cargar información del usuario.</p>;
//   return (
//     <>
//     <div className='mt-10 px-6'>
//         <div className='w-[250px]'>
//             <div>
//                 <img className='object-contain border border-[#6d737a] rounded-full' src={fotoUser} alt="" />
//             </div>
//             <div className='flex flex-col gap-3'>
//                 <h1 className='text-[#6d737a] text-[20px]'>{userData.username}</h1>
//                 <button className='text-white font-semibold text-sm w-full bg-[#212830] hover:bg-[#262c36] border-[#6d737a] border py-2 rounded-md'>Edit profile</button>
//                 <div className='flex gap-3'>
//                     <div className='flex items-center gap-3'>
//                         <GoPeople className='text-[#9198a1] hover:text-blue-600'/>
//                         <p className='text-white font-bold text-sm hover:text-blue-600'>0 <span className='text-[#9198a1] font-normal hover:text-blue-600'>followers</span></p>
//                     </div>
//                     <p className='text-white font-bold text-sm hover:text-blue-600'>0 <span className='text-[#9198a1] font-normal hover:text-blue-600'>following</span></p>
//                 </div>
//             </div>
//             <div id='buckets'>
//                 <ul>
//                     {userData.buckets.map((bucket) => (
//                         <li key={bucket.name}>{bucket.name}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     </div>
//     </>
//   )
// }
import React, { useEffect, useState } from 'react';
import fotoUser from '../assets/logoGitHubN.png';
import { GoPeople } from "react-icons/go";
import { getUserData } from '../helpers/getuser';

export const User = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const data = await getUserData(userId);
        setUserData(data);
      }
    };
    fetchUserData();
  }, [userId]);

  if (!userData) return <p>Cargando información del usuario...</p>;
  if (userData.error) return <p>Error al cargar información del usuario.</p>;

  return (
    <div className='mt-10 px-6'>
      <div className='w-[250px]'>
        <div>
          <img className='object-contain border border-[#6d737a] rounded-full' src={fotoUser} alt="User Avatar" />
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='text-[#6d737a] text-[20px]'>{userData.username}</h1>
          <button className='text-white font-semibold text-sm w-full bg-[#212830] hover:bg-[#262c36] border-[#6d737a] border py-2 rounded-md'>Edit profile</button>
          <div className='flex gap-3'>
            <div className='flex items-center gap-3'>
              <GoPeople className='text-[#9198a1] hover:text-blue-600'/>
              <p className='text-white font-bold text-sm hover:text-blue-600'>0 <span className='text-[#9198a1] font-normal hover:text-blue-600'>followers</span></p>
            </div>
            <p className='text-white font-bold text-sm hover:text-blue-600'>0 <span className='text-[#9198a1] font-normal hover:text-blue-600'>following</span></p>
          </div>
        </div>
        <div id='buckets' className='mt-4'>
          <h2 className='text-lg font-bold'>Buckets</h2>
          <ul>
            {userData.buckets.length > 0 ? (
              userData.buckets.map((bucket) => (
                <li key={bucket.name} className='text-white font-medium'>{bucket.name}</li>
              ))
            ) : (
              <p className='text-[#6d737a]'>No hay buckets disponibles</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

