import { supabase } from "../supabase/client";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const createBucket = async (bucketName, description) => {
    // Crear el bucket
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket(bucketName, {
        public: true,
    });

    if (bucketError) {
        console.error('Error al crear el bucket:', bucketError.message);
        return { error: bucketError };
    } else {
        console.log('Bucket creado con éxito:', bucketData);

        // Insertar la descripción en la tabla bucket_description
        const { data: descriptionData, error: descriptionError } = await supabase
            .from('bucket_description')
            .insert([
                { bucket_id: bucketName, description: description }
            ]);

        if (descriptionError) {
            console.error('Error al guardar la descripción:', descriptionError.message);
            return { error: descriptionError };
        } else {
            console.log('Descripción guardada con éxito:', descriptionData);
            return { data: { id: bucketData?.id || bucketName, name: bucketName }, error: null };
        }
    }
};

export const getBucketInfo = async (bucketId) => {
    const { data, error } = await supabase.storage.getBucket(bucketId);
  
    if (error) {
      console.error('Error al obtener información del bucket:', error.message);
      return { error };
    } else {
      console.log('Información del bucket obtenida con éxito:', data);
      return { data, error: null };
    }
}

export const getUserBuckets = async () => {
    const { data: { user } } = await supabase.auth.getUser();
  
    if (!user) {
        console.error('No hay usuario autenticado.');
        return { data: [], error: 'No hay usuario autenticado' };
    }

    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error('Error al obtener los buckets:', error.message);
        return { data: [], error };
    } else {
        // Filtrar los buckets donde el propietario sea el usuario autenticado
        const userBuckets = data.filter(bucket => bucket.owner === user.id);
        console.log('Buckets del usuario obtenidos con éxito:', userBuckets);
        return { data: userBuckets, error: null };
    }
};

export const getOtherUserBuckets = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error('No hay usuario autenticado.');
        return { data: [], error: 'No hay usuario autenticado' };
    }

    // Obtener todos los buckets
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
        console.error('Error al obtener los buckets:', bucketError.message);
        return { data: [], error: bucketError };
    }

    // Filtrar los buckets cuyo propietario no sea el usuario autenticado
    const otherUserBuckets = buckets.filter(bucket => bucket.owner !== user.id);

    if (otherUserBuckets.length === 0) {
        return { data: [], error: null };
    }

    // Obtener descripciones de buckets de otros usuarios desde la tabla `bucket_description`
    const bucketIds = otherUserBuckets.map(bucket => bucket.id);
    const { data: descriptions, error: descriptionError } = await supabase
        .from('bucket_description')
        .select('bucket_id, description')
        .in('bucket_id', bucketIds);

    if (descriptionError) {
        console.error('Error al obtener las descripciones:', descriptionError.message);
        return { data: [], error: descriptionError };
    }

    // Obtener nombres de usuario de los dueños de los buckets desde la tabla `profiles`
    const ownerIds = otherUserBuckets.map(bucket => bucket.owner);
    const { data: owners, error: ownerError } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', ownerIds);

    if (ownerError) {
        console.error('Error al obtener los nombres de usuario:', ownerError.message);
        return { data: [], error: ownerError };
    }

    // Mapear las descripciones y nombres de usuario con los buckets
    const bucketsWithDetails = otherUserBuckets.map(bucket => {
        const description = descriptions.find(desc => desc.bucket_id === bucket.id)?.description || 'No description available';
        const username = owners.find(owner => owner.id === bucket.owner)?.username || 'Unknown User';

        return {
            ...bucket,
            description,
            username
        };
    });

    console.log('Buckets de otros usuarios con detalles:', bucketsWithDetails);
    return { data: bucketsWithDetails, error: null };
};

export const Download = async (bucketName) => {
    const zip = new JSZip();

    const { data: folders, error: folderError } = await supabase.storage.from(bucketName).list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
    });

    if (folderError) {
        console.error('Error listing folders:', folderError.message);
        return;
    }

    if (!folders) {
        console.log('No folders found in the bucket');
        return;
    }

    for (const folder of folders) {
        const folderName = folder.name;
        const { data: files, error: fileError } = await supabase.storage.from(bucketName).list(folderName, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        });

        if (fileError) {
            console.error(`Error listing files in folder ${folderName}:`, fileError.message);
            continue;
        }

        if (!files) {
            console.log(`No files found in folder ${folderName}`);
            continue;
        }

        const zipFolder = zip.folder(folderName);

        for (const file of files) {
            const { data: fileData, error: downloadError } = await supabase.storage.from(bucketName).download(`${folderName}/${file.name}`);

            if (downloadError) {
                console.error(`Error downloading file ${file.name} in folder ${folderName}:`, downloadError.message);
                continue;
            }

            if (fileData) {
                const arrayBuffer = await fileData.arrayBuffer();
                zipFolder.file(file.name, arrayBuffer);
            } else {
                console.error(`File data for ${file.name} is empty or undefined.`);
            }
        }
    }

    zip.generateAsync({ type: 'blob' })
        .then((zipBlob) => {
            saveAs(zipBlob, `${bucketName}.zip`);
            console.log('Archivos descargados en un archivo zip.');
        })
        .catch((zipError) => {
            console.error('Error al generar el archivo zip:', zipError);
        });
    };

    export const deleteBucketWithContent = async (bucketId) => {
        try {
          // Función recursiva para listar todos los archivos dentro de una carpeta
          const listAllFiles = async (path = '') => {
            const { data: files, error: listError } = await supabase.storage
              .from(bucketId)
              .list(path, { limit: 100 });
      
            if (listError) {
              console.error('Error al listar archivos del bucket:', listError);
              return [];
            }
      
            let filePaths = [];
      
            for (const file of files) {
              if (file.type === 'file') {
                filePaths.push(`${path ? `${path}/` : ''}${file.name}`);
              } else if (file.type === 'folder') {
                const subfolderFiles = await listAllFiles(`${path ? `${path}/` : ''}${file.name}`);
                filePaths = filePaths.concat(subfolderFiles);
              }
            }
      
            return filePaths;
          };
      
          // Obtener todas las rutas de archivos dentro del bucket
          const filePaths = await listAllFiles();
      
          // Eliminar todos los objetos dentro del bucket
          if (filePaths.length > 0) {
            const { error: deleteFilesError } = await supabase.storage
              .from(bucketId)
              .remove(filePaths);
      
            if (deleteFilesError) {
              console.error('Error al eliminar archivos del bucket:', deleteFilesError);
              return { success: false, error: deleteFilesError.message };
            }
      
            // Verificar si aún quedan archivos después de intentar eliminarlos
            const { data: remainingFiles } = await supabase.storage
              .from(bucketId)
              .list('', { limit: 100 });
      
            if (remainingFiles.length > 0) {
              console.warn('Quedaron archivos después del intento de eliminación:', remainingFiles);
              return { success: false, error: 'No se pudieron eliminar todos los archivos.' };
            }
          }
      
          // Espera de 1 segundo antes de intentar eliminar el bucket
          await new Promise(resolve => setTimeout(resolve, 1000));
      
          // Eliminar el bucket vacío
          const { error: deleteBucketError } = await supabase.storage
            .deleteBucket(bucketId);
      
          if (deleteBucketError) {
            console.error('Error al eliminar el bucket:', deleteBucketError);
            return { success: false, error: deleteBucketError.message };
          }
      
          console.log(`Bucket ${bucketId} eliminado exitosamente.`);
          return { success: true };
        } catch (error) {
          console.error('Error inesperado al eliminar el bucket:', error);
          return { success: false, error: error.message };
        }
      };

//     // Función para eliminar todos los archivos y luego el bucket
// export const deleteBucketWithContent = async (bucketId) => {
//     try {
//       // Obtener todos los archivos del bucket
//       const { data: files, error: listError } = await supabase.storage
//         .from(bucketId)
//         .list('', { limit: 100, offset: 0 });
  
//       if (listError) {
//         throw new Error(`Error al listar archivos en el bucket: ${listError.message}`);
//       }
  
//       // Borrar todos los archivos encontrados
//       if (files.length > 0) {
//         const filePaths = files.map(file => file.name);
//         const { error: deleteFilesError } = await supabase.storage
//           .from(bucketId)
//           .remove(filePaths);
  
//         if (deleteFilesError) {
//           throw new Error(`Error al eliminar archivos en el bucket: ${deleteFilesError.message}`);
//         }
//       }
  
//       // Eliminar el bucket después de borrar los archivos
//       const { error: deleteBucketError } = await supabase.storage
//         .deleteBucket(bucketId);
  
//       if (deleteBucketError) {
//         throw new Error(`Error al eliminar el bucket: ${deleteBucketError.message}`);
//       }
  
//       console.log(`Bucket ${bucketId} eliminado exitosamente.`);
//       return { success: true };
//     } catch (error) {
//       console.error(error.message);
//       return { success: false, error: error.message };
//     }
//   };