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

    // export const deleteBucketWithContent = async (bucketName) => {
    //     const { data: folders, error: folderError } = await supabase.storage.from(bucketName).list('', {
    //         limit: 100,
    //         offset: 0,
    //         sortBy: { column: 'name', order: 'asc' },
    //     });
    
    //     if (folderError) {
    //         console.error('Error listing folders:', folderError.message);
    //         return;
    //     }
    
    //     if (!folders) {
    //         console.log('No folders found in the bucket');
    //         return;
    //     }
    
    //     // Primero eliminamos los archivos dentro de cada carpeta
    //     for (const folder of folders) {
    //         const folderName = folder.name;
    //         const { data: files, error: fileError } = await supabase.storage.from(bucketName).list(folderName, {
    //             limit: 100,
    //             offset: 0,
    //             sortBy: { column: 'name', order: 'asc' },
    //         });
    
    //         if (fileError) {
    //             console.error(`Error listing files in folder ${folderName}:`, fileError.message);
    //             continue;
    //         }
    
    //         if (!files || files.length === 0) {
    //             console.log(`No files found in folder ${folderName}`);
    //             continue;
    //         }
    
    //         for (const file of files) {
    //             const { error: deleteError } = await supabase.storage.from(bucketName).remove([`${folderName}/${file.name}`]);
    
    //             if (deleteError) {
    //                 console.error(`Error deleting file ${file.name} in folder ${folderName}:`, deleteError.message);
    //                 continue;
    //             }
    
    //             console.log(`File ${file.name} deleted from folder ${folderName}`);
    //         }
    //     }
    
    //     // Verificar si el bucket tiene archivos y carpetas para eliminar
    //     const { error: deleteBucketError } = await supabase.storage.from(bucketName).remove(folders.map(folder => `${folder.name}`));
    
    //     if (deleteBucketError) {
    //         console.error('Error deleting the bucket:', deleteBucketError.message);
    //         return;
    //     }
    
    //     console.log(`Bucket ${bucketName} and its contents have been deleted successfully.`);
    // }