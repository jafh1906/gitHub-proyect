import { supabase } from "../supabase/client";

export const getUserName = async () => {

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('Error al obtener el usuario:', userError.message);
        return null;
    }

    if (user) {

        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.error('Error al obtener el perfil del usuario:', profileError.message);
            return null;
        }

        return profiles.username;
    }

    return null;
};

export const getOwnerName = async (bucketId) => {
    // Obtener información del bucket
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucketId);

    if (bucketError) {
        console.error('Error al obtener información del bucket:', bucketError.message);
        return null;
    }

    // Asumimos que el bucket tiene un campo `owner` con el ID del propietario
    const ownerId = bucketData.owner;

    if (!ownerId) {
        console.error('No se encontró el propietario del bucket.');
        return null;
    }

    // Obtener el nombre de usuario del propietario en la tabla `profiles`
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', ownerId)
        .single();

    if (profileError) {
        console.error('Error al obtener el perfil del propietario del bucket:', profileError.message);
        return null;
    }

    return profileData.username;
};

// export const getUserData = async (userId) => {
//     try {
//       // Obtener el nombre de usuario desde la tabla `profiles`
//       const { data: userProfile, error: userProfileError } = await supabase
//         .from('profiles')
//         .select('username')
//         .eq('id', userId)
//         .single();
  
//       if (userProfileError) throw userProfileError;
  
//       // Obtener los nombres de los buckets que pertenecen al usuario
//       const { data: userBuckets, error: userBucketsError } = await supabase
//         .from('bucket_metadata')
//         .select('name')
//         .eq('owner', userId);
  
//       if (userBucketsError) throw userBucketsError;
  
//       return { username: userProfile.username, buckets: userBuckets };
//     } catch (error) {
//       console.error('Error obteniendo los datos del usuario:', error);
//       return { error };
//     }
//   };
export const getUserData = async (userId) => {
    try {
      // Obtén el nombre de usuario desde la tabla 'profiles'
      const { data: userData, error: userError, status } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single();
  
      if (userError && status === 404) {
        console.error('Usuario no encontrado:', userError);
        return { error: 'Usuario no encontrado' };
      } else if (userError) {
        console.error('Error al obtener el perfil del usuario:', userError);
        throw userError;
      }
  
      // Obtén los nombres de los buckets pertenecientes al usuario
      const { data: buckets, error: bucketsError, status: bucketsStatus } = await supabase
        .from('buckets')
        .select('name')
        .eq('owner', userId); // Filtramos los buckets por el owner
  
      if (bucketsError && bucketsStatus === 404) {
        console.error('Buckets no encontrados:', bucketsError);
        return { username: userData.username, buckets: [] }; // Sin buckets pero sin error
      } else if (bucketsError) {
        console.error('Error al obtener buckets:', bucketsError);
        throw bucketsError;
      }
  
      return { username: userData.username, buckets: buckets || [] };
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      return { error: 'Error al obtener los datos del usuario' };
    }
  };