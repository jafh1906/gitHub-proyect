import React, { useEffect, useState } from 'react';
import { Download, getBucketInfo } from '../helpers/storage';
import { getOwnerName } from '../helpers/getuser';
import { supabase } from '../supabase/client';
import { VscGithub } from "react-icons/vsc";
import { RiGitBranchLine } from "react-icons/ri";
import { PiTagBold } from "react-icons/pi";
import { IoCode } from "react-icons/io5";
import { MdFolder } from "react-icons/md";
import { useSession } from '@supabase/auth-helpers-react'; 
import { useNavigate } from 'react-router-dom';

export const Files = ({ bucketId }) => {
  const [bucketInfo, setBucketInfo] = useState(null);
  const [bucketDescription, setBucketDescription] = useState(''); // Estado para la descripción del bucket
  const [files, setFiles] = useState([]);
  const [userName, setUserName] = useState('');
  const session = useSession(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBucketInfo = async () => {
        if (!bucketId) {
            console.error("No se proporcionó ningún ID del bucket");
            return;
        }

        console.log('Obteniendo información del bucket con ID:', bucketId);

        const { data, error } = await getBucketInfo(bucketId);
        if (error) {
            console.error('Error al obtener información de bucket:', error);
        } else {
            console.log('Información obtenida del bucket:', data);
            setBucketInfo(data);
        }

        // Obtener la descripción del bucket desde la tabla `bucket_description`
        const { data: descriptionData, error: descriptionError } = await supabase
          .from('bucket_description')
          .select('description')
          .eq('bucket_id', bucketId)
          .single();

        if (descriptionError) {
          console.error('Error al obtener la descripción del bucket:', descriptionError);
        } else if (descriptionData) {
          setBucketDescription(descriptionData.description);
        }
    };

    const fetchOwnerName = async () => {
        const name = await getOwnerName(bucketId);
        setUserName(name || 'Owner not found');
    };

    fetchOwnerName();
    fetchBucketInfo();
    fetchFiles();
  }, [bucketId]);


  // Función para obtener archivos y carpetas desde el bucket de Supabase
  const fetchFiles = async () => {
    const { data, error } = await supabase.storage
      .from(bucketId)
      .list('', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });

    if (error) {
      console.error('Error obteniendo archivos:', error);
      return;
    }

    const folderMap = {}; // Estructura para almacenar carpetas y sus archivos

    data.forEach((item) => {
      const [folderName, ...rest] = item.name.split('/');
      if (!folderMap[folderName]) {
        folderMap[folderName] = [];
      }
      if (rest.length) {
        folderMap[folderName].push(item); // Agrega el archivo a la carpeta correspondiente
      }
    });

    setFiles(folderMap); // Guarda la estructura en el estado
  };

  // Función para manejar la subida de una carpeta
  const handleFolderUpload = async (event) => {
    const folderFiles = event.target.files;

    for (let file of folderFiles) {
      const fullPath = file.webkitRelativePath;
      const { error } = await supabase.storage
        .from(bucketId)
        .upload(fullPath, file);

      if (error) {
        console.error(`Error al subir el archivo ${file.name}:`, error);
      } else {
        console.log(`Archivo ${file.name} subido exitosamente a Supabase.`);
      }
    }

    fetchFiles();
  };

    const handleDownload = async () => {
      console.log("Descargando archivos del bucket...");
      await Download(bucketId); // Llama a la función Download pasando el bucketId
    };
    
    
  //   const handleDeleteBucket = async () => {
  //    await deleteBucketWithContent(bucketId)
  // };
    
  return (
    <div className='bg-[#0d1117] h-screen text-white px-12 py-5'>
      <div className='flex justify-start border-b pb-4'>
        {bucketInfo ? (
          <div className=''>
            <h1 className='text-2xl font-bold flex items-center gap-2'>
              <VscGithub className='text-[#26292F] bg-black rounded-full text-3xl' />
              <span className='text-xl font-medium'>{bucketInfo.name}</span>
            </h1>
          </div>
        ) : (
          <p>Loading bucket information...</p>
        )}
      </div>
      <div className='mt-5 flex justify-between'>
        <div className='flex items-center gap-1'>
          <button className='flex items-center px-4 py-2 gap-2 rounded-lg bg-[#212830] hover:bg-[#262c36]'>
            <RiGitBranchLine className='text-[#9198A1]' />
            <span className='font-medium text-sm'>main</span>
          </button>
          <button className='flex items-center px-4 py-2 gap-2 rounded-lg hover:bg-[#262c36]'>
            <RiGitBranchLine className='text-[#9198A1]' />
            <span className='font-medium text-[#9198A1] text-sm'>Branch</span>
          </button>
          <button className='flex items-center px-4 py-2 gap-2 rounded-lg hover:bg-[#262c36]'>
            <PiTagBold className='text-[#9198A1]' />
            <span className='font-medium text-[#9198A1] text-sm'>Tags</span>
          </button>
        </div>
        <div className='flex items-center gap-3'>
        {bucketInfo && bucketInfo.owner === session?.user?.id && (
          <label htmlFor="file-upload"
            className="cursor-pointer px-4 py-2 bg-[#212830] text-white font-semibold text-sm rounded-lg hover:bg-[#262c36]">
            Add file
            <input
              id="file-upload"
              type="file"
              className="hidden"
              webkitdirectory="true"
              directory="true"
              multiple
              onChange={handleFolderUpload}
            />
          </label>
        )}
          <button className='flex px-4 py-2 rounded-lg items-center gap-1 bg-[#238636] hover:bg-[#29903b]'>
            <IoCode className='text-white' />
            <span className='text-sm font-medium'>Code</span>
          </button>
          {bucketInfo && bucketInfo.owner === session?.user?.id && (
            <button 
              // onClick={handleDeleteBucket} 
              className="text-red-500 bg-[#212830] px-4 py-2 rounded-lg mt-4 hover:bg-[#262c36]"
            >
              Eliminar Bucket
            </button>
          )}
        </div>
      </div>
      <div className='mt-4'>
        <div className='flex items-center gap-1.5 bg-[#151b23] py-4 px-3 rounded-t-md border'>
          <VscGithub className='text-[#26292F] bg-black rounded-full text-2xl' />
          <p className='text-sm font-medium'>{userName}</p>
        </div>
        <div id='archivos' className='border py-2 px-3'>
          {Object.keys(files).length > 0 ? (
            Object.entries(files).map(([folderName, files]) => (
              <div key={folderName} className="mb-3 flex items-center gap-2">
                <MdFolder  className='text-[#9198a1] text-xl'/>
                <p className="">{folderName}</p>
                <ul className="pl-4">
                  {files.map((file) => (
                    <li key={file.name}>{file.name.split('/').pop()}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No se encontraron archivos.</p>
          )}
        </div>
        <div id='descripcion' className='mt-4'>
          <h2 className='text-lg font-bold'>Descripción:</h2>
          <p>{bucketDescription || "No hay descripción disponible para este bucket."}</p>
        </div>
        <div id='descargar'>
          <button className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleDownload}
          >Descargar</button>
        </div>
      </div>
    </div>
  );
};

